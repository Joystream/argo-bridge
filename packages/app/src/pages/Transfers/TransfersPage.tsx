import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { ARGO_INDEXER_URL } from '@/config'
import { getTransfersDocument } from '@/queries/transfers'
import { parseTransfer } from '@/lib/transfer'
import { TransfersTable } from '@/pages/Transfers/TransfersTable'
import { Outlet } from 'react-router-dom'

export const TransfersPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => request(ARGO_INDEXER_URL, getTransfersDocument, {}),
  })
  const transfers = data?.bridgeTransfers.map(parseTransfer)

  return (
    <div>
      <TransfersTable transfers={transfers || []} />
      <Outlet />
    </div>
  )
}
