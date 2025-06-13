import { JOY_NETWORK } from '@/config'
import { truncateValue } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { FC } from 'react'

export const JoyTxLink: FC<{ hash: string; block: number }> = ({
  hash,
  block,
}) => {
  const isMainnet = JOY_NETWORK.name === 'Joystream'
  const url = isMainnet
    ? `https://explorer.joystream.org/#/extrinsics/${hash}`
    : `https://polkadot.js.org/apps/?rpc=${encodeURI(JOY_NETWORK.rpc.url)}#/explorer/query/${block}`

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
