import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { JOY_NETWORK } from '@/config'
import { BridgeTransferStatus } from '@/gql/graphql'
import { useTransfersQuery } from '@/lib/hooks'
import { BridgeTransfer } from '@/lib/transfer'
import { useJoyApiContext } from '@/providers/joyApi'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { joyAddressCodec } from '@joystream/argo-core'
import { useQuery } from '@tanstack/react-query'
import { FC, useMemo } from 'react'
import { toast } from 'sonner'

export const TransferToJoyActions: FC<{ transfer: BridgeTransfer }> = ({
  transfer,
}) => {
  const { api } = useJoyApiContext()
  const { submitJoyTx } = useTransaction()
  const { userJoyOperator } = useUser()
  const { refetch: refetchTransfers } = useTransfersQuery()
  const threshold = JOY_NETWORK.opMulti?.threshold || 0

  const joyCompleteCall = useMemo(() => {
    if (transfer.status !== BridgeTransferStatus.Requested) {
      return
    }

    if (!api) {
      return
    }

    return api.tx.argoBridge.finalizeInboundTransfer(
      api.createType('PalletArgoBridgeRemoteTransfer', {
        id: transfer.sourceTransferId,
        chain_id: transfer.sourceChainId,
      }),
      transfer.destAccount,
      transfer.amount,
    )
  }, [api, transfer])

  const { data: joyCallMultisigInfo, refetch } = useQuery({
    queryKey: ['joyApprovalStatus', joyCompleteCall?.method.hash.toHex()],
    queryFn: async () => {
      if (!joyCompleteCall || !api || !JOY_NETWORK.opMulti) return
      const result = await api.query.multisig.multisigs(
        JOY_NETWORK.opMulti.address,
        joyCompleteCall.method.hash.toHex(),
      )
      if (!result.isSome)
        return {
          approvals: [] as string[],
          timepoint: null,
        }
      const { approvals, when } = result.unwrap()
      return {
        approvals: approvals.map((a) => joyAddressCodec.encode(a)),
        timepoint: when,
      }
    },
    enabled: !!joyCompleteCall && !!api && !!JOY_NETWORK.opMulti,
  })

  const approveOrComplete = async () => {
    if (
      !submitJoyTx ||
      !joyCompleteCall ||
      !api ||
      !userJoyOperator ||
      !JOY_NETWORK.opMulti
    ) {
      console.error({
        submitJoyTx,
        joyCompleteCall,
        api,
        userJoyOperator,
      })
      toast.error('Unexpected error')
      return
    }
    const otherSignatories = JOY_NETWORK.opMulti.signers.filter(
      (address) => address !== userJoyOperator,
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyCompleteCall.toHex(),
      joyCompleteCall.length,
    )

    const { data: freshData } = await refetch()

    const isComplete = freshData?.approvals.length ?? 0 >= threshold - 1

    await submitJoyTx(
      (api) =>
        isComplete
          ? api.tx.multisig.asMulti(
              threshold,
              otherSignatories,
              joyCallMultisigInfo?.timepoint ?? null,
              joyCompleteCall,
              callDispatchInfo.weight,
            )
          : api.tx.multisig.approveAsMulti(
              threshold,
              otherSignatories,
              joyCallMultisigInfo?.timepoint ?? null,
              joyCompleteCall.method.hash.toHex(),
              callDispatchInfo.weight,
            ),
      userJoyOperator,
    )

    refetch()
    if (isComplete) {
      refetchTransfers()
    }
  }

  if (transfer.status !== BridgeTransferStatus.Requested) {
    return null
  }

  if (joyCallMultisigInfo == null) {
    return <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
  }

  const approvalsText = `${joyCallMultisigInfo?.approvals.length ?? '?'}/${threshold}`
  const canApprove =
    userJoyOperator && !joyCallMultisigInfo.approvals.includes(userJoyOperator)

  if (joyCallMultisigInfo.approvals.length >= threshold - 1) {
    return (
      <DropdownMenuItem
        onClick={() => approveOrComplete()}
        disabled={!canApprove}
      >
        Complete ({approvalsText})
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenuItem
      onClick={() => approveOrComplete()}
      disabled={!canApprove}
    >
      Approve ({approvalsText})
    </DropdownMenuItem>
  )
}
