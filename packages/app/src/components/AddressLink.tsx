import { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useChainId, useChains } from 'wagmi'
import { truncateAddress } from '@/lib/utils'
import { isAddress } from 'viem'
import { ExternalLinkIcon } from 'lucide-react'

const knownAddresses = {
  [EVM_NETWORK.contracts.timelock.toLowerCase()]: 'TimelockController',
  [EVM_NETWORK.contracts.bridge.toLowerCase()]: 'ArgoBridgeV1',
  [EVM_NETWORK.contracts.erc20.toLowerCase()]: 'JoystreamERC20',
}

export const AddressLink: FC<{ address: string }> = ({ address }) => {
  const isEvm = isAddress(address, { strict: false })
  const knownName = knownAddresses[address]
  const chains = useChains()
  const chainId = useChainId()
  const chain = chains.find((chain) => chain.id === chainId)

  const getUrl = () => {
    if (isEvm) {
      const explorer = chain?.blockExplorers?.default
      if (!explorer) return
      return `${explorer.url}/address/${address}`
    } else if (JOY_NETWORK.name === 'Joystream') {
      return `https://joystream.subscan.io/account/${address}`
    }
  }

  const label = knownName || truncateAddress(address)

  return (
    <Tooltip>
      <TooltipTrigger>
        <a href={getUrl()} target="_blank" rel="noopener noreferrer">
          <Badge variant="outline">
            {label}
            <ExternalLinkIcon className="ml-1 w-3 h-3" />
          </Badge>
        </a>
      </TooltipTrigger>
      <TooltipContent>{address}</TooltipContent>
    </Tooltip>
  )
}
