import { ARGO_INDEXER_URL, EVM_NETWORK } from '@/config'
import { EvmTimelockOperationOrderByInput } from '@/gql/graphql'
import { parseSafeOperations, parseTimelockOperations } from '@/lib/proposal'
import { isJoyAddress } from '@/lib/utils'
import { useJoyApiContext } from '@/providers/joyApi'
import { useSafeStore } from '@/providers/safe/safe.store'
import { getTimelockOperationsQueryDocument } from '@/queries/timelockOperations'
import { useQuery } from '@tanstack/react-query'
import { Dnum } from 'dnum'
import request from 'graphql-request'

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

export function useEvmProposalsQuery() {
  const safeApiKit = useSafeStore((s) => s.safeApiKit)
  return useQuery({
    queryKey: ['evmProposals'],
    queryFn: async () => {
      if (!safeApiKit || !EVM_NETWORK.adminMulti) return

      const timelockOperationsPromise = request(
        ARGO_INDEXER_URL,
        getTimelockOperationsQueryDocument,
        {
          orderBy: EvmTimelockOperationOrderByInput.CreatedAtBlockDesc,
        },
      )

      const safeOperationsPromise = safeApiKit.getPendingTransactions(
        EVM_NETWORK.adminMulti.address,
      )

      const [timelockOperations, safeOperations] = await Promise.all([
        timelockOperationsPromise,
        safeOperationsPromise,
      ])
      const proposals = [
        ...parseSafeOperations(safeOperations.results),
        ...parseTimelockOperations(timelockOperations.evmTimelockOperations),
      ]
      // fix for admin and op multisig being the same
      return proposals.filter((p) => {
        if (p.status.type !== 'proposed') return true
        if (p.calls.length !== 1) return true
        return p.calls[0].functionName !== 'completeTransferToEth'
      })
    },
    enabled: !!safeApiKit && !!EVM_NETWORK.adminMulti,
  })
}
