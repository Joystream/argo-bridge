import {
  toChainFilterOptions,
  transfersTableColumns,
  useTransfersQuery,
} from './transfers.shared'
import { DataTablePagination } from '@/components/DataTablePagination'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BridgeTransferStatus } from '@/gql/graphql'
import { BridgeTransfer } from '@/lib/transfer'
import { statusFilterOptions } from '@/pages/Transfers/transfers.shared'
import { useUser } from '@/providers/user/user.hooks'
import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import clsx from 'clsx'
import { FilterIcon, XIcon } from 'lucide-react'
import { FC, useMemo, useState } from 'react'

const getBorderColorClass = (createdAt: Date) => {
  const now = new Date()
  const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
  if (diffInDays < 1) return 'border-l-green-500'
  if (diffInDays < 2) return 'border-l-yellow-500'
  if (diffInDays < 3) return 'border-l-orange-500'
  return 'border-l-red-500'
}

export const TransfersTable: FC = () => {
  const transfersQuery = useTransfersQuery()
  const { userEvmOperator } = useUser()
  const { joyAddresses, evmAddresses } = useUser()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [showOnlyMyTransfers, setShowOnlyMyTransfers] = useState(false)

  const tableData = useMemo(() => {
    if (!transfersQuery.data) return []
    if (!showOnlyMyTransfers) return transfersQuery.data

    const userAddressesLookup = [
      ...joyAddresses,
      ...(evmAddresses || []),
    ].reduce(
      (acc, address) => {
        acc[address.toLowerCase()] = true
        return acc
      },
      {} as Record<string, boolean>,
    )

    return transfersQuery.data.filter((transfer) => {
      return (
        userAddressesLookup[transfer.sourceAccount.toLowerCase()] ||
        userAddressesLookup[transfer.destAccount.toLowerCase()]
      )
    })
  }, [transfersQuery.data, showOnlyMyTransfers, joyAddresses, evmAddresses])

  const columns = useMemo(() => {
    if (userEvmOperator) return transfersTableColumns

    return transfersTableColumns.filter(
      (column) => column.id !== 'safeCall.nonce',
    )
  }, [userEvmOperator])

  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getColumnCanGlobalFilter: (column) =>
      column.id === 'sourceAccount' || column.id === 'destAccount',
    state: {
      columnFilters,
    },
  })

  const tableState = table.getState()
  const statusColumn = table.getColumn('status')
  const statusFilterValue = statusColumn?.getFilterValue()
  const destChainIdColumn = table.getColumn('destChainId')
  const toChainFilterValue = destChainIdColumn?.getFilterValue()

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-2">
        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-2">
          <Input
            placeholder="Filter by address..."
            value={tableState.globalFilter ?? ''}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value)
            }}
            className="w-full max-w-sm h-8"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-dashed h-8 text-xs"
                size="sm"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                Status
                {statusFilterValue ? (
                  <>
                    <span className="mx-2 h-4 w-[1px] bg-primary/20" />
                    <span className="px-1 py-0.5 rounded bg-primary/20">
                      {
                        statusFilterOptions.find(
                          (option) => option.value === statusFilterValue,
                        )?.label
                      }
                    </span>
                  </>
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusFilterOptions.map((option) => (
                <FilterDropdownItem
                  key={option.value}
                  column={statusColumn}
                  value={option.value}
                  displayText={option.label}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-dashed h-8 text-xs"
                size="sm"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                To chain
                {toChainFilterValue != null ? (
                  <>
                    <span className="mx-2 h-4 w-[1px] bg-primary/20" />
                    <span className="px-1 py-0.5 rounded bg-primary/20">
                      {
                        toChainFilterOptions.find(
                          (option) => option.value === toChainFilterValue,
                        )?.label
                      }
                    </span>
                  </>
                ) : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by destination chain</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {toChainFilterOptions.map((option) => (
                <FilterDropdownItem
                  key={option.value}
                  column={destChainIdColumn}
                  value={option.value}
                  displayText={option.label}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {tableState.columnFilters.length || tableState.globalFilter ? (
            <Button
              variant="ghost"
              onClick={() => {
                table.setGlobalFilter('')
                setColumnFilters([])
              }}
              size="sm"
              className="h-8 text-xs"
            >
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">All transactions</span>
          <Switch
            id="my-transactions-switch"
            checked={showOnlyMyTransfers}
            onCheckedChange={setShowOnlyMyTransfers}
          />
          <Label htmlFor="my-transactions-switch" className="text-sm">
            My transactions
          </Label>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={clsx(
                    'border-l-4',
                    row.original.status === BridgeTransferStatus.Requested
                      ? getBorderColorClass(row.original.createdAtTimestamp)
                      : 'border-l-primary-foreground',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={transfersTableColumns.length}
                  className="h-24 text-center"
                >
                  {transfersQuery.isLoading ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} query={transfersQuery} />
    </div>
  )
}

const FilterDropdownItem: FC<{
  column: Column<BridgeTransfer> | undefined
  value: unknown
  displayText: string
}> = ({ column, value, displayText }) => {
  return (
    <DropdownMenuCheckboxItem
      checked={column?.getFilterValue() === value}
      onCheckedChange={(checked) => {
        column?.setFilterValue(checked ? value : undefined)
      }}
    >
      {displayText}
    </DropdownMenuCheckboxItem>
  )
}
