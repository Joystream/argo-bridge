import { BRIDGE_ADDRESS, EVM_NETWORK, TIMELOCK_ADDRESS } from '@/config'
import {
  EvmTimelockOperationStatus,
  GetTimelockOperationsQuery,
} from '@/gql/graphql'
import { decodeCall } from '@joystream/argo-core'
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types'
import { match } from 'ts-pattern'
import { Address, Hash, keccak256, toHex } from 'viem'

type ProposedProposalFields = {
  approvals: Address[]
  threshold: number
  proposedAtTimestamp: Date
  safeTx: SafeMultisigTransactionResponse
}

type GracingProposalFields = {
  gracingStartedAtTimestamp: Date
  gracingStartedTxHash: Hash
  gracingDoneAtTimestamp: Date
}

type ExecutedProposalFields = {
  executedAtTimestamp: Date
  executedTxHash: Hash
}

type CancelledProposalFields = {
  cancelledAtTimestamp: Date
  cancelledTxHash: Hash
}

export type EvmGovernanceProposalStatus =
  | ({ type: 'proposed' } & ProposedProposalFields)
  | ({ type: 'gracing' } & GracingProposalFields)
  | ({ type: 'ready' } & GracingProposalFields)
  | ({ type: 'executed' } & GracingProposalFields & ExecutedProposalFields)
  | ({ type: 'cancelled' } & GracingProposalFields & CancelledProposalFields)

export type EvmGovernanceCall = {
  index: number
  targetAddress: Address
  value: bigint
  data: Hash
  functionName?: string | null
  functionArgs?: readonly any[] | null
  functionFormatted?: string
}

export type EvmGovernanceProposal = {
  id: string
  description: string
  status: EvmGovernanceProposalStatus
  predecessor: Hash | null
  salt: Hash | null
  calls: EvmGovernanceCall[]
}

const getDecodedCalls = (target: Address, data: Hash): EvmGovernanceCall[] => {
  const decodedCalls: EvmGovernanceCall[] = []
  const [decodedFnName, decodedArgs] = decodeCall(EVM_NETWORK, target, data)

  if (decodedFnName === 'schedule' && decodedArgs) {
    const [decodedCallFnName, decodedCallArgs] = decodeCall(
      EVM_NETWORK,
      decodedArgs[0],
      decodedArgs[2] || '0x',
    )
    decodedCalls.push({
      index: 0,
      data: decodedArgs[2],
      targetAddress: decodedArgs[0],
      value: decodedArgs[1],
      functionName: decodedCallFnName,
      functionArgs: decodedCallArgs,
      functionFormatted: `${decodedCallFnName}(${decodedCallArgs?.join(', ') || ''})`,
    })
  } else if (decodedFnName === 'scheduleBatch' && decodedArgs) {
    for (let i = 0; i < decodedArgs[0].length; i++) {
      const [decodedCallFnName, decodedCallArgs] = decodeCall(
        EVM_NETWORK,
        decodedArgs[0][i],
        decodedArgs[2][i] || '0x',
      )
      decodedCalls.push({
        index: i,
        data: decodedArgs[2][i],
        targetAddress: decodedArgs[0][i],
        value: decodedArgs[1][i],
        functionName: decodedCallFnName,
        functionArgs: decodedCallArgs,
        functionFormatted: `${decodedCallFnName}(${decodedCallArgs?.join(', ') || ''})`,
      })
    }
  } else {
    decodedCalls.push({
      index: 0,
      data,
      targetAddress: target,
      value: BigInt(0),
      functionName: decodedFnName,
      functionArgs: decodedArgs,
      functionFormatted: `${decodedFnName}(${decodedArgs?.join(', ') || ''})`,
    })
  }
  return decodedCalls
}

const PAUSER_ROLE = keccak256(toHex('PAUSER_ROLE'))
const OPERATOR_ROLE = keccak256(toHex('OPERATOR_ROLE'))
const ADMIN_ROLE = keccak256(toHex('DEFAULT_ADMIN_ROLE'))
const PROPOSER_ROLE = keccak256(toHex('PROPOSER_ROLE'))

