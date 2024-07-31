import { createColumnHelper } from '@tanstack/react-table'
import { BridgeTransfer } from '@/lib/transfer'
import { formatJoy } from '@/lib/utils'
import { match } from 'ts-pattern'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { ALL_NETWORKS } from '@joystream/argo-core'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Truncated } from '@/components/Truncated'
import { TransferToJoyActions } from './TransferToJoyActions'
import { TransferToEvmActions } from './TransferToEvmActions'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'

const columnHelper = createColumnHelper<BridgeTransfer>()

export const NETWORKS_NAME_LOOKUP = Object.values(ALL_NETWORKS).reduce(
  (acc, network) => {
    acc[network.chainId] = network.name
    return acc
  },
  {} as Record<number, string>
)

export const statusFilterOptions = [
  {
    value: BridgeTransferStatus.Requested,
    label: 'Requested',
  },
  {
    value: BridgeTransferStatus.Completed,
    label: 'Completed',
  },
  {
    value: BridgeTransferStatus.Reverted,
    label: 'Reverted',
  },
  {
    value: BridgeTransferStatus.MaybeCompleted,
    label: 'Unknown',
  },
]

export const toChainFilterOptions = [
  {
    value: EVM_NETWORK.chainId,
    label: 'Base Sepolia',
  },
  {
    value: JOY_NETWORK.chainId,
    label: 'Petra testnet',
  },
]

export const transfersTableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ cell: { getValue } }) => {
      const status = getValue()
      return match(status)
        .with(BridgeTransferStatus.Requested, () => 'Requested')
        .with(BridgeTransferStatus.Completed, () => 'Completed')
        .with(BridgeTransferStatus.Reverted, () => 'Reverted')
        .otherwise(() => <span className="text-destructive">Unknown!</span>)
    },
  }),
  columnHelper.accessor('sourceChainId', {
    header: 'From chain',
    cell: ({ cell: { getValue } }) => {
      const chainId = getValue()
      return NETWORKS_NAME_LOOKUP[chainId] || chainId
    },
  }),
  columnHelper.accessor('sourceAccount', {
    header: 'From address',
    cell: ({ cell: { getValue } }) => {
      return <Truncated value={getValue()} />
    },
  }),
  columnHelper.accessor('destChainId', {
    header: 'To chain',
    cell: ({ cell: { getValue } }) => {
      const chainId = getValue()
      return NETWORKS_NAME_LOOKUP[chainId] || chainId
    },
  }),
  columnHelper.accessor('destAccount', {
    header: 'To address',
    cell: ({ cell: { getValue } }) => {
      return <Truncated value={getValue()} />
    },
  }),
  columnHelper.accessor('amount', {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ cell: { getValue } }) => {
      const formatted = formatJoy(getValue())
      return <div className="text-right">{formatted}</div>
    },
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
                <NavLink to={row.original.id}>View details</NavLink>
              </DropdownMenuItem>
              {row.original.type === BridgeTransferType.EvmToJoy ? (
                <TransferToJoyActions transfer={row.original} />
              ) : (
                <TransferToEvmActions transfer={row.original} />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }),
]
