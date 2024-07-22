import { FC } from 'react'
import { truncateValue } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { useChainId, useConfig } from 'wagmi'

export const EvmTxLink: FC<{ hash: string }> = ({ hash }) => {
  const { chains } = useConfig()
  const chainId = useChainId()
  const chain = chains.find((c) => c.id === chainId)
  const explorer = chain?.blockExplorers?.default
  const url = explorer ? `${explorer.url}/tx/${hash}` : ''
  const truncated = truncateValue(hash, 10)

  return (
    <a
      className="flex items-center justify-between"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {truncated}
      <ExternalLinkIcon className="h-4 w-4 ml-2" />
    </a>
  )
}
