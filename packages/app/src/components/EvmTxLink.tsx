import { FC } from 'react'
import { JOY_NETWORK } from '@/config'
import { truncateAddress } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { useAccount } from 'wagmi'

export const EvmTxLink: FC<{ hash: string }> = ({ hash }) => {
  const { chain } = useAccount()
  const explorer = chain?.blockExplorers?.default
  const url = explorer ? `${explorer.url}/tx/${hash}` : ''
  const truncated = truncateAddress(hash, 10)

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
