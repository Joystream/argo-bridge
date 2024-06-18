import { EVM_NETWORKS, JOY_NETWORKS } from '@joystream/argo-core'

// export const RPC_URL = 'wss://rpc.joyutils.org'
export const ARGO_INDEXER_URL = 'https://argo.joyutils.org/graphql'

export const JOYSTREAM_CHAIN_ID = 'polkadot:6b5e488e0fa8f9821110d5c13f4c468a'
export const JOYSTREAM_SS58_PREFIX = 126

export const APP_NAME = 'Argo Bridge'
export const WC_PROJECT_ID = '182045328bc80762fd8f59b92190dc13'
export const WC_METADATA = {
  name: 'Argo Bridge',
  description: 'Bridge between Joystream L1 and EVM chains',
  url: 'https://joystream.org',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const EVM_NETWORK = EVM_NETWORKS.baseSepolia
export const JOY_NETWORK = JOY_NETWORKS.petra
export const BRIDGE_ADDRESS = EVM_NETWORK.contracts.bridge
export const TIMELOCK_ADDRESS = EVM_NETWORK.contracts.timelock
export const ERC20_ADDRESS = EVM_NETWORK.contracts.erc20
