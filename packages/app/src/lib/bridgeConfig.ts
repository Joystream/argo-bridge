import { ARGO_INDEXER_URL, EVM_NETWORK, JOY_NETWORK } from '@/config'
import {
  EvmBridgeStatus,
  GetConfigsQuery,
  JoyBridgeStatus,
} from '@/gql/graphql'
import { getConfigsDocument } from '@/queries/configs'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { Address } from 'viem'

export type EvmBridgeConfig = {
  id: string
  status: EvmBridgeStatus
  bridgeOperatorAccounts: Address[]
  bridgeAdminAccounts: Address[]
  timelockAdminAccounts: Address[]
  pauserAccounts: Address[]
  mintingLimits: {
    periodLength: number
    periodLimit: bigint
    currentPeriodMinted: bigint
    currentPeriodEndBlock: number
  }
  bridgingFee: bigint
  totalBurned: bigint
  totalMinted: bigint
}

export type JoyBridgeConfig = {
  id: string
  status: JoyBridgeStatus
  operatorAccount: string
  pauserAccounts: string[]
  mintAllowance: bigint
  feesBurned: bigint
  bridgingFee: bigint
  supportedRemoteChainIds: number[]
  thawnDurationBlocks: number
  thawnEndsAtBlock?: number | null
  totalBurned: bigint
  totalMinted: bigint
}

function parseEvmBridgeConfig(
  raw: GetConfigsQuery['evmBridgeConfigs'][0],
): EvmBridgeConfig {
  return {
    id: raw.id,
    status: raw.status,
    bridgeOperatorAccounts: raw.bridgeOperatorAccounts as Address[],
    bridgeAdminAccounts: raw.bridgeAdminAccounts as Address[],
    timelockAdminAccounts: raw.timelockAdminAccounts as Address[],
    pauserAccounts: raw.pauserAccounts as Address[],
    mintingLimits: {
      periodLength: raw.mintingLimits.periodLength,
      periodLimit: BigInt(raw.mintingLimits.periodLimit),
      currentPeriodMinted: BigInt(raw.mintingLimits.currentPeriodMinted),
      currentPeriodEndBlock: raw.mintingLimits.currentPeriodEndBlock,
    },
    bridgingFee: BigInt(raw.bridgingFee),
    totalBurned: BigInt(raw.totalBurned),
    totalMinted: BigInt(raw.totalMinted),
  }
}

function parseJoyBridgeConfig(
  raw: GetConfigsQuery['joyBridgeConfigs'][0],
): JoyBridgeConfig {
  return {
    id: raw.id,
    status: raw.status,
    operatorAccount: raw.operatorAccount,
    pauserAccounts: raw.pauserAccounts,
    mintAllowance: BigInt(raw.mintAllowance),
    feesBurned: BigInt(raw.feesBurned),
    bridgingFee: BigInt(raw.bridgingFee),
    supportedRemoteChainIds: raw.supportedRemoteChainIds,
    thawnDurationBlocks: raw.thawnDurationBlocks,
    thawnEndsAtBlock: raw.thawnEndsAtBlock,
    totalBurned: BigInt(raw.totalBurned),
    totalMinted: BigInt(raw.totalMinted),
  }
}

async function fetchBridgeConfigs() {
  const data = await request(ARGO_INDEXER_URL, getConfigsDocument, {
    evmChainId: EVM_NETWORK.chainId.toString(),
    joyChainId: JOY_NETWORK.chainId.toString(),
  })
  if (
    data.evmBridgeConfigs.length !== 1 ||
    data.joyBridgeConfigs.length !== 1
  ) {
    throw new Error('Invalid bridge configs response')
  }

  return {
    evm: parseEvmBridgeConfig(data.evmBridgeConfigs[0]),
    joy: parseJoyBridgeConfig(data.joyBridgeConfigs[0]),
  }
}

export function useBridgeConfigs() {
  const query = useQuery({
    queryKey: ['bridgeConfigs', EVM_NETWORK.chainId, JOY_NETWORK.chainId],
    queryFn: fetchBridgeConfigs,
  })

  const isEvmPaused =
    query.data && query.data.evm.status !== EvmBridgeStatus.Active
  const isJoyPaused =
    query.data && query.data.joy.status !== JoyBridgeStatus.Active

  return {
    ...query,
    isEvmPaused,
    isJoyPaused,
  }
}
