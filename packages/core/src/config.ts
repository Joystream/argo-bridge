import {
  ArgoBridgeV1__factory,
  JoystreamERC20__factory,
  TimelockController__factory,
} from "@joystream/argo-contracts/typechain-types"

export const CHAIN_IDS = {
  joystream: 0,
  // ethereum: 1,
  sepolia: 11155111,
  // base: 8453,
  // baseSepolia: 84532,
}

export type ChainId = keyof typeof CHAIN_IDS
export type EvmChainId = Exclude<ChainId, "joystream">

export const RPC_ENDPOINTS: Record<ChainId, string> = {
  joystream: "wss://rpc.joyutils.org",
  // ethereum: "https://rpc.ankr.com/eth",
  sepolia: "https://rpc.ankr.com/eth_sepolia",
}

type EvmContractsAddresses = {
  [chain in EvmChainId]: {
    erc20: `0x${string}`
    timelock: `0x${string}`
    bridge: `0x${string}`
  }
}

export const EVM_CONTRACTS_ADDRESSES: EvmContractsAddresses = {
  sepolia: {
    erc20: "0xa2717A92FCE2Acb20F83AD9233709D2ce512752E",
    bridge: "0xdb696e892681A86f421c136F317496DcB5Cb3Ace",
    timelock: "0xe070f47bf2849593f9745e448b2723C57B7E5292",
  },
}

export const Erc20Abi = JoystreamERC20__factory.abi
export const BridgeAbi = ArgoBridgeV1__factory.abi
export const TimelockAbi = TimelockController__factory.abi
