import { LinkBadge } from '@/components/LinkBadge'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'
import { truncateValue } from '@/lib/utils'
import { FC } from 'react'
import { isAddress } from 'viem'
import { useConfig } from 'wagmi'

const knownSigners = {
  j4ubmt3funxxkh24pyqebwyg7ggkjj8wpqbjwuk5jjuwnyrvo: 'leet_joy',
  j4u3vjtyw3f4au2uvvr6hl264pjkfkmguygmtejdjhqfgjtco: 'klaudiusz',
  j4stut1njqd5rtvjgfx1klgd9bn27pzbd7kumdwjmd6yez6cf: '0x2bc',
  j4rk5azus8jsxdjr8e33d5egofwdfvk7zu26zjebwq7lu3ldb: 'freakstatic',
  j4vtgdn3jpp5yidvvynasmsufe3e5dhqjc4gd6t6cdgdrgwas: 'marat_mu',
  j4un3gxw44e6ncwextapa57gpegfjpu9fvf1p9ww1oa7gnhay: 'lezek',
  j4rhy9ctyqpx2bgl1qptqan6plcvwr9kl1l96dua6ucnr3w4z: 'Codefikeyz',
  '0x34591a1e3f6394208fef7ef433c89f1d793d8d8d': 'klaudiusz',
  '0xf2052f276d33e4b6655aa193e5bd1cc9cc3f1b00': 'leet_joy',
  '0xaa709d6b0c4e0f10cb49203dcd7442e5626cbd53': 'tomato',
  '0x75996a4c2683ef365549ee5ee39ed187f239940d': '0x2bc',
  '0x2b6626fc4bb515239b65b36368c4a271cb06d3f4': 'sieemma',
  '0x28aa4f9ffe21365473b64c161b566c3cdead0108': 'fierydev',
  '0x38c38e86f747a01e1520135193401b61dfe726b9': 'maxlevush',
  '0xbe3f7220f73aa3009a67e1a1193454f6099c9b11': 'spat_sochi',
  '0x9132dadb3da875301dab5de3ff42b015ec8956ca': 'l1dev',
  '0x0e835f8925f72b3220db3a9305b2a2c096329b62': 'igrex',
  '0x078fa53aa7d2c45b4af150701d83ea66b73a0364': 'marat_mu',
  '0x76c4fb9feb3a9b11bf99b7c31ebad30de4548db8': 'Codefikeyz',
}

const knownAddresses: Record<string, string> = {
  [EVM_NETWORK.contracts.timelock.toLowerCase()]: 'TimelockController',
  [EVM_NETWORK.contracts.bridge.toLowerCase()]: 'ArgoBridgeV1',
  [EVM_NETWORK.contracts.erc20.toLowerCase()]: 'JoystreamERC20',
  ...knownSigners,
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
      return `https://explorer.joystream.org/#/accounts/${address}`
    }
  }

  const label = knownName || truncateValue(address)

  return <LinkBadge href={getUrl()} fullText={address} label={label} />
}
