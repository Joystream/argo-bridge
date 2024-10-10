import {
  NETWORKS_NAME_LOOKUP,
  statusFilterOptions,
  useTransfersQuery,
} from './transfers.shared'
import { EvmTxLink } from '@/components/EvmTxLink'
import { JoyTxLink } from '@/components/JoyTxLink'
import { LinkBadge } from '@/components/LinkBadge'
import { Truncated } from '@/components/Truncated'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { formatEth, formatJoy, truncateValue } from '@/lib/utils'
import { FC, ReactNode, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const TransferDetails: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useTransfersQuery()
  const transfer = data?.find((t) => t.id === id)

  const getContent = () => {
    if (isLoading) return <span>Loading...</span>
    if (!transfer) return <span>Transfer not found</span>
    const status = statusFilterOptions.find((o) => o.value === transfer.status)
    const sourceNetwork = NETWORKS_NAME_LOOKUP[transfer.sourceChainId]
    const destNetwork = NETWORKS_NAME_LOOKUP[transfer.destChainId]

    const pendingRows = transfer.safeCall ? (
      <>
        <TransferDetailsRow
          label="Safe TX"
          value={
            <LinkBadge
              fullText={transfer.safeCall.safeTxHash}
              label={truncateValue(transfer.safeCall.safeTxHash)}
              href={`https://app.safe.global/transactions/tx?safe=base:${transfer.safeCall.safe}&id=${['multisig', transfer.safeCall.safe, transfer.safeCall.safeTxHash].join('_')}`}
            />
          }
        />
        <TransferDetailsRow
          label="Safe nonce"
          value={transfer.safeCall.nonce}
        />
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
