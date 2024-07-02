import { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { EVM_NETWORK } from '@/config'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useChainId, useChains } from 'wagmi'
import { truncateAddress } from '@/lib/utils'

const knownAddresses = {
  [EVM_NETWORK.contracts.timelock]: 'TimelockController',
  [EVM_NETWORK.contracts.bridge]: 'ArgoBridgeV1',
  [EVM_NETWORK.contracts.erc20]: 'JoystreamERC20',
}

export const AddressLabel: FC<{ address: string }> = ({ address }) => {
  const knownName = knownAddresses[address]
  const chains = useChains()
  const chainId = useChainId()
  const chain = chains.find((chain) => chain.id === chainId)

  const handleClick = () => {
    const explorer = chain?.blockExplorers?.default
    if (!explorer) return
    window.open(`${explorer.url}/address/${address}`)
  }

  const label = knownName || truncateAddress(address)

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" onClick={handleClick}>
          {label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{address}</TooltipContent>
    </Tooltip>
  )
}
