import { FC, useMemo } from 'react'
import { BridgeTransfer } from '@/lib/transfer'
import { useJoyApiContext } from '@/providers/joyApi'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { JOY_NETWORK } from '@/config'
import { BridgeTransferStatus } from '@/gql/graphql'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export const TransferRowJoyCells: FC<{ transfer: BridgeTransfer }> = ({
  transfer,
}) => {
  const { api } = useJoyApiContext()
  const { submitJoyTx } = useTransaction()
  const { userJoyOperator } = useUser()
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
      transfer.amount
    )
  }, [api, transfer])

  const { data: joyCallMultisigInfo } = useQuery({
    queryKey: ['joyApprovalStatus', joyCompleteCall],
    queryFn: async () => {
      if (!joyCompleteCall || !api || !JOY_NETWORK.opMulti) return
      const result = await api.query.multisig.multisigs(
        JOY_NETWORK.opMulti.address,
        joyCompleteCall.method.hash.toHex()
      )
      if (!result.isSome)
        return {
          approvals: 0,
          timepoint: null,
        }
      const { approvals, when } = result.unwrap()
      return {
        approvals: approvals.length,
        timepoint: when,
      }
    },
    enabled: !!joyCompleteCall && !!api && !!JOY_NETWORK.opMulti,
  })

  const approveTransfer = async () => {
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
      (address) => address !== userJoyOperator
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyCompleteCall.toHex(),
      joyCompleteCall.length
    )
    await submitJoyTx(
      (api) =>
        api.tx.multisig.approveAsMulti(
          threshold,
          otherSignatories,
          joyCallMultisigInfo?.timepoint ?? null,
          joyCompleteCall.method.hash.toHex(),
          callDispatchInfo.weight
        ),
      userJoyOperator
    )
  }

  const completeTransfer = async () => {
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
      (address) => address !== userJoyOperator
    )
    const callDispatchInfo = await api.call.transactionPaymentApi.queryInfo(
      joyCompleteCall.toHex(),
      joyCompleteCall.length
    )
    await submitJoyTx(
      (api) =>
        api.tx.multisig.asMulti(
          threshold,
          otherSignatories,
          joyCallMultisigInfo?.timepoint ?? null,
          joyCompleteCall,
          callDispatchInfo.weight
        ),
      userJoyOperator
    )
  }

  const renderAction = () => {
    if (
      transfer.status !== BridgeTransferStatus.Requested ||
      !userJoyOperator ||
      joyCallMultisigInfo == null
    ) {
      return null
    }

    if (joyCallMultisigInfo.approvals >= threshold - 1) {
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
        {joyCallMultisigInfo?.approvals}/{threshold}
      </TableCell>
      {renderAction()}
    </>
  )
}
