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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { useTransfersQuery } from '@/lib/hooks'

export const TransferToEvmActions: FC<{ transfer: BridgeTransfer }> = ({
  transfer,
}) => {
  const threshold = EVM_NETWORK.opMulti?.threshold || 0
  const { safeApiKit, operatorSafe } = useSafeStore()
  const { data, refetch } = usePendingOperatorCallsQuery(safeApiKit)
  const { refetch: refetchTransfers } = useTransfersQuery()
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

  const approvals = pendingBridgeCalls.find(
    (call) => call.data === completeTransferCalldata
  )?.confirmations
  const approvalsCount = approvals?.length ?? 0

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

    const doApprove = async () => {
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

      refetch()
    }

    addTxPromise(doApprove())
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
      .then(() => {
        refetchTransfers()
      })
    addTxPromise?.(txPromise)
  }

  if (transfer.status !== BridgeTransferStatus.Requested) return null

  const approvalsText = `${approvalsCount}/${threshold}`

  if (approvalsCount >= threshold) {
    return (
      <DropdownMenuItem onClick={completeTransfer} disabled={!userEvmOperator}>
        Complete ({approvalsText})
      </DropdownMenuItem>
    )
  }

  const canApprove =
    userEvmOperator && !approvals?.some((a) => a.owner === userEvmOperator)

  return (
    <DropdownMenuItem onClick={approveTransfer} disabled={!canApprove}>
      Approve ({approvalsText})
    </DropdownMenuItem>
  )
}
