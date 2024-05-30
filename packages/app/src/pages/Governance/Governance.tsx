import { TimelockCall } from './TimelockCall'
import { BRIDGE_ADDRESS, TIMELOCK_ADDRESS } from '@/config'
import { EvmTimelockCallOrderByInput } from '@/gql/graphql'
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
  const { data: bridgeConfigs } = useBridgeConfigs()

  const proposeBridgeUnpause = async () => {
    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'unpauseBridge',
    })

    await scheduleCall(BRIDGE_ADDRESS, calldata)
  }

  if (!address) {
    return <div>Connect wallet</div>
  }

  return (
    <div className="space-y-2">
      <TypographyH2>Governance</TypographyH2>
      <Button onClick={proposeBridgeUnpause}>Propose Bridge Unpause</Button>
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
