import { useJoyApiContext } from '@/providers/joyApi'
import { useQuery } from '@tanstack/react-query'
import { isJoyAddress } from '@/lib/utils'
import { Dnum } from 'dnum'

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
