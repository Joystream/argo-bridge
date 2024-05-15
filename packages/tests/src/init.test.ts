import {
  EvmBridgeStatus,
  GetEvmBridgeConfigDocument,
  GetTimelockCallsDocument,
} from "./gql/graphql.ts"
import {
  API_URL,
  type EvmConfig,
  cleanup,
  getEvmConfig,
  getEvmDeploymentParams,
} from "./setup"
import { Erc20Abi, NETWORKS } from "@joystream/argo-core"
import { beforeAll, expect, test } from "bun:test"
import request from "graphql-request"
import type { Hex } from "viem"

let evmConfig: EvmConfig | undefined

process.on("SIGINT", async () => {
  console.log("SIGINT received")
  await cleanup()
  process.exit()
})
process.on("SIGTERM", async () => {
  console.log("SIGTERM received")
  await cleanup()
  process.exit()
})
process.on("uncaughtException", async () => {
  console.log("uncaughtException received")
  await cleanup()
  process.exit()
})
process.on("exit", async () => {
  console.log("exit received")
})

beforeAll(async () => {
  // await setup()
  evmConfig = await getEvmConfig()
})

// afterAll(async () => await cleanup())

const { chainId, contracts } = NETWORKS.hardhat

test("Successful contracts deployment", async () => {
  if (!evmConfig) throw new Error("Evm config not set")
  const minterRole = await evmConfig.publicClient.readContract({
    abi: Erc20Abi,
    address: contracts.erc20 as Hex,
    functionName: "MINTER_ROLE",
  })
  expect(minterRole).toMatch(/0x/)
  const hasRole = await evmConfig.publicClient.readContract({
    abi: Erc20Abi,
    address: contracts.erc20 as Hex,
    functionName: "hasRole",
    args: [minterRole, contracts.bridge],
  })
  expect(hasRole).toBe(true)
})

test("Squid available", async () => {
  const response = await fetch("http://localhost:4350/graphql")
  expect(response.status).toBe(200)
})

test("Initial squid state", async () => {
  const {
    JoystreamEth: {
      bridgeFee,
      mintingLimitPeriodLengthBlocks,
      mintingLimitPerPeriod,
    },
  } = getEvmDeploymentParams("", "")

  const timelocksResponse = await request(API_URL, GetTimelockCallsDocument, {})
  expect(timelocksResponse.evmTimelockCalls.length).toBe(1)

  const bridgeConfigResponse = await request(
    API_URL,
    GetEvmBridgeConfigDocument,
    {
      chainId: chainId.toString(),
    },
  )
  expect(bridgeConfigResponse.evmBridgeConfigs.length).toBe(1)
  const bridgeConfig = bridgeConfigResponse.evmBridgeConfigs[0]
  expect(bridgeConfig.id).toBe(chainId.toString())
  expect(bridgeConfig.status).toBe(EvmBridgeStatus.Paused)
  expect(bridgeConfig.bridgingFee).toBe(bridgeFee.toString())
  expect(bridgeConfig.mintingLimits.periodLength).toBe(
    mintingLimitPeriodLengthBlocks,
  )
  expect(bridgeConfig.mintingLimits.periodLimit).toBe(
    mintingLimitPerPeriod.toString(),
  )
  expect(bridgeConfig.mintingLimits.currentPeriodMinted).toBe("0")
  expect(bridgeConfig.totalMinted).toBe("0")
  expect(bridgeConfig.totalBurned).toBe("0")
})

// test("")
