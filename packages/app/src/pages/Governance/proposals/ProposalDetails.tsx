import { FC, ReactNode, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { EvmTxLink } from '@/components/EvmTxLink'
import { useEvmProposalsQuery } from '@/lib/hooks'
import { ProposalStatusCell } from './proposals.shared'
import { Truncated } from '@/components/Truncated'
import { EvmGovernanceCall } from '@/lib/proposal'
import { AddressLink } from '@/components/AddressLink'
import { formatEth } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export const ProposalDetails: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useEvmProposalsQuery()
  const proposal = data?.find((p) => p.id === id)

  const getContent = () => {
    if (isLoading) return <span>Loading...</span>
    if (!proposal) return <span>Proposal not found</span>

    const gracingRows =
      proposal.status.type === 'gracing' ||
      proposal.status.type === 'executed' ||
      proposal.status.type === 'ready' ||
      proposal.status.type === 'cancelled' ? (
        <>
          <ProposalDetailsRow
            label="Approved date"
            value={proposal.status.gracingStartedAtTimestamp.toISOString()}
          />
          <ProposalDetailsRow
            label="Approved TX"
            value={<EvmTxLink hash={proposal.status.gracingStartedTxHash} />}
          />
          <ProposalDetailsRow
            label="Gracing done date"
            value={proposal.status.gracingDoneAtTimestamp.toISOString()}
          />
        </>
      ) : null

    const executedRows =
      proposal.status.type === 'executed' ? (
        <>
          <ProposalDetailsRow
            label="Executed date"
            value={proposal.status.executedAtTimestamp.toISOString()}
          />
          <ProposalDetailsRow
            label="Executed TX"
            value={<EvmTxLink hash={proposal.status.executedTxHash} />}
          />
        </>
      ) : null

    const cancelledRows =
      proposal.status.type === 'cancelled' ? (
        <>
          <ProposalDetailsRow
            label="Cancelled date"
            value={proposal.status.cancelledAtTimestamp.toISOString()}
          />
          <ProposalDetailsRow
            label="Cancelled TX"
            value={<EvmTxLink hash={proposal.status.cancelledTxHash} />}
          />
        </>
      ) : null

    return (
      <>
        <ProposalDetailsRow
          label="ID"
          value={<Truncated value={proposal.id} />}
        />
        <ProposalDetailsRow
          label="Status"
          value={<ProposalStatusCell status={proposal.status} />}
        />
        <ProposalDetailsRow label="Description" value={proposal.description} />
        {gracingRows}
        {executedRows}
        {cancelledRows}
        {proposal.calls.map((call) => (
          <CallDetails key={call.index} call={call} />
        ))}
      </>
    )
  }

  const handleClose = () => navigate('/governance')
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
          <DialogTitle>Proposal details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="flex flex-col gap-2">{getContent()}</div>
        </ScrollArea>
        <DialogFooter className="mt-2">
          <Button onClick={() => handleClose()} ref={closeButtonRef}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ProposalDetailsRow: FC<{ label: string; value: string | ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-start justify-between">
      <h5 className="text-muted-foreground">{label}:</h5>
      <span className="text-right">{value}</span>
    </div>
  )
}

const CallDetails: FC<{ call: EvmGovernanceCall }> = ({ call }) => {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <h4 className="font-semibold">Call #{call.index + 1}</h4>
      <ProposalDetailsRow
        label="Target"
        value={<AddressLink address={call.targetAddress} />}
      />
      <ProposalDetailsRow label="Value" value={formatEth(call.value)} />
      <ProposalDetailsRow
        label="Function name"
        value={call.functionName || 'Unknown'}
      />
      {call.functionArgs?.map((arg, index) => (
        <ProposalDetailsRow
          key={index}
          label={`Argument ${index + 1}`}
          value={<Truncated value={arg} right />}
        />
      ))}
      <ProposalDetailsRow
        label="Raw call"
        value={<Truncated value={call.data} right />}
      />
    </div>
  )
}
