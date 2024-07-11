import { useQuery } from '@tanstack/react-query'
import { EVM_NETWORK } from '@/config'
import SafeApiKit from '@safe-global/api-kit'

export const usePendingAdminCallsQuery = (safeApiKit: SafeApiKit | null) => {
  return useQuery({
    queryKey: ['pendingAdminCalls'],
    queryFn: async () => {
      return safeApiKit?.getPendingTransactions(
        EVM_NETWORK.adminMulti?.address || ''
      )
    },
    enabled: !!safeApiKit && !!EVM_NETWORK.adminMulti,
  })
}

export const usePendingOperatorCallsQuery = (safeApiKit: SafeApiKit | null) => {
  return useQuery({
    queryKey: ['pendingOperatorCalls'],
    queryFn: async () => {
      return safeApiKit?.getPendingTransactions(
        EVM_NETWORK.opMulti?.address || ''
      )
    },
    enabled: !!safeApiKit && !!EVM_NETWORK.opMulti,
  })
}
