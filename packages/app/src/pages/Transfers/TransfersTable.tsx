import {
  Column,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './Pagination'
import { BridgeTransfer } from '@/lib/transfer'
import { transfersTableColumns } from './transfers.shared'
import { FC, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FilterIcon, XIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BridgeTransferStatus } from '@/gql/graphql'
import { statusFilterOptions } from '@/pages/Transfers/transfers.shared'

type TransfersTableProps = {
  transfers: BridgeTransfer[]
}

export const TransfersTable: FC<TransfersTableProps> = ({ transfers }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: transfers,
    columns: transfersTableColumns,
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

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by address..."
          value={tableState.globalFilter ?? ''}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value)
          }}
          className="max-w-sm h-8"
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
                        (option) => option.value === statusFilterValue
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
              <StatusDropdownItem
                key={option.value}
                column={statusColumn}
                status={option.value}
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
                            header.getContext()
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

const StatusDropdownItem: FC<{
  column: Column<BridgeTransfer> | undefined
  status: BridgeTransferStatus
  displayText: string
}> = ({ column, status, displayText }) => {
  return (
    <DropdownMenuCheckboxItem
      checked={column?.getFilterValue() === status}
      onCheckedChange={(checked) => {
        column?.setFilterValue(checked ? status : undefined)
      }}
    >
      {displayText}
    </DropdownMenuCheckboxItem>
  )
}
