import { FC, ReactNode, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useNavigate, useParams } from 'react-router-dom'
import { formatEth, formatJoy } from '@/lib/utils'
import { NETWORKS_NAME_LOOKUP, statusFilterOptions } from './transfers.shared'
import { AddressLabel } from '@/components/AddressLabel'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { Button } from '@/components/ui/button'
import { JoyTxLink } from '@/components/JoyTxLink'
import { EvmTxLink } from '@/components/EvmTxLink'
import { useTransfersQuery } from '@/lib/hooks'

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
          value={<AddressLabel address={transfer.sourceAccount} />}
        />
        <TransferDetailsRow
          label="To chain"
          value={`${destNetwork} (${transfer.destChainId})`}
        />
        <TransferDetailsRow
          label="To address"
          value={<AddressLabel address={transfer.destAccount} />}
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
