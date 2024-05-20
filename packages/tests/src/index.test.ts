import {
  BridgeTransferStatus,
  EvmBridgeStatus,
  EvmTimelockCallStatus,
  GetBridgeTransfersDocument,
  GetEvmBridgeConfigDocument,
  GetTimelockCallsDocument,
} from "./gql/graphql.ts"
import {
  API_URL,
  cleanup,
  getEvmConfig,
  getEvmDeploymentParams,
  retry,
  setup,
} from "./setup"
import {
  BridgeAbi,
  Erc20Abi,
  NETWORKS,
  TimelockAbi,
} from "@joystream/argo-core"
import * as ss58 from "@subsquid/ss58"
import { afterAll, beforeAll, expect, test } from "bun:test"
import request from "graphql-request"
import {
  type Hex,
  bytesToHex,
  encodeFunctionData,
  maxUint256,
  zeroHash,
} from "viem"

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

let evmConfig: Awaited<ReturnType<typeof getEvmConfig>>
let deploymentParams: ReturnType<typeof getEvmDeploymentParams>["JoystreamEth"]
let mintingPeriodEndBlock: number | undefined

const addressCodec = ss58.codec("joystream")

beforeAll(async () => {
  // await setup()
  evmConfig = await getEvmConfig()
  deploymentParams = getEvmDeploymentParams("", "").JoystreamEth
})

// afterAll(async () => await cleanup())

const { chainId, contracts } = NETWORKS.hardhat
const { timelock, bridge, erc20 } = contracts

test("Successful contracts deployment", async () => {
  const minterRole = await evmConfig.publicClient.readContract({
    abi: Erc20Abi,
    address: contracts.erc20,
    functionName: "MINTER_ROLE",
  })
  expect(minterRole).toMatch(/0x/)
  const hasRole = await evmConfig.publicClient.readContract({
    abi: Erc20Abi,
    address: contracts.erc20,
    functionName: "hasRole",
    args: [minterRole, contracts.bridge],
  })
  expect(hasRole).toBe(true)
})

test("Squid available", async () => {
  const response = await fetch(API_URL)
  expect(response.status).toBe(200)
})

test("Initial squid state", async () => {
  const { bridgeFee, mintingLimitPeriodLengthBlocks, mintingLimitPerPeriod } =
    deploymentParams

  const timelocksResponse = await waitForSquid(
    () =>
      request(API_URL, GetTimelockCallsDocument, {
        where: {
          callSignature_eq: "updateDelay",
        },
      }),
    (response) =>
      response.evmTimelockCalls?.[0].status === EvmTimelockCallStatus.Executed,
  )
  expect(timelocksResponse.evmTimelockCalls.length).toBeGreaterThan(0)
  const firstCall = timelocksResponse.evmTimelockCalls[0]
  expect(firstCall.status).toBe(EvmTimelockCallStatus.Executed)

  const bridgeConfig = await getEvmBridgeConfig()
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

  mintingPeriodEndBlock = bridgeConfig.mintingLimits.currentPeriodEndBlock
})

test("Cancel timelock call", async () => {
  const { publicClient, walletClient, adminAccount } = evmConfig

  const callData = encodeFunctionData({
    abi: BridgeAbi,
    functionName: "pauseBridge",
  })
  const { salt } = await scheduleTimelockCall(bridge, callData)

  const operationHash = await publicClient.readContract({
    abi: TimelockAbi,
    address: timelock,
    functionName: "hashOperation",
    args: [bridge, 0n, callData, zeroHash, salt],
  })

  const cancelTxHash = await walletClient.writeContract({
    abi: TimelockAbi,
    address: timelock,
    account: adminAccount,
    functionName: "cancel",
    args: [operationHash],
  })
  const cancelResult = await publicClient.waitForTransactionReceipt({
    hash: cancelTxHash,
  })
  expect(cancelResult.status).toBe("success")

  const timelocksResponse = await waitForSquid(
    () =>
      request(API_URL, GetTimelockCallsDocument, {
        where: {
          callId_eq: operationHash,
        },
      }),
    (response) =>
      response.evmTimelockCalls[0].status === EvmTimelockCallStatus.Cancelled,
  )
  const call = timelocksResponse.evmTimelockCalls[0]
  expect(call.status).toBe(EvmTimelockCallStatus.Cancelled)
  expect(call.chainId).toBe(chainId.toString())
  expect(call.cancelledAtBlock).toBe(Number(cancelResult.blockNumber))
  expect(call.cancelledTxHash).toBe(cancelTxHash)
})

