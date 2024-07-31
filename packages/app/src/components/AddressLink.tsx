import { FC } from 'react'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'
import { useChainId, useConfig } from 'wagmi'
import { truncateValue } from '@/lib/utils'
import { isAddress } from 'viem'
import { LinkBadge } from '@/components/LinkBadge'

const knownAddresses = {
  [EVM_NETWORK.contracts.timelock.toLowerCase()]: 'TimelockController',
  [EVM_NETWORK.contracts.bridge.toLowerCase()]: 'ArgoBridgeV1',
  [EVM_NETWORK.contracts.erc20.toLowerCase()]: 'JoystreamERC20',
}

export const AddressLink: FC<{ address: string }> = ({ address }) => {
  const isEvm = isAddress(address, { strict: false })
  const knownName = knownAddresses[address.toLowerCase()]
  const { chains } = useConfig()
  const chainId = useChainId()
  const chain = chains.find((c) => c.id === chainId)

  const getUrl = () => {
    if (isEvm) {
      const explorer = chain?.blockExplorers?.default
      if (!explorer) return
      return `${explorer.url}/address/${address}`
    } else if (JOY_NETWORK.name === 'Joystream') {
      return `https://joystream.subscan.io/account/${address}`
    }
  }

  const label = knownName || truncateValue(address)

  return <LinkBadge href={getUrl()} fullText={address} label={label} />
}
