import { LinkBadge } from '@/components/LinkBadge'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'
import { truncateValue } from '@/lib/utils'
import { FC } from 'react'
import { isAddress } from 'viem'
import { useConfig } from 'wagmi'

const knownAddresses = {
  [EVM_NETWORK.contracts.timelock.toLowerCase()]: 'TimelockController',
  [EVM_NETWORK.contracts.bridge.toLowerCase()]: 'ArgoBridgeV1',
  [EVM_NETWORK.contracts.erc20.toLowerCase()]: 'JoystreamERC20',
}

if (EVM_NETWORK.opMulti) {
  knownAddresses[EVM_NETWORK.opMulti.address.toLowerCase()] = 'EthOp Multisig'
}
if (EVM_NETWORK.adminMulti) {
  knownAddresses[EVM_NETWORK.adminMulti.address.toLowerCase()] =
    'EthAdmin Multisig'
}
if (JOY_NETWORK.opMulti) {
  knownAddresses[JOY_NETWORK.opMulti.address.toLowerCase()] = 'JoyOp Multisig'
}

export const AddressLink: FC<{ address: string }> = ({ address }) => {
  const isEvm = isAddress(address, { strict: false })
  const knownName = knownAddresses[address.toLowerCase()]
  const { chains } = useConfig()
  const chainId = EVM_NETWORK.chainId
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
