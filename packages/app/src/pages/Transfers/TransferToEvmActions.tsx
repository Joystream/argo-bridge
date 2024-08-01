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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTransfersQuery } from '@/lib/hooks'
import { buildSignatureBytes } from '@safe-global/protocol-kit'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const TransferToEvmActions: FC<{ transfer: BridgeTransfer }> = ({
  transfer,
}) => {
  const threshold = EVM_NETWORK.opMulti?.threshold || 0
  const { safeApiKit, operatorSafe } = useSafeStore()
  const { data, refetch } = usePendingOperatorCallsQuery(safeApiKit)
  const { refetch: refetchTransfers } = useTransfersQuery()
  const { addTxPromise, isSubmittingTx } = useTransaction()
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

  const pendingApproval = pendingBridgeCalls.find(
    (call) => call.data === completeTransferCalldata
  )
  const approvals = pendingApproval?.confirmations
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
      if (pendingApproval) {
        const signature = await operatorSafe.signHash(
          pendingApproval.safeTxHash
        )
        await safeApiKit.confirmTransaction(
          pendingApproval.safeTxHash,
          buildSignatureBytes([signature])
        )
      } else {
        const safeTransactionData: MetaTransactionData = {
          to: BRIDGE_ADDRESS,
          value: '0',
          operation: OperationType.Call,
          data: completeTransferCalldata,
        }
        const safeTransaction = await operatorSafe.createTransaction({
          transactions: [safeTransactionData],
          options: { nonce: await safeApiKit.getNextNonce(safeAddress) },
        })

        const safeTxHash =
          await operatorSafe.getTransactionHash(safeTransaction)
        const signature = await operatorSafe.signHash(safeTxHash)

        await safeApiKit.proposeTransaction({
          safeAddress,
          safeTransactionData: safeTransaction.data,
          safeTxHash,
          senderAddress: userEvmOperator,
          senderSignature: signature.data,
        })
      }
      refetch()
    }

    addTxPromise(doApprove())
  }

  const completeTransfer = async () => {
    if (!operatorSafe) return

    if (!pendingApproval) {
      toast.error('Transaction not found')
      return
    }

    const currentNonce = await operatorSafe.getNonce()
    if (currentNonce !== pendingApproval.nonce) {
      toast.error(
        `This transaction must be executed after nonce ${pendingApproval.nonce - 1}`
      )
      return
    }

    const txPromise = operatorSafe
      .executeTransaction(pendingApproval)
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
  const hasAlreadyApproved = approvals?.some((a) => a.owner === userEvmOperator)

  if (approvalsCount >= threshold) {
    if (!userEvmOperator) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DropdownMenuItem disabled>
                Complete ({approvalsText})
              </DropdownMenuItem>
            </span>
          </TooltipTrigger>
          <TooltipContent>You're not an EthOp member.</TooltipContent>
        </Tooltip>
      )
    }
    return (
      <DropdownMenuItem onClick={completeTransfer} disabled={!userEvmOperator}>
        Complete ({approvalsText})
      </DropdownMenuItem>
    )
  }

  if (!userEvmOperator || hasAlreadyApproved || isSubmittingTx) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <DropdownMenuItem disabled>
              Approve ({approvalsText})
            </DropdownMenuItem>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {hasAlreadyApproved
            ? 'You already approved this transfer'
            : isSubmittingTx
              ? 'Please wait for previous transaction to finish'
              : "You're not an EthOp member"}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <DropdownMenuItem onClick={approveTransfer}>
      Approve ({approvalsText})
    </DropdownMenuItem>
  )
}