const getDescription = (calls: EvmGovernanceCall[]): string | undefined => {
  if (calls.length === 1) {
    const call = calls[0]
    if (
      call.functionName === 'grantRole' &&
      call.functionArgs?.[0] === PAUSER_ROLE
    ) {
      return 'Grant pauser role'
    } else if (
      call.functionName === 'revokeRole' &&
      call.functionArgs?.[0] === PAUSER_ROLE
    ) {
      return 'Revoke pauser role'
    } else if (call.functionName === 'setMintingLimits') {
      return 'Set minting limits'
    } else if (call.functionName === 'setBridgeFee') {
      return 'Set bridging fee'
    } else if (call.functionName === 'withdrawBridgeFees') {
      return 'Withdraw bridging fees'
    } else if (call.functionName === 'unpauseBridge') {
      return 'Unpause bridge'
    } else if (call.functionName === 'updateDelay') {
      return 'Update timelock delay'
    }
  } else if (calls.length === 2) {
    const [firstCall, secondCall] = calls
    if (firstCall.targetAddress !== secondCall.targetAddress) {
      return
    }
    if (
      firstCall.functionName === 'grantRole' &&
      secondCall.functionName === 'revokeRole'
    ) {
      // swap role

      if (firstCall.functionArgs?.[0] !== secondCall.functionArgs?.[0]) {
        return
      }

      if (
        firstCall.targetAddress.toLowerCase() === BRIDGE_ADDRESS.toLowerCase()
      ) {
        if (firstCall.functionArgs?.[0] === OPERATOR_ROLE) {
          return 'Swap bridge operator'
        } else if (firstCall.functionArgs?.[0] === ADMIN_ROLE) {
          return 'Swap bridge admin'
        }
      } else if (
        firstCall.targetAddress.toLowerCase() === TIMELOCK_ADDRESS.toLowerCase()
      ) {
        if (firstCall.functionArgs?.[0] === PROPOSER_ROLE) {
          return 'Swap timelock admin'
        }
      }
    }
  }
}

export function parseTimelockOperations(
  operations: GetTimelockOperationsQuery['evmTimelockOperations'],
): EvmGovernanceProposal[] {
  return operations.map((operation) => {
    const gracingFields = {
      gracingStartedAtTimestamp: new Date(operation.createdAtTimestamp),
      gracingStartedTxHash: operation.createdTxHash as Hash,
      gracingDoneAtTimestamp: new Date(operation.delayDoneTimestamp),
    }
    const status = match(operation.status)
      .returnType<EvmGovernanceProposalStatus>()
      .with(EvmTimelockOperationStatus.Pending, () => {
        const isReady = gracingFields.gracingDoneAtTimestamp <= new Date()

        return {
          type: isReady ? 'ready' : 'gracing',
          ...gracingFields,
        }
      })
      .with(EvmTimelockOperationStatus.Executed, () => {
        if (!operation.executedAtTimestamp) {
          throw new Error('Executed operation missing timestamp')
        }
        return {
          type: 'executed',
          ...gracingFields,
          executedAtTimestamp: new Date(operation.executedAtTimestamp),
          executedTxHash: operation.executedTxHash as Hash,
        }
      })
      .with(EvmTimelockOperationStatus.Cancelled, () => {
        if (!operation.cancelledAtTimestamp) {
          throw new Error('Cancelled operation missing timestamp')
        }
        return {
          type: 'cancelled',
          ...gracingFields,
          cancelledAtTimestamp: new Date(operation.cancelledAtTimestamp),
          cancelledTxHash: operation.cancelledTxHash as Hash,
        }
      })
      .exhaustive()

    const calls = operation.calls.flatMap((call, idx) => ({
      ...getDecodedCalls(call.callTarget as Address, call.callData as Hash)[0],
      index: idx,
    }))

    const proposal: EvmGovernanceProposal = {
      id: operation.id,
      description: getDescription(calls) ?? 'Custom',
      status,
      predecessor: operation.predecessor as Hash,
      salt: operation.salt as Hash,
      calls,
    }
    return proposal
  })
}

export function parseSafeOperations(
  operations: SafeMultisigTransactionResponse[],
): EvmGovernanceProposal[] {
  return operations.map((operation) => {
    const calls = operation.data
      ? getDecodedCalls(operation.to as Address, operation.data as Hash)
      : []
    return {
      id: operation.safeTxHash,
      description: getDescription(calls) ?? 'Custom',
      status: {
        type: 'proposed',
        approvals:
          operation.confirmations?.map(
            (confirmation) => confirmation.owner as Address,
          ) ?? [],
        threshold: operation.confirmationsRequired,
        proposedAtTimestamp: new Date(operation.submissionDate),
        safeTx: operation,
      },
      salt: null,
      predecessor: null,
      calls,
    }
  })
}
