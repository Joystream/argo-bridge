import { FC } from 'react'
import { BridgeTransfer } from '@/lib/transfer'
import { useAccount, useWriteContract } from 'wagmi'
import { useTransaction } from '@/providers/transaction'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { useJoyWallets } from '@/providers/joyWallet'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { Hex } from 'viem'
import { buildFinalizeTransferExtrinsic } from '@/lib/joyExtrinsics'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatJoy, truncateAddress } from '@/lib/utils'

export const TransferRow: FC<{ transfer: BridgeTransfer }> = ({ transfer }) => {
  const { writeContractAsync } = useWriteContract()
  const { addTxPromise, submitJoyTx } = useTransaction()
  const { data: bridgeConfigs } = useBridgeConfigs()
  const evmOperators = bridgeConfigs?.evm.operatorAccounts
  const joyOperator = bridgeConfigs?.joy.operatorAccount
  const { walletAccounts: joyAccounts } = useJoyWallets()
  const { address: evmAddress } = useAccount()

  const completeTransferToEvm = () => {
    if (!addTxPromise) {
      return
    }

    const tx = writeContractAsync({
      abi: BridgeAbi,
      address: BRIDGE_ADDRESS,
      functionName: 'completeTransferToEth',
      args: [
        transfer.sourceTransferId,
        transfer.destAccount as Hex,
        transfer.amount,
      ],
    })
    addTxPromise(tx)
  }

  const completeTransferToJoy = async () => {
    if (!submitJoyTx || !joyOperator) {
      console.error('submitJoyTx not available')
      return
    }
    await submitJoyTx(
      await buildFinalizeTransferExtrinsic({
        sourceTransferId: transfer.sourceTransferId,
        sourceChainId: transfer.sourceChainId,
        destAccount: transfer.destAccount as Hex,
        amount: transfer.amount,
      }),
      joyOperator
    )
  }

  const renderAction = () => {
    if (!evmOperators || !joyOperator) {
      return null
    }
    console.log(joyAccounts)
    const isJoyOperator = joyAccounts?.some(
      (account) => account.address === joyOperator
    )
    const isEvmOperator = evmOperators.some(
      (address) => address === evmAddress?.toLowerCase()
    )
    console.log({ isJoyOperator, isEvmOperator })

    if (transfer.status === BridgeTransferStatus.Requested) {
      if (transfer.type === BridgeTransferType.EvmToJoy && isJoyOperator) {
        return (
          <Button variant="ghost" size="sm" onClick={completeTransferToJoy}>
            Complete
          </Button>
        )
      } else if (
        transfer.type === BridgeTransferType.JoyToEvm &&
        isEvmOperator
      ) {
        return (
          <Button variant="ghost" size="sm" onClick={completeTransferToEvm}>
            Complete
          </Button>
        )
      }
    }

    return null
  }

  return (
    <TableRow>
      <TableCell>{transfer.id}</TableCell>
      <TableCell>{transfer.status}</TableCell>
      <TableCell>{transfer.sourceChainId}</TableCell>
      <TableCell>{truncateAddress(transfer.sourceAccount)}</TableCell>
      <TableCell>{transfer.destChainId}</TableCell>
      <TableCell>{truncateAddress(transfer.destAccount)}</TableCell>
      <TableCell className="text-right">{formatJoy(transfer.amount)}</TableCell>
      <TableCell>{renderAction()}</TableCell>
    </TableRow>
  )
}
