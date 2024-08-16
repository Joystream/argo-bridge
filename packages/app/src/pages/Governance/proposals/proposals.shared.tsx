import { ProposalActions } from './ProposalActions'
import { AddressLink } from '@/components/AddressLink'
import { Truncated } from '@/components/Truncated'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  EvmGovernanceProposal,
  EvmGovernanceProposalStatus,
} from '@/lib/proposal'
import { cn } from '@/lib/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { CircleAlertIcon, EllipsisVertical, InfoIcon } from 'lucide-react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const columnHelper = createColumnHelper<EvmGovernanceProposal>()

const statusMap: Record<
  EvmGovernanceProposalStatus['type'],
  { label: string; description: string }
> = {
  proposed: {
    label: 'Proposed',
    description:
      'The change has been proposed and is awaiting voting by multisig',
  },
  ready: {
    label: 'Ready',
    description:
      'The change has passed the grace period and is ready to be executed',
  },
  gracing: {
    label: 'Gracing',
    description: 'The change has been proposed and is in the grace period',
  },
  executed: {
    label: 'Executed',
    description: 'The change has been executed',
  },
  cancelled: {
    label: 'Cancelled',
    description: 'The change has been cancelled',
  },
}

export const ProposalStatusCell: FC<{
  status: EvmGovernanceProposalStatus
}> = ({ status }) => {
  const { label, description } = statusMap[status.type]
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center">
        {label}
        <InfoIcon className="w-3 h-3 ml-1" />
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-sm">{description}</span>
      </TooltipContent>
    </Tooltip>
  )
}

const dangerousActions = [
  'Custom',
  'Swap bridge operator',
  'Swap bridge admin',
  'Swap timelock admin',
]

export const proposalsTableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: ({ cell: { getValue } }) => <Truncated value={getValue()} />,
  }),
  columnHelper.accessor('description', {
    header: 'Action',
    cell: ({ row }) => {
      const description = row.original.description
      const isDangerous =
        dangerousActions.includes(description) &&
        row.original.status.type !== 'executed'
      return (
        <Tooltip>
          <TooltipTrigger
            className={cn(
              'flex items-center',
              isDangerous && 'text-destructive',
            )}
          >
            {description}
            {isDangerous ? <CircleAlertIcon className="w-4 h-4 ml-1" /> : null}
          </TooltipTrigger>
          <TooltipContent>
            <ul>
              {row.original.calls.map((call) => (
                <li key={call.index}>
                  {call.functionFormatted || call.functionName || 'Unknown'}
                </li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      )
    },
  }),
  columnHelper.accessor('calls', {
    header: 'Call target',
    cell: ({ cell: { getValue } }) => {
      const calls = getValue()
      const uniqueAddresses = Array.from(
        new Set(calls.map((call) => call.targetAddress)),
      )
      return uniqueAddresses.map((a, idx) => (
        <AddressLink address={a} key={idx} />
      ))
    },
  }),
  // columnHelper.accessor('calls', {
  //   header: 'Calls',
  //   cell: ({ cell: { getValue } }) => {
  //     const calls = getValue()
  //     return calls.map((call) => (
  //       <div key={call.index}>
  //         {call.functionFormatted || call.functionName || 'Unknown'}
  //       </div>
  //     ))
  //   },
  // }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell: { getValue } }) => (
      <ProposalStatusCell status={getValue()} />
    ),
  }),
  columnHelper.display({
    id: 'more',
    header: () => <div className="text-right">More</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-right p-2">
              <EllipsisVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <NavLink to={`/governance/proposals/${row.original.id}`}>
                  View details
                </NavLink>
              </DropdownMenuItem>
              <ProposalActions proposal={row.original} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }),
]
