import { TimelockCall } from './TimelockCall'
import { BRIDGE_ADDRESS, TIMELOCK_ADDRESS } from '@/config'
import {
  EvmBridgeStatus,
  EvmTimelockCallOrderByInput,
  JoyBridgeStatus,
} from '@/gql/graphql'
import { getTimelockCallsQueryDocument } from '@/queries/timelockCalls'
import { BridgeAbi, TimelockAbi } from '@joystream/argo-core'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { FC } from 'react'
import { Address, bytesToHex, encodeFunctionData, Hex, zeroHash } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { ARGO_INDEXER_URL } from '@/config'
import { TypographyH2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useScheduleCall } from './governance.utils'
import { ChangeEvmLimits } from './ChangeEvmLimits'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useTransaction } from '@/providers/transaction'
import { useJoyWallets } from '@/providers/joyWallet'
import { toast } from 'sonner'

export const GovernancePage: FC = () => {
  const { address } = useAccount()
  const scheduleCall = useScheduleCall()

  const { data } = useQuery({
    queryKey: ['timelockCalls'],
    queryFn: async () =>
      request(ARGO_INDEXER_URL, getTimelockCallsQueryDocument, {
        orderBy: EvmTimelockCallOrderByInput.CreatedAtBlockDesc,
      }),
  })
  const { data: bridgeConfigs, refetch: refetchBridgeConfigs } =
    useBridgeConfigs()
  const { walletAccounts: joyAccounts } = useJoyWallets()
  const { submitJoyTx } = useTransaction()

  const proposeEvmBridgeUnpause = async () => {
    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'unpauseBridge',
    })

    await scheduleCall(BRIDGE_ADDRESS, calldata)
  }

  const initJoyBridgeUnpause = async () => {
    const userAddresses = joyAccounts.map((a) => a.address)
    const unpauserAccounts = bridgeConfigs?.joy.pauserAccounts
    const unpauserAccountsMap = unpauserAccounts?.reduce(
      (acc, a) => {
        acc[a] = true
        return acc
      },
      {} as Record<string, boolean>
    )
    const userUnpauserAddress =
      unpauserAccountsMap && userAddresses.find((a) => unpauserAccountsMap[a])
    if (!userUnpauserAddress || !submitJoyTx) {
      toast.error('Missing pauser account')
      return
    }

    await submitJoyTx(
      async (api) => api.tx.argoBridge.initUnpauseBridge(),
      userUnpauserAddress
    )
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      refetchBridgeConfigs()
    )
  }
  const finishJoyBridgeUnpause = async () => {
    const userAddresses = joyAccounts.map((a) => a.address)
    const operatorAccount = bridgeConfigs?.joy.operatorAccount
    if (
      !operatorAccount ||
      !userAddresses.includes(operatorAccount) ||
      !submitJoyTx
    ) {
      toast.error('Missing operator account')
      return
    }

    await submitJoyTx(
      async (api) => api.tx.argoBridge.finishUnpauseBridge(),
      operatorAccount
    )

    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      refetchBridgeConfigs()
    )
  }

  if (!address) {
    return <div>Connect wallet</div>
  }

  return (
    <div className="space-y-2">
      <TypographyH2>Governance</TypographyH2>
      {bridgeConfigs?.evm.status === EvmBridgeStatus.Paused && (
        <Button onClick={proposeEvmBridgeUnpause}>Start EVM unpause</Button>
      )}
      {bridgeConfigs?.joy.status === JoyBridgeStatus.Paused && (
        <Button onClick={initJoyBridgeUnpause}>Start Joy unpause</Button>
      )}
      {bridgeConfigs?.joy.status === JoyBridgeStatus.Thawn && (
        <Button onClick={finishJoyBridgeUnpause}>Finish Joy unpause</Button>
      )}
      <ChangeEvmLimits />

      <Collapsible>
        <CollapsibleTrigger>Timelock Calls</CollapsibleTrigger>
        <CollapsibleContent>
          {(data ? data.evmTimelockCalls : []).map((call) => (
            <TimelockCall key={call.id} call={call} />
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="grid grid-cols-2 gap-2">
        <pre>
          <code>
            {JSON.stringify(
              bridgeConfigs?.evm,
              (key, value) =>
                typeof value === 'bigint' ? value.toString() + 'n' : value,
              2
            )}
          </code>
        </pre>
        <pre>
          <code>
            {JSON.stringify(
              bridgeConfigs?.joy,
              (key, value) =>
                typeof value === 'bigint' ? value.toString() + 'n' : value,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
