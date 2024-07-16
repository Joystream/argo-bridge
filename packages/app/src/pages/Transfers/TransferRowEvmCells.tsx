import { FC } from 'react'
import { BridgeTransfer } from '@/lib/transfer'
import { BRIDGE_ADDRESS, EVM_NETWORK } from '@/config'
import { useSafeStore } from '@/providers/safe/safe.store'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { encodeFunctionData } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { toast } from 'sonner'
import {
  MetaTransactionData,
  OperationType,
} from '@safe-global/safe-core-sdk-types'
import { BridgeTransferStatus } from '@/gql/graphql'
import { TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export const TransferRowEvmCells: FC<{ transfer: BridgeTransfer }> = ({
  transfer,
}) => {
  const threshold = EVM_NETWORK.opMulti?.threshold || 0
  const { safeApiKit, operatorSafe } = useSafeStore()
  const { data } = usePendingOperatorCallsQuery(safeApiKit)
  const { addTxPromise } = useTransaction()
  const { userEvmOperator } = useUser()

  if (!data) {
    return null
  }

  const pendingBridgeCalls = data.results.filter(
    (call) => call.to === BRIDGE_ADDRESS
  )

  const completeTransferCalldata = encodeFunctionData({
    abi: BridgeAbi,
    functionName: 'completeTransferToEth',
    args: [transfer.sourceTransferId, transfer.destAccount, transfer.amount],
  })

  const approvals =
    pendingBridgeCalls.find((call) => call.data === completeTransferCalldata)
      ?.confirmations?.length || 0

  const approveTransfer = async () => {
    const safeAddress = EVM_NETWORK.opMulti?.address

    if (
      !addTxPromise ||
      !operatorSafe ||
      !safeApiKit ||
      !safeAddress ||
      !userEvmOperator
    ) {
      toast.error('Unexpected error')
      console.error({
        addTxPromise,
        operatorSafe,
        safeApiKit,
        safeAddress,
        userEvmOperator,
      })
      return
    }

    const safeTransactionData: MetaTransactionData = {
      to: BRIDGE_ADDRESS,
      value: '0',
      operation: OperationType.Call,
      data: completeTransferCalldata,
    }
    const safeTransaction = await operatorSafe.createTransaction({
      transactions: [safeTransactionData],
    })
    const safeTxHash = await operatorSafe.getTransactionHash(safeTransaction)
    const signature = await operatorSafe.signHash(safeTxHash)

    await safeApiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: userEvmOperator,
      senderSignature: signature.data,
    })
  }

  const completeTransfer = async () => {
    if (!operatorSafe) return

    const pendingTx = pendingBridgeCalls.find(
      (call) => call.data === completeTransferCalldata
    )

    if (!pendingTx) {
      toast.error('Transaction not found')
      return
    }

    const txPromise = operatorSafe
      .executeTransaction(pendingTx)
      .then((executeTxResponse) =>
        // @ts-ignore
        executeTxResponse.transactionResponse?.wait?.()
      )
    addTxPromise?.(txPromise)
  }

  const renderAction = () => {
    if (transfer.status !== BridgeTransferStatus.Requested || !userEvmOperator)
      return null

    if (approvals >= threshold) {
      return (
        <TableCell>
          <Button variant="ghost" size="sm" onClick={completeTransfer}>
            Complete
          </Button>
        </TableCell>
      )
    }

    return (
      <TableCell>
        <Button variant="ghost" size="sm" onClick={approveTransfer}>
          Approve
        </Button>
      </TableCell>
    )
  }

  return (
    <>
      <TableCell>
        {transfer.status === 'REQUESTED'
          ? `${approvals ?? 0}/${threshold}`
          : '—'}
      </TableCell>
      {renderAction()}
    </>
  )
}