test("Unpause EVM bridge", async () => {
  const { publicClient, walletClient, otherAccount } = evmConfig

  const callData = encodeFunctionData({
    abi: BridgeAbi,
    functionName: "unpauseBridge",
  })
  await scheduleTimelockCall(bridge, callData)

  const timelocksResponse = await waitForSquid(
    () =>
      request(API_URL, GetTimelockCallsDocument, {
        where: {
          callSignature_eq: "unpauseBridge",
        },
      }),
    (response) => response.evmTimelockCalls.length > 0,
  )
  expect(timelocksResponse.evmTimelockCalls.length).toBeGreaterThan(0)
  const firstCall = timelocksResponse.evmTimelockCalls[0]
  expect(firstCall.status).toBe(EvmTimelockCallStatus.Pending)
  const delayDoneTimestamp = new Date(firstCall.delayDoneTimestamp)

  await increaseTime(delayDoneTimestamp)
  const executeTxHash = await walletClient.writeContract({
    abi: TimelockAbi,
    address: timelock,
    account: otherAccount,
    functionName: "execute",
    args: [
      firstCall.callTarget as Hex,
      BigInt(firstCall.callValue),
      firstCall.callData as Hex,
      firstCall.predecessor as Hex,
      firstCall.salt as Hex,
    ],
  })
  const executeResult = await publicClient.waitForTransactionReceipt({
    hash: executeTxHash,
  })
  expect(executeResult.status).toBe("success")

  const secondTimelocksResponse = await waitForSquid(
    () =>
      request(API_URL, GetTimelockCallsDocument, {
        where: {
          salt_eq: firstCall.salt,
        },
      }),
    (response) =>
      response.evmTimelockCalls[0].status === EvmTimelockCallStatus.Executed,
  )
  expect(secondTimelocksResponse.evmTimelockCalls[0].status).toBe(
    EvmTimelockCallStatus.Executed,
  )

  const bridgeConfigResponse = await waitForSquid(
    () =>
      request(API_URL, GetEvmBridgeConfigDocument, {
        chainId: chainId.toString(),
      }),
    (response) =>
      response.evmBridgeConfigs[0].status === EvmBridgeStatus.Active,
  )
  expect(bridgeConfigResponse.evmBridgeConfigs[0].status).toBe(
    EvmBridgeStatus.Active,
  )
})

test("Mint tokens to test account", async () => {
  const { publicClient, walletClient, otherAccount } = evmConfig
  const mintAmount = 10000n

  const minterRole = await publicClient.readContract({
    abi: Erc20Abi,
    address: erc20,
    functionName: "MINTER_ROLE",
  })

  const calldata = encodeFunctionData({
    abi: Erc20Abi,
    functionName: "grantRole",
    args: [minterRole, otherAccount],
  })
  const { salt, block, delay } = await scheduleTimelockCall(erc20, calldata)

  const delayDoneTimestamp = Number(block.timestamp + delay)
  await increaseTime(new Date(delayDoneTimestamp * 1000))

  const executeTxHash = await walletClient.writeContract({
    abi: TimelockAbi,
    address: timelock,
    account: otherAccount,
    functionName: "execute",
    args: [erc20, 0n, calldata, zeroHash, salt],
  })
  const executeResult = await publicClient.waitForTransactionReceipt({
    hash: executeTxHash,
  })
  expect(executeResult.status).toBe("success")

  const mintTxHash = await walletClient.writeContract({
    abi: Erc20Abi,
    address: erc20,
    account: otherAccount,
    functionName: "mint",
    args: [otherAccount, mintAmount],
  })

  const mintResult = await publicClient.waitForTransactionReceipt({
    hash: mintTxHash,
  })
  expect(mintResult.status).toBe("success")
})

test("Allowance for bridge", async () => {
  const { publicClient, walletClient, otherAccount } = evmConfig

  const txHash = await walletClient.writeContract({
    abi: Erc20Abi,
    address: contracts.erc20,
    account: otherAccount,
    functionName: "approve",
    args: [contracts.bridge, maxUint256],
  })

  const result = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  })
  expect(result.status).toBe("success")
})

test("Request transfer to Joystream", async () => {
  const { otherAccount } = evmConfig

  const ethRequester = otherAccount
  const transferAmount = randomAmount()
  const [transfer, encodedJoyDestAccount, txHash, blockNumber] =
    await requestEvmTransfer(transferAmount, zeroHash, ethRequester)

  const bridgeConfig = await getEvmBridgeConfig()

  expect(transfer.amount).toBe(transferAmount.toString())
  expect(transfer.status).toBe(BridgeTransferStatus.Requested)
  expect(transfer.feePaid).toBe(bridgeConfig.bridgingFee)
  expect(transfer.sourceChainId).toBe(chainId.toString())
  expect(transfer.sourceAccount).toBe(ethRequester.toLowerCase())
  expect(transfer.destChainId).toBe(NETWORKS.joystream.chainId.toString())
  expect(transfer.destAccount).toBe(encodedJoyDestAccount)
  expect(transfer.createdAtBlock).toBe(Number(blockNumber))
  expect(transfer.createdTxHash).toBe(txHash)

  expect(bridgeConfig.totalMinted).toBe("0")
  expect(bridgeConfig.totalBurned).toBe(transferAmount.toString())
})

