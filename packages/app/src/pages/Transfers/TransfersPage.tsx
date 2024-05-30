import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { ARGO_INDEXER_URL } from '@/config'
import { getTransfersDocument } from '@/queries/transfers'

export const TransfersPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['transfers'],
    queryFn: () => request(ARGO_INDEXER_URL, getTransfersDocument, {}),
  })

  return (
    <div>
      <h1>Transfers</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
    </div>
  )
}
