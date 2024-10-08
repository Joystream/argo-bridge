import { TransferToEvmActions } from './TransferToEvmActions'
import { TransferToJoyActions } from './TransferToJoyActions'
import { Truncated } from '@/components/Truncated'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ARGO_INDEXER_URL,
  BRIDGE_ADDRESS,
  EVM_NETWORK,
  JOY_NETWORK,
} from '@/config'
import { BridgeTransferStatus, BridgeTransferType } from '@/gql/graphql'
import { BridgeTransfer, parseTransfer } from '@/lib/transfer'
import { formatJoy } from '@/lib/utils'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'
import { useSafeStore } from '@/providers/safe/safe.store'
import { getTransfersDocument } from '@/queries/transfers'
import { ALL_NETWORKS, BridgeAbi } from '@joystream/argo-core'
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { request } from 'graphql-request'
import { EllipsisVertical } from 'lucide-react'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { match } from 'ts-pattern'
import { encodeFunctionData } from 'viem'

export function addSafeCallToTransfers(
  transfers: BridgeTransfer[],
  pendingOpSafeCalls: SafeMultisigTransactionResponse[],
): BridgeTransfer[] {
  if (!pendingOpSafeCalls) return transfers

  return transfers.map((transfer) => {
    if (transfer.type !== BridgeTransferType.JoyToEvm) return transfer

    const bridgeCalls = pendingOpSafeCalls.filter(
      (call) => call.to === BRIDGE_ADDRESS,
    )
    const completeTransferCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'completeTransferToEth',
      args: [transfer.sourceTransferId, transfer.destAccount, transfer.amount],
    })
    const pendingSafeCall = bridgeCalls.find(
      (call) => call.data === completeTransferCalldata,
    )
    return { ...transfer, safeCall: pendingSafeCall }
  })
}

export function useTransfersQuery(): UseQueryResult<BridgeTransfer[]> {
  const { safeApiKit } = useSafeStore()
  const { data: pendingOpSafeCalls } = usePendingOperatorCallsQuery(safeApiKit)

  const query = useQuery({
    queryKey: ['transfers'],
    queryFn: async () => {
      const data = await request(ARGO_INDEXER_URL, getTransfersDocument, {})
      return data.bridgeTransfers.map(parseTransfer)
    },
  })

  const transfersWithSafeCalls = useMemo(() => {
    if (!query.data) return query.data
    if (!pendingOpSafeCalls) return query.data
    return addSafeCallToTransfers(query.data, pendingOpSafeCalls.results)
  }, [query.data, pendingOpSafeCalls])

  return { ...query, data: transfersWithSafeCalls } as typeof query
}

const columnHelper = createColumnHelper<BridgeTransfer>()

export const NETWORKS_NAME_LOOKUP = Object.values(ALL_NETWORKS).reduce(
  (acc, network) => {
    acc[network.chainId] = network.name
    return acc
  },
  {} as Record<number, string>,
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
    label: 'Base',
  },
  {
    value: JOY_NETWORK.chainId,
    label: 'Joystream',
  },
]

export const transfersTableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status, createdAtTimestamp, completedAtTimestamp } = row.original
      const date =
        status === BridgeTransferStatus.Completed
          ? completedAtTimestamp!
          : createdAtTimestamp
      const relativeTime = formatDistanceToNow(date, {
        addSuffix: true,
      }).replace('about ', '')

      return match(status)
        .with(BridgeTransferStatus.Requested, () => `Requested ${relativeTime}`)
        .with(BridgeTransferStatus.Completed, () => `Completed ${relativeTime}`)
        .with(BridgeTransferStatus.Reverted, () => `Reverted ${relativeTime}`)
        .otherwise(() => (
          <span className="text-destructive">Unknown! {relativeTime}</span>
        ))
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
    filterFn: (row, columnId, filterValue) => {
      const chainId = row.getValue(columnId)
      return filterValue === chainId
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
  columnHelper.accessor((row) => row.safeCall?.nonce, {
    id: 'safeCall.nonce',
    header: () => <div className="text-right">Nonce</div>,
    cell: ({ cell: { getValue } }) => {
      const nonce = getValue()
      return (
        <div className="text-right">{nonce !== undefined ? nonce : '—'}</div>
      )
    },
    enableColumnFilter: false, // Disable filtering for this column
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