test("Complete transfer from Joystream", async () => {
  const { operatorAccount } = evmConfig

  const amount = randomAmount()

  const [transfer, createdTxHash, blockNumber] = await completeEvmTransfer(
    1n,
    amount,
    operatorAccount,
  )

  expect(transfer.status).toBe(BridgeTransferStatus.MaybeCompleted)
  expect(transfer.amount).toBe(amount.toString())
  expect(transfer.destChainId).toBe(chainId.toString())
  expect(transfer.destAccount).toBe(operatorAccount.toLowerCase())
  expect(transfer.sourceChainId).toBe(NETWORKS.joystream.chainId.toString())
  expect(transfer.sourceTransferId).toBe("1")
  expect(transfer.completedAtBlock).toBe(Number(blockNumber))
  expect(transfer.completedTxHash).toBe(createdTxHash)

  const bridgeConfig = await getEvmBridgeConfig()
  expect(bridgeConfig.totalMinted).toBe(amount.toString())
  expect(bridgeConfig.mintingLimits.currentPeriodMinted).toBe(amount.toString())
})

test("Check EVM minting periods", async () => {
  const { publicClient, testClient, operatorAccount } = evmConfig

  let bridgeConfig = await getEvmBridgeConfig()
  const currentPeriodEndBlock = bridgeConfig.mintingLimits.currentPeriodEndBlock
  await testClient.mine({
    blocks: currentPeriodEndBlock - Number(await publicClient.getBlockNumber()),
  })

  const amount = randomAmount()
  const [_, __, blockNumber] = await completeEvmTransfer(
    2n,
    amount,
    operatorAccount,
  )
  bridgeConfig = await getEvmBridgeConfig()
  expect(bridgeConfig.mintingLimits.currentPeriodMinted).toBe(amount.toString())
  expect(bridgeConfig.mintingLimits.currentPeriodEndBlock).toBe(
    Number(blockNumber) + bridgeConfig.mintingLimits.periodLength,
  )
})

async function requestEvmTransfer(
  amount: bigint,
  joyDestAccount: Hex,
  requester: Hex,
) {
  const { walletClient, publicClient } = evmConfig
  const { bridgeFee } = deploymentParams
  const encodedJoyDestAccount = addressCodec.encode(joyDestAccount)

  const txHash = await walletClient.writeContract({
    abi: BridgeAbi,
    address: contracts.bridge,
    account: requester,
    value: BigInt(bridgeFee),
    functionName: "requestTransferToJoystream",
    args: [joyDestAccount, amount],
  })
  const result = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  })
  expect(result.status).toBe("success")

  const transfersResponse = await waitForSquid(
    () =>
      request(API_URL, GetBridgeTransfersDocument, {
        where: {
          destAccount_eq: encodedJoyDestAccount,
          amount_eq: amount.toString(),
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBeGreaterThan(0)
  const transfer = transfersResponse.bridgeTransfers[0]

  return [transfer, encodedJoyDestAccount, txHash, result.blockNumber] as const
}

async function completeEvmTransfer(
  id: bigint,
  amount: bigint,
  ethDestAccount: Hex,
) {
  const { walletClient, publicClient, operatorAccount } = evmConfig

  const completeTxHash = await walletClient.writeContract({
    abi: BridgeAbi,
    address: contracts.bridge,
    account: operatorAccount,
    functionName: "completeTransferToEth",
    args: [id, ethDestAccount, amount],
  })
  const completeResult = await publicClient.waitForTransactionReceipt({
    hash: completeTxHash,
  })
  expect(completeResult.status).toBe("success")

  const transfersResponse = await waitForSquid(
    () =>
      request(API_URL, GetBridgeTransfersDocument, {
        where: {
          sourceChainId_eq: NETWORKS.joystream.chainId.toString(),
          sourceTransferId_eq: id.toString(),
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBe(1)
  const transfer = transfersResponse.bridgeTransfers[0]
  return [transfer, completeTxHash, completeResult.blockNumber] as const
}

async function waitForSquid<TData>(
  fn: () => Promise<TData>,
  assertion: (data: TData) => boolean,
) {
  return await retry(
    async () => {
      const data = await fn()
      if (assertion(data)) {
        return data
      } else {
        throw new Error("Assertion failed")
      }
    },
    { retries: 10, timeout: 1000 },
  )
}

async function increaseTime(newDate: Date) {
  return await evmConfig.testClient.setNextBlockTimestamp({
    timestamp: BigInt(newDate.getTime() / 1000),
  })
}

async function getEvmBridgeConfig() {
  const bridgeConfigs = await request(API_URL, GetEvmBridgeConfigDocument, {
    chainId: chainId.toString(),
  })
  expect(bridgeConfigs.evmBridgeConfigs.length).toBe(1)
  return bridgeConfigs.evmBridgeConfigs[0]
}

function randomAmount() {
  return BigInt(Math.floor(Math.random() * 100) + 1)
}

async function scheduleTimelockCall(callTarget: Hex, callData: Hex) {
  const { walletClient, adminAccount, publicClient } = evmConfig

  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(32)))
  const delay = BigInt(deploymentParams.timelockDelay)
  const txHash = await walletClient.writeContract({
    abi: TimelockAbi,
    address: timelock,
    account: adminAccount,
    functionName: "schedule",
    args: [callTarget, 0n, callData, zeroHash, salt, delay],
  })
  const result = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  })
  expect(result.status).toBe("success")
  const block = await publicClient.getBlock({
    blockNumber: result.blockNumber,
  })
  return {
    salt,
    txHash,
    block,
    delay,
  }
}
