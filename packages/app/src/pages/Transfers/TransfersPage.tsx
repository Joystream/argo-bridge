import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { ARGO_INDEXER_URL } from '@/config'
import { getTransfersDocument } from '@/queries/transfers'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { parseTransfer } from '@/lib/transfer'
import { TypographyH2 } from '@/components/ui/typography'
import { TransferRow } from '@/pages/Transfers/TransferRow'

export const TransfersPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => request(ARGO_INDEXER_URL, getTransfersDocument, {}),
  })
  const transfers = data?.bridgeTransfers.map(parseTransfer)

  return (
    <div>
      <TypographyH2>Transfers</TypographyH2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source chain</TableHead>
            <TableHead>Source account</TableHead>
            <TableHead>Target chain</TableHead>
            <TableHead>Target account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers?.map((transfer) => (
            <TransferRow key={transfer.id} transfer={transfer} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
