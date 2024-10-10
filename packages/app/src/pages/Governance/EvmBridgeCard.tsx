import { AddressesDialog, renderAddresses } from './AddressesDialog'
import { BridgeStatusRow } from './BridgeStatusRow'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BRIDGE_ADDRESS, EVM_NETWORK, TIMELOCK_ADDRESS } from '@/config'
import { EvmBridgeStatus } from '@/gql/graphql'
import {
  formatDurationBaseBlocks,
  formatDurationSeconds,
  formatEth,
  formatJoy,
} from '@/lib/utils'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { BridgeAbi, TimelockAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { toast } from 'sonner'
import { Address } from 'viem'
import { useBlockNumber, useReadContract, useWriteContract } from 'wagmi'

export const EvmBridgeCard: FC<{
  evmConfig: any
  refetchConfigs: () => void
}> = ({ evmConfig, refetchConfigs }) => {
  const { addTxPromise } = useTransaction()
  const { userEvmPauser } = useUser()
  const { writeContractAsync } = useWriteContract()

  const { data: currentEvmPeriodMinted } = useReadContract({
    abi: BridgeAbi,
    address: BRIDGE_ADDRESS,
    functionName: 'currentMintingPeriodMinted',
  })

  const { data: currentEvmPeriodEndBlock } = useReadContract({
    abi: BridgeAbi,
    address: BRIDGE_ADDRESS,
    functionName: 'currentMintingPeriodEndBlock',
  })

  const { data: currentBlock } = useBlockNumber()

  const currentEvmPeriodBlocksLeft =
    currentEvmPeriodEndBlock && currentBlock
      ? currentEvmPeriodEndBlock - currentBlock
      : null

  const currentEvmPeriodTokensLeft =
    evmConfig && currentEvmPeriodMinted
      ? currentEvmPeriodBlocksLeft != null && currentEvmPeriodBlocksLeft < 0n
        ? evmConfig.mintingLimits.periodLimit
        : evmConfig.mintingLimits.periodLimit - currentEvmPeriodMinted
      : null

  const { data: timelockDelay } = useReadContract({
    abi: TimelockAbi,
    address: TIMELOCK_ADDRESS,
    functionName: 'getMinDelay',
  })

  const getEvmBridgeStatus = () => {
    if (!evmConfig) return null
    if (evmConfig.status === EvmBridgeStatus.Active) {
      return 'Active'
    } else {
      return <span className="text-destructive">Paused</span>
    }
  }

  const handleEvmPause = () => {
    if (!userEvmPauser || !addTxPromise) {
      toast.error('Unexpected error')
      console.error({ userEvmPauser, addTxPromise })
      return
    }

    const txPromise = writeContractAsync({
      abi: BridgeAbi,
      address: BRIDGE_ADDRESS,
      account: userEvmPauser as Address,
      functionName: 'pauseBridge',
    })
    addTxPromise(txPromise, () => refetchConfigs())
  }

  if (!evmConfig) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base bridge</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">General information</h3>
          <div className="space-y-2">
            <BridgeStatusRow label="Chain ID" value={evmConfig.id} />
            <BridgeStatusRow label="Status" value={getEvmBridgeStatus()} />
            <BridgeStatusRow
              label="Transfer fee"
              value={formatEth(evmConfig.bridgingFee)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Stats</h3>
          <div className="space-y-2">
            <BridgeStatusRow
              label="Total burnt"
              value={formatJoy(evmConfig.totalBurned)}
            />
            <BridgeStatusRow
              label="Total minted"
              value={formatJoy(evmConfig.totalMinted)}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Minting limits</h3>
          <div className="space-y-2">
            <BridgeStatusRow
              label="Current limit"
              value={`${formatJoy(evmConfig.mintingLimits.periodLimit)} / ${evmConfig.mintingLimits.periodLength} blocks`}
            />
            <BridgeStatusRow
              label="Current period allowance"
              value={
                currentEvmPeriodTokensLeft
                  ? formatJoy(currentEvmPeriodTokensLeft)
                  : null
              }
            />
            <BridgeStatusRow
              label="Next period starts in"
              value={
                currentEvmPeriodBlocksLeft
                  ? currentEvmPeriodBlocksLeft < 0n
                    ? 'Ready'
                    : formatDurationBaseBlocks(
                        Number(currentEvmPeriodBlocksLeft),
                      )
                  : null
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Governance</h3>
          <div className="space-y-2">
            <BridgeStatusRow
              label="Timelock delay"
              value={
                timelockDelay
                  ? formatDurationSeconds(Number(timelockDelay))
                  : null
              }
            />
            <BridgeStatusRow
              label="Bridge admin"
              value={renderAddresses(evmConfig.bridgeAdminAccounts)}
            />
            <BridgeStatusRow
              label="Operator multisig"
              value={renderAddresses(evmConfig.bridgeOperatorAccounts)}
            />
            <BridgeStatusRow
              label="Admin multisig"
              value={renderAddresses(evmConfig.timelockAdminAccounts)}
            />
            {EVM_NETWORK.opMulti && (
              <BridgeStatusRow
                label="Operator signers"
                value={
                  <AddressesDialog
                    label="Base operator signers"
                    addresses={EVM_NETWORK.opMulti.signers}
                  />
                }
              />
            )}
            {EVM_NETWORK.adminMulti && (
              <BridgeStatusRow
                label="Admin signers"
                value={
                  <AddressesDialog
                    label="Base admin signers"
                    addresses={EVM_NETWORK.adminMulti.signers}
                  />
                }
              />
            )}
            <BridgeStatusRow
              label="Pausers"
              value={
                <AddressesDialog
                  label="Base pausers"
                  addresses={evmConfig.pauserAccounts}
                />
              }
            />
          </div>
        </div>
      </CardContent>
      {evmConfig.status === EvmBridgeStatus.Active && userEvmPauser && (
        <CardFooter>
          <Button onClick={handleEvmPause} className="w-full">
            Pause bridge
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
