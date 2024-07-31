import { FC, ReactNode, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useNavigate, useParams } from 'react-router-dom'
import { formatEth, formatJoy, truncateValue } from '@/lib/utils'
import { NETWORKS_NAME_LOOKUP, statusFilterOptions } from './transfers.shared'
import { Truncated } from '@/components/Truncated'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { Button } from '@/components/ui/button'
import { JoyTxLink } from '@/components/JoyTxLink'
import { EvmTxLink } from '@/components/EvmTxLink'
import { useTransfersQuery } from '@/lib/hooks'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'
import { useSafeStore } from '@/providers/safe/safe.store'
import { BRIDGE_ADDRESS } from '@/config'
import { encodeFunctionData } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { LinkBadge } from '@/components/LinkBadge'

export const TransferDetails: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { safeApiKit } = useSafeStore()

  const { data, isLoading } = useTransfersQuery()
  const transfer = data?.find((t) => t.id === id)

  const { data: pendingCalls } = usePendingOperatorCallsQuery(safeApiKit)
  const pendingBridgeCalls = pendingCalls?.results.filter(
    (call) => call.to === BRIDGE_ADDRESS
  )
  const completeTransferCalldata =
    transfer &&
    encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'completeTransferToEth',
      args: [transfer.sourceTransferId, transfer.destAccount, transfer.amount],
    })
  const pendingApproval = pendingBridgeCalls?.find(
    (call) => call.data === completeTransferCalldata
  )

  const getContent = () => {
    if (isLoading) return <span>Loading...</span>
    if (!transfer) return <span>Transfer not found</span>
    const status = statusFilterOptions.find((o) => o.value === transfer.status)
    const sourceNetwork = NETWORKS_NAME_LOOKUP[transfer.sourceChainId]
    const destNetwork = NETWORKS_NAME_LOOKUP[transfer.destChainId]

    const pendingRows = pendingApproval ? (
      <>
        <TransferDetailsRow
          label="Safe TX"
          value={
            <LinkBadge
              fullText={pendingApproval.safeTxHash}
              label={truncateValue(pendingApproval.safeTxHash)}
              href={`https://app.safe.global/transactions/tx?safe=basesep:${pendingApproval.safe}&id=${['multisig', pendingApproval.safe, pendingApproval.safeTxHash].join('_')}`}
            />
          }
        />
        <TransferDetailsRow label="Safe nonce" value={pendingApproval.nonce} />
      </>
    ) : null

    const completedRows =
      transfer.status === BridgeTransferStatus.Completed ? (
        <>
          <TransferDetailsRow
            label="Completed date"
            value={transfer.completedAtTimestamp?.toISOString()}
          />
          <TransferDetailsRow
            label="Completed TX"
            value={
              transfer.type === BridgeTransferType.JoyToEvm ? (
                <EvmTxLink hash={transfer.completedTxHash || ''} />
              ) : (
                <JoyTxLink
                  hash={transfer.completedTxHash || ''}
                  block={transfer.completedAtBlock || 0}
                />
              )
            }
          />
        </>
      ) : null

    return (
      <>
        <TransferDetailsRow label="ID" value={transfer.id} />
        <TransferDetailsRow label="Status" value={status?.label || ''} />
        <TransferDetailsRow label="Amount" value={formatJoy(transfer.amount)} />
        <TransferDetailsRow
          label="Fee paid"
          value={
            transfer.type === BridgeTransferType.JoyToEvm
              ? formatJoy(transfer.feePaid)
              : formatEth(transfer.feePaid)
          }
        />
        <TransferDetailsRow
          label="From chain"
          value={`${sourceNetwork} (${transfer.sourceChainId})`}
        />
        <TransferDetailsRow
          label="From address"
          value={<Truncated value={transfer.sourceAccount} />}
        />
        <TransferDetailsRow
          label="To chain"
          value={`${destNetwork} (${transfer.destChainId})`}
        />
        <TransferDetailsRow
          label="To address"
          value={<Truncated value={transfer.destAccount} />}
        />
        <TransferDetailsRow
          label="Request date"
          value={transfer.createdAtTimestamp.toISOString()}
        />
        <TransferDetailsRow
          label="Request TX"
          value={
            transfer.type === BridgeTransferType.JoyToEvm ? (
              <JoyTxLink
                hash={transfer.createdTxHash}
                block={transfer.createdAtBlock}
              />
            ) : (
              <EvmTxLink hash={transfer.createdTxHash} />
            )
          }
        />
        {pendingRows}
        {completedRows}
      </>
    )
  }

  const handleClose = () => navigate('/transfers')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          closeButtonRef.current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>Transfer details</DialogTitle>
        </DialogHeader>
        {getContent()}
        <DialogFooter className="mt-2">
          <Button onClick={() => handleClose()} ref={closeButtonRef}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const TransferDetailsRow: FC<{ label: string; value: string | ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h5 className="text-muted-foreground">{label}:</h5>
      <span className="text-right">{value}</span>
    </div>
  )
}
