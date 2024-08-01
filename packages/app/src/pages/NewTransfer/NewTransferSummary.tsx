import React, { FC } from 'react'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BridgeTransferType } from '@/gql/graphql'
import { ParsedTransferFormData } from './newTransfer.types'
import { formatEth, formatJoy } from '@/lib/utils'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { Address, isHex } from 'viem'
import { toast } from 'sonner'
import { buildRequestTransferExtrinsic } from '@/lib/joyExtrinsics'
import { BRIDGE_ADDRESS, EVM_NETWORK } from '@/config'
import { useTransaction } from '@/providers/transaction'
import { BridgeAbi, joyAddressCodec } from '@joystream/argo-core'
import { usePublicClient, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'viem/actions'

type NewTransferSummaryProps = {
  transferType: BridgeTransferType
  transferData: ParsedTransferFormData
  onGoBack: () => void
  onSuccess: () => void
}

export const NewTransferSummary: FC<NewTransferSummaryProps> = ({
  transferType,
  transferData,
  onGoBack,
  onSuccess,
}) => {
  const isEvmToJoy = transferType === BridgeTransferType.EvmToJoy
  const publicClient = usePublicClient()

  const { data: configsData } = useBridgeConfigs()
  const joyConfig = configsData?.joy
  const evmConfig = configsData?.evm
  const { submitJoyTx, addTxPromise, isSubmittingTx } = useTransaction()

  const { writeContractAsync } = useWriteContract()

  const handleJoySubmit = async () => {
    if (!submitJoyTx) {
      toast.error('Unexpected error')
      console.error({ submitJoyTx })
      return
    }
    await submitJoyTx(
      await buildRequestTransferExtrinsic(
        EVM_NETWORK.chainId,
        transferData.targetAddress,
        transferData.hapiAmount
      ),
      transferData.sourceAddress
    )
    onSuccess()
  }

  const handleEvmSubmit = async () => {
    const encodedAccount = joyAddressCodec.decode(transferData.targetAddress)

    if (
      !evmConfig ||
      !addTxPromise ||
      !isHex(encodedAccount) ||
      !publicClient
    ) {
      toast.error('Unexpected error')
      console.error({ evmConfig, addTxPromise, encodedAccount, publicClient })
      return
    }

    const doSubmit = async () => {
      const txHash = await writeContractAsync({
        address: BRIDGE_ADDRESS,
        account: transferData.sourceAddress as Address,
        abi: BridgeAbi,
        functionName: 'requestTransferToJoystream',
        value: evmConfig.bridgingFee,
        args: [encodedAccount, transferData.hapiAmount],
      })

      await waitForTransactionReceipt(publicClient, {
        hash: txHash,
      })

      onSuccess()
    }

    addTxPromise(doSubmit())
  }

  const handleSubmit = async () => {
    if (isEvmToJoy) {
      await handleEvmSubmit()
    } else {
      await handleJoySubmit()
    }
  }

  return (
    <>
      <CardContent className="flex flex-col gap-4">
        <SummaryField
          label="Transfer direction"
          value={isEvmToJoy ? 'Base to Joystream' : 'Joystream to Base'}
        />
        <SummaryField
          label="Source address"
          value={transferData.sourceAddress}
        />
        <SummaryField
          label="Amount"
          value={formatJoy(transferData.hapiAmount)}
        />
        <SummaryField
          label="Destination address"
          value={transferData.targetAddress}
        />
        <SummaryField
          label="Fee"
          value={
            isEvmToJoy
              ? evmConfig
                ? formatEth(evmConfig.bridgingFee)
                : '?'
              : joyConfig
                ? formatJoy(joyConfig.bridgingFee)
                : '?'
          }
        />
        <SummaryField label="Estimated arrival" value="Up to 3 days" />
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" onClick={onGoBack} disabled={isSubmittingTx}>
          Go back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmittingTx}>
          {isSubmittingTx ? 'Sending...' : 'Transfer'}
        </Button>
      </CardFooter>
    </>
  )
}

const SummaryField: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-muted-foreground text-sm font-medium">{label}</span>
    <span className="text-xl overflow-hidden overflow-ellipsis font-semibold">
      {value}
    </span>
  </div>
)
