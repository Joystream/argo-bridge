import { useJoyApiContext } from '@/providers/joyApi'
import { useQuery } from '@tanstack/react-query'
import { isJoyAddress } from '@/lib/utils'
import { Dnum } from 'dnum'
import request from 'graphql-request'
import { ARGO_INDEXER_URL } from '@/config'
import { getTransfersDocument } from '@/queries/transfers'
import { parseTransfer } from '@/lib/transfer'

export function useJoyBalanceQuery(address: string) {
  const { api } = useJoyApiContext()
  const isValid = isJoyAddress(address)
  return useQuery({
    queryKey: ['joyBalance', isValid ? address : null],
    queryFn: async (): Promise<Dnum | null> => {
      if (!isValid || !api) return null

      const balance = await api.query.system.account(address)
      return [balance.data.free.toBigInt(), 10]
    },
    enabled: isValid && !!api,
  })
}

export function useTransfersQuery() {
  return useQuery({
    queryKey: ['transfers'],
    queryFn: async () => {
      const data = await request(ARGO_INDEXER_URL, getTransfersDocument, {})
      return data.bridgeTransfers.map(parseTransfer)
    },
  })
}
