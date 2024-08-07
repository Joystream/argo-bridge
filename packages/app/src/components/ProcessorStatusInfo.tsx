import { FC } from 'react'
import request from 'graphql-request'
import {
  ARGO_INDEXER_URL,
  EVM_OUT_OF_SYNC_THRESHOLD,
  JOY_OUT_OF_SYNC_THRESHOLD,
} from '@/config'
import { getProcessorStatusDocument } from '@/queries/processorStatus'
import { PublicClient } from 'viem'
import { ApiPromise } from '@polkadot/api'
import { useQuery } from '@tanstack/react-query'
import { useJoyApiContext } from '@/providers/joyApi'
import { usePublicClient } from 'wagmi'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

async function getProcessorStatusInfo(
  joyApi: ApiPromise,
  publicClient: PublicClient
) {
  const processorStatusPromise = request(
    ARGO_INDEXER_URL,
    getProcessorStatusDocument
  )
  const latestJoyBlockPromise = joyApi.rpc.chain.getHeader()
  const latestEvmBlockPromise = publicClient.getBlockNumber()

  const [processorStatus, latestJoyBlock, latestEvmBlock] = await Promise.all([
    processorStatusPromise,
    latestJoyBlockPromise,
    latestEvmBlockPromise,
  ])

  const evmDiff =
    Number(latestEvmBlock) - processorStatus.baseProcessorStatus.height
  const joyDiff =
    latestJoyBlock.number.toNumber() - processorStatus.joyProcessorStatus.height

  return {
    evmInSync: evmDiff <= EVM_OUT_OF_SYNC_THRESHOLD,
    joyInSync: joyDiff <= JOY_OUT_OF_SYNC_THRESHOLD,
  }
}

type ProcessorStatusInfoProps = {
  title: string
  className?: string
}

export const ProcessorStatusInfo: FC<ProcessorStatusInfoProps> = ({
  title,
  className,
}) => {
  const publicClient = usePublicClient()
  const { api: joyApi } = useJoyApiContext()

  const { data } = useQuery({
    queryKey: ['processorStatusInfo'],
    queryFn: async () => {
      if (!joyApi || !publicClient) return
      return getProcessorStatusInfo(joyApi, publicClient)
    },
    enabled: !!joyApi && !!publicClient,
    refetchInterval: 5000,
  })

  if (!data) return null

  if (data.evmInSync && data.joyInSync) return null

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Out of sync</AlertTitle>
      <AlertDescription>
        It seems the data from the indexer is out of sync with the blockchain.{' '}
        {title} data may be inaccurate.
      </AlertDescription>
    </Alert>
  )
}
