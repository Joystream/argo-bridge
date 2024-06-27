import {
  EvmTimelockOperationStatus,
  GetTimelockOperationsQuery,
} from '@/gql/graphql'
import { TimelockAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { Address, Hex, zeroHash } from 'viem'
import { useWriteContract } from 'wagmi'
import { TIMELOCK_ADDRESS } from '@/config'
import { useTransaction } from '@/providers/transaction'

type TimelockOperation =
  GetTimelockOperationsQuery['evmTimelockOperations'][number]

export type TimelockOperationProps = {
  operation: TimelockOperation
}

export const TimelockOperation: FC<TimelockOperationProps> = ({
  operation,
}) => {
  const { writeContractAsync } = useWriteContract()
  const { addTxPromise } = useTransaction()

  const execute = async () => {
    if (!addTxPromise || !operation.calls.length) {
      return
    }

    let txPromise: Promise<Hex>
    const predecessor = operation.predecessor
      ? (operation.predecessor as Hex)
      : zeroHash
    const salt = operation.salt ? (operation.salt as Hex) : zeroHash
    if (operation.calls.length > 1) {
      txPromise = writeContractAsync(
        {
          abi: TimelockAbi,
          address: TIMELOCK_ADDRESS,
          functionName: 'executeBatch',
          args: [
            operation.calls.map((call) => call.callTarget as Address),
            operation.calls.map((call) => call.callValue),
            operation.calls.map((call) => call.callData as Hex),
            predecessor,
            salt,
          ],
        },
        {
          onSettled: (data, error) => {
            if (error) {
              console.error('Error:', error)
            } else {
              console.log('Data:', data)
            }
          },
        }
      )
    } else {
      txPromise = writeContractAsync(
        {
          abi: TimelockAbi,
          address: TIMELOCK_ADDRESS,
          functionName: 'execute',
          args: [
            operation.calls[0].callTarget as Address,
            operation.calls[0].callValue,
            operation.calls[0].callData as Hex,
            predecessor,
            salt,
          ],
        },
        {
          onSettled: (data, error) => {
            if (error) {
              console.error('Error:', error)
            } else {
              console.log('Data:', data)
            }
          },
        }
      )
    }
    await addTxPromise(txPromise)
  }

  const executedNode =
    operation.status === EvmTimelockOperationStatus.Executed ? (
      <div>
        Executed: {operation.executedAtTimestamp} #{operation.executedAtBlock}{' '}
        {operation.executedTxHash}
      </div>
    ) : null
  const cancelledNode =
    operation.status === EvmTimelockOperationStatus.Cancelled ? (
      <div>
        Cancelled: {operation.cancelledAtTimestamp} #
        {operation.cancelledAtBlock} {operation.cancelledTxHash}
      </div>
    ) : null

  const prettyStatus =
    operation.status === EvmTimelockOperationStatus.Executed
      ? 'Executed'
      : operation.status === EvmTimelockOperationStatus.Cancelled
        ? 'Cancelled'
        : operation.delayDoneTimestamp < Date.now() / 1000
          ? 'Ready'
          : 'Pending'

  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '10px',
      }}
    >
      <div>Id: {operation.id}</div>
      <div>Status: {prettyStatus}</div>
      <div>
        Created: {operation.createdAtTimestamp} #{operation.createdAtBlock}{' '}
        {operation.createdTxHash}
      </div>
      {executedNode}
      {cancelledNode}
      {operation.predecessor ? (
        <div>Predecessor: {operation.predecessor}</div>
      ) : null}
      {operation.salt ? <div>Salt: {operation.salt}</div> : null}
      <div>Calls:</div>
      <ul>
        {operation.calls.map((call) => (
          <li key={call.callIndex}>
            <div>Target: {call.callTarget}</div>
            <div>Value: {call.callValue}</div>
            <div>Signature: {call.callSignature}</div>
            <div>Args: {call.callArgs}</div>
            <div>Data: {call.callData}</div>
          </li>
        ))}
      </ul>
      <div>Delay done at: {operation.delayDoneTimestamp}</div>
      <button onClick={execute}>Execute</button>
    </div>
  )
}
