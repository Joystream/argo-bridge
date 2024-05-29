import {
  BridgeTransferStatus,
  EvmBridgeStatus,
  EvmTimelockCallStatus,
  GetBridgeTransfersDocument,
  GetEvmBridgeConfigDocument,
  GetJoyBridgeConfigDocument,
  GetTimelockCallsDocument,
  JoyBridgeStatus,
} from "./gql/graphql"
import {
  API_URL,
  cleanup,
  councilAccounts,
  getEvmConfig,
  getEvmDeploymentParams,
  joyApi,
  proposerAccount,
  proposerStakeAccount,
  retry,
  sendExtrinsic,
  setup,
  waitUntilBlock,
} from "./setup"
import { increaseTime, scheduleTimelockCall } from "./utils"
import {
  BridgeAbi,
  Erc20Abi,
  NETWORKS,
  TimelockAbi,
} from "@joystream/argo-core"
import { KeyringPair } from "@polkadot/keyring/types"
import * as ss58 from "@subsquid/ss58"
import { afterAll, beforeAll, expect, test } from "bun:test"
import request from "graphql-request"
import { type Hex, encodeFunctionData, maxUint256, pad, zeroHash } from "viem"

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

let joyBridgeOperator: KeyringPair
let joyBridgePauser: KeyringPair

const addressCodec = ss58.codec("joystream")

beforeAll(async () => {
  await setup()
  // await electCouncil()
  // await setupJoyApi()
  joyBridgeOperator = councilAccounts[0]
  joyBridgePauser = councilAccounts[1]
  evmConfig = await getEvmConfig()
  deploymentParams = getEvmDeploymentParams("", "").JoystreamEth
})

afterAll(async () => await cleanup())

const { chainId: evmChainId, contracts: _contracts } = NETWORKS.hardhat
const joyChainId = NETWORKS.joystream.chainId
const joyTransferId = (id: bigint) => `${joyChainId}-${id}`
const evmTransferId = (id: bigint) => `${evmChainId}-${id}`

const contracts = _contracts!
const { timelock, bridge, erc20 } = contracts

test("Successful EVM contracts deployment", async () => {
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
  expect(bridgeConfig.id).toBe(evmChainId.toString())
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

test("Cancel EVM timelock call", async () => {
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
  expect(call.chainId).toBe(evmChainId)
  expect(call.cancelledAtBlock).toBe(Number(cancelResult.blockNumber))
  expect(call.cancelledTxHash).toBe(cancelTxHash)
})

test("Unpause EVM bridge", async () => {
  const { publicClient, walletClient, testClient, otherAccount } = evmConfig

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

  await increaseTime(testClient, delayDoneTimestamp)
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
        chainId: evmChainId.toString(),
      }),
    (response) =>
      response.evmBridgeConfigs[0].status === EvmBridgeStatus.Active,
  )
  expect(bridgeConfigResponse.evmBridgeConfigs[0].status).toBe(
    EvmBridgeStatus.Active,
  )
})

test("Update JOY bridge config", async () => {
  const generalProposalParams = joyApi.createType(
    "PalletProposalsCodexGeneralProposalParams",
    {
      memberId: councilAccounts.length,
      title: "Update Argo config",
      description: "Update Argo config",
      stakingAccountId: proposerStakeAccount.address,
    },
  )
  const proposalDetails = joyApi.createType(
    "PalletProposalsCodexProposalDetails",
    {
      UpdateArgoBridgeConstraints: joyApi.createType(
        "PalletArgoBridgeBridgeConstraints",
        {
          operatorAccount: joyBridgeOperator.address,
          pauserAccounts: [joyBridgePauser.address],
          bridgingFee: 4_000,
          thawnDuration: 20,
          remoteChains: [evmChainId],
        },
      ),
    },
  )
  await sendExtrinsic(
    joyApi.tx.proposalsCodex.createProposal(
      generalProposalParams,
      proposalDetails,
    ),
    proposerAccount,
  )

  // we only need 3 votes to approve
  for (let i = 0; i < 3; i++) {
    const voteKind = joyApi.createType(
      "PalletProposalsEngineVoteKind",
      "Approve",
    )
    await sendExtrinsic(
      joyApi.tx.proposalsEngine.vote(i, 1, voteKind, "0x0"),
      councilAccounts[i],
    )
  }

  // grace period is 0
  const _bridgeConfig = await waitForSquid(
    () =>
      request(API_URL, GetJoyBridgeConfigDocument, {
        chainId: joyChainId.toString(),
      }),
    (response) =>
      response?.joyBridgeConfigs?.[0]?.operatorAccount ===
      councilAccounts[0].address,
  )
  const bridgeConfig = _bridgeConfig.joyBridgeConfigs[0]
  expect(bridgeConfig.bridgingFee).toBe("4000")
  expect(bridgeConfig.operatorAccount).toBe(councilAccounts[0].address)
  expect(bridgeConfig.pauserAccounts).toEqual([councilAccounts[1].address])
  expect(bridgeConfig.thawnDurationBlocks).toBe(20)
  expect(bridgeConfig.supportedRemoteChainIds).toEqual([evmChainId])
})

test("Unpause JOY bridge", async () => {
  await sendExtrinsic(joyApi.tx.argoBridge.initUnpauseBridge(), joyBridgePauser)

  const _bridgeConfig = await waitForSquid(
    () =>
      request(API_URL, GetJoyBridgeConfigDocument, {
        chainId: joyChainId.toString(),
      }),
    (response) => response?.joyBridgeConfigs?.[0]?.thawnEndsAtBlock != null,
  )
  const bridgeConfig = _bridgeConfig.joyBridgeConfigs[0]
  const { thawnEndsAtBlock } = bridgeConfig
  await waitUntilBlock(joyApi, thawnEndsAtBlock! + 1)

  await sendExtrinsic(
    joyApi.tx.argoBridge.finishUnpauseBridge(),
    joyBridgeOperator,
  )

  const _bridgeConfig2 = await waitForSquid(
    () =>
      request(API_URL, GetJoyBridgeConfigDocument, {
        chainId: joyChainId.toString(),
      }),
    (response) =>
      response?.joyBridgeConfigs?.[0]?.status === JoyBridgeStatus.Active,
  )
  const bridgeConfig2 = _bridgeConfig2.joyBridgeConfigs[0]
  expect(bridgeConfig2.status).toBe(JoyBridgeStatus.Active)
  expect(bridgeConfig2.thawnEndsAtBlock).toBeNull()
})

test("Mint EVM tokens to test account", async () => {
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

  const allowanceTxHash = await walletClient.writeContract({
    abi: Erc20Abi,
    address: contracts.erc20,
    account: otherAccount,
    functionName: "approve",
    args: [contracts.bridge, maxUint256],
  })

  const allowanceResult = await publicClient.waitForTransactionReceipt({
    hash: allowanceTxHash,
  })
  expect(allowanceResult.status).toBe("success")
})

test("Request new JOY->EVM transfer", async () => {
  const destAccount = evmConfig.otherAccount

  const amount = 200n

  const [transfer, txHash, expectedFee] = await requestJoyTransfer(
    amount,
    evmChainId,
    destAccount,
    proposerAccount,
  )

  const joyBridgeConfig = await getJoyBridgeConfig()

  expect(transfer.status).toBe(BridgeTransferStatus.Requested)
  expect(transfer.createdTxHash).toBe(txHash)
  expect(transfer.feePaid).toBe(expectedFee.toString())
  expect(transfer.sourceAccount).toBe(proposerAccount.address)
  expect(transfer.sourceChainId).toBe(joyChainId)
  expect(transfer.sourceTransferId).toBe("0")
  expect(transfer.destChainId).toBe(evmChainId)
  expect(transfer.destAccount).toBe(destAccount.toLowerCase())
  expect(transfer.amount).toBe(amount.toString())
  expect(transfer.completedTxHash).toBeNull()
  expect(transfer.completedAtBlock).toBeNull()
  expect(transfer.completedAtTimestamp).toBeNull()

  expect(joyBridgeConfig.totalBurned).toBe(amount.toString())
  expect(joyBridgeConfig.totalMinted).toBe("0")
  expect(joyBridgeConfig.feesBurned).toBe(expectedFee.toString())
  expect(joyBridgeConfig.mintAllowance).toBe(amount.toString())
})

test("Finalize known JOY->EVM transfer", async () => {
  const { operatorAccount } = evmConfig

  const amount = 200n

  const [transfer, createdTxHash, blockNumber] = await completeEvmTransfer(
    0n,
    amount,
    operatorAccount,
  )

  expect(transfer.status).toBe(BridgeTransferStatus.Completed)
  expect(transfer.completedAtBlock).toBe(Number(blockNumber))
  expect(transfer.completedTxHash).toBe(createdTxHash)

  const evmBridgeConfig = await getEvmBridgeConfig()
  expect(evmBridgeConfig.totalMinted).toBe(amount.toString())
  expect(evmBridgeConfig.mintingLimits.currentPeriodMinted).toBe(
    amount.toString(),
  )
  expect(evmBridgeConfig.mintingLimits.currentPeriodMinted).toBe(
    amount.toString(),
  )
})

test("Request new EVM->JOY transfer", async () => {
  const { otherAccount } = evmConfig

  const bridgeConfigBefore = await getEvmBridgeConfig()

  const ethRequester = otherAccount
  const transferAmount = 100n
  const [transfer, txHash, blockNumber] = await requestEvmTransfer(
    transferAmount,
    proposerAccount.address,
    ethRequester,
  )

  const bridgeConfigAfter = await getEvmBridgeConfig()

  expect(transfer.amount).toBe(transferAmount.toString())
  expect(transfer.status).toBe(BridgeTransferStatus.Requested)
  expect(transfer.feePaid).toBe(bridgeConfigBefore.bridgingFee)
  expect(transfer.sourceChainId).toBe(evmChainId)
  expect(transfer.sourceAccount).toBe(ethRequester.toLowerCase())
  expect(transfer.sourceTransferId).toBe("0")
  expect(transfer.destChainId).toBe(joyChainId)
  expect(transfer.destAccount).toBe(proposerAccount.address)
  expect(transfer.createdAtBlock).toBe(Number(blockNumber))
  expect(transfer.createdTxHash).toBe(txHash)

  expect(bridgeConfigAfter.totalMinted).toBe(bridgeConfigBefore.totalMinted)
  expect(bridgeConfigAfter.totalBurned).toBe(transferAmount.toString())
})

test("Finalize known EVM->JOY transfer", async () => {
  const { sourceChainId, sourceTransferId, destAccount, amount } =
    await getTransfer(evmTransferId(0n))

  const bridgeConfigBefore = await getJoyBridgeConfig()

  const [transfer, txHash] = await completeJoyTransfer(
    sourceChainId,
    BigInt(sourceTransferId),
    destAccount,
    BigInt(amount),
  )

  const bridgeConfigAfter = await getJoyBridgeConfig()

  expect(transfer.status).toBe(BridgeTransferStatus.Completed)
  expect(transfer.completedTxHash).toBe(txHash)

  expect(bridgeConfigAfter.totalMinted).toBe(amount)
  expect(bridgeConfigAfter.totalBurned).toBe(bridgeConfigBefore.totalBurned)
  expect(bridgeConfigAfter.mintAllowance).toBe(
    (BigInt(bridgeConfigBefore.mintAllowance) - BigInt(amount)).toString(),
  )
})

test("Finalize unknown JOY->EVM transfer", async () => {
  const { operatorAccount } = evmConfig

  const amount = 200n
  const transferId = 1n

  const bridgeConfigBefore = await getEvmBridgeConfig()

  const [transfer, txHash, blockNumber] = await completeEvmTransfer(
    transferId,
    amount,
    operatorAccount,
  )

  expect(transfer.status).toBe(BridgeTransferStatus.MaybeCompleted)
  expect(transfer.amount).toBe(amount.toString())
  expect(transfer.destChainId).toBe(evmChainId)
  expect(transfer.destAccount).toBe(operatorAccount.toLowerCase())
  expect(transfer.sourceChainId).toBe(joyChainId)
  expect(transfer.sourceTransferId).toBe(transferId.toString())
  expect(transfer.completedAtBlock).toBe(Number(blockNumber))
  expect(transfer.completedTxHash).toBe(txHash)

  const bridgeConfigAfter = await getEvmBridgeConfig()
  expect(bridgeConfigAfter.totalMinted).toBe(
    (BigInt(bridgeConfigBefore.totalMinted) + amount).toString(),
  )
})

test("Request previously maybe-completed JOY->EVM transfer", async () => {
  const { amount, destChainId, destAccount } = await getTransfer(
    joyTransferId(1n),
  )

  const bridgeConfigBefore = await getJoyBridgeConfig()

  const [transfer, txHash, expectedFee] = await requestJoyTransfer(
    BigInt(amount),
    destChainId,
    destAccount as Hex,
    proposerAccount,
  )

  const bridgeConfigAfter = await getJoyBridgeConfig()

  expect(transfer.status).toBe(BridgeTransferStatus.Completed)
  expect(transfer.createdTxHash).toBe(txHash)
  expect(transfer.sourceAccount).toBe(proposerAccount.address)
  expect(transfer.feePaid).toBe(expectedFee.toString())

  expect(bridgeConfigAfter.totalMinted).toBe(bridgeConfigBefore.totalMinted)
  expect(bridgeConfigAfter.totalBurned).toBe(
    (BigInt(bridgeConfigBefore.totalBurned) + BigInt(amount)).toString(),
  )
  expect(bridgeConfigAfter.feesBurned).toBe(
    (BigInt(bridgeConfigBefore.feesBurned) + expectedFee.toBigInt()).toString(),
  )
})

test("Finalize unknown EVM->JOY", async () => {
  const amount = 100n
  const transferId = 1n

  const [transfer, txHash] = await completeJoyTransfer(
    evmChainId,
    transferId,
    proposerAccount.address,
    amount,
  )
  expect(transfer.status).toBe(BridgeTransferStatus.MaybeCompleted)
  expect(transfer.completedTxHash).toBe(txHash)
  expect(transfer.amount).toBe(amount.toString())
  expect(transfer.sourceChainId).toBe(evmChainId)
  expect(transfer.sourceTransferId).toBe(transferId.toString())
  expect(transfer.destChainId).toBe(joyChainId)
  expect(transfer.destAccount).toBe(proposerAccount.address)
})

test("Request previously maybe-completed EVM->JOY transfer", async () => {
  const { amount, destAccount } = await getTransfer(evmTransferId(1n))

  const [transfer, txHash, blockNumber] = await requestEvmTransfer(
    BigInt(amount),
    destAccount,
    evmConfig.otherAccount,
  )

  const bridgeConfig = await getEvmBridgeConfig()

  expect(transfer.status).toBe(BridgeTransferStatus.Completed)
  expect(transfer.createdTxHash).toBe(txHash)
  expect(transfer.createdAtBlock).toBe(Number(blockNumber))
  expect(transfer.sourceAccount).toBe(evmConfig.otherAccount.toLowerCase())
  expect(transfer.feePaid).toBe(bridgeConfig.bridgingFee.toString())
})

test("Check EVM minting periods", async () => {
  const { publicClient, testClient, operatorAccount } = evmConfig

  let bridgeConfig = await getEvmBridgeConfig()
  const currentPeriodEndBlock = bridgeConfig.mintingLimits.currentPeriodEndBlock
  const blocksToMine =
    currentPeriodEndBlock - Number(await publicClient.getBlockNumber())
  for (let i = 0; i < blocksToMine; i++) {
    // @ts-ignore
    await testClient.request({
      method: "evm_mine",
    })
  }

  const amount = randomAmount()
  const [_, __, blockNumber] = await completeEvmTransfer(
    100n,
    amount,
    operatorAccount,
  )
  bridgeConfig = await getEvmBridgeConfig()
  expect(bridgeConfig.mintingLimits.currentPeriodMinted).toBe(amount.toString())
  expect(bridgeConfig.mintingLimits.currentPeriodEndBlock).toBe(
    Number(blockNumber) + bridgeConfig.mintingLimits.periodLength,
  )
})

// utils

async function requestJoyTransfer(
  amount: bigint,
  destChainId: number,
  destAccount: Hex,
  requester: KeyringPair,
) {
  const encodedDestAccount = joyApi.createType("Bytes", pad(destAccount))
  const remoteAccount = joyApi.createType("PalletArgoBridgeRemoteAccount", {
    account: encodedDestAccount,
    chain_id: destChainId,
  })
  const expectedFee = await joyApi.query.argoBridge.bridgingFee()
  const { transactionHash } = await sendExtrinsic(
    joyApi.tx.argoBridge.requestOutboundTransfer(
      remoteAccount,
      amount,
      expectedFee,
    ),
    requester,
  )

  const transfersResponse = await waitForSquid(
    () =>
      request(API_URL, GetBridgeTransfersDocument, {
        where: {
          createdTxHash_eq: transactionHash,
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBeGreaterThan(0)
  const transfer = transfersResponse.bridgeTransfers[0]

  return [transfer, transactionHash, expectedFee] as const
}

async function completeJoyTransfer(
  sourceChainId: number,
  sourceTransferId: bigint,
  joyDestAccount: string,
  amount: bigint,
) {
  const { transactionHash } = await sendExtrinsic(
    joyApi.tx.argoBridge.finalizeInboundTransfer(
      joyApi.createType("PalletArgoBridgeRemoteTransfer", {
        id: sourceTransferId,
        chain_id: sourceChainId,
      }),
      addressCodec.decode(joyDestAccount),
      amount,
    ),
    joyBridgeOperator,
  )

  const transfersResponse = await waitForSquid(
    () =>
      request(API_URL, GetBridgeTransfersDocument, {
        where: {
          completedTxHash_eq: transactionHash,
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBeGreaterThan(0)
  const transfer = transfersResponse.bridgeTransfers[0]

  return [transfer, transactionHash] as const
}

async function requestEvmTransfer(
  amount: bigint,
  joyDestAccount: string,
  requester: Hex,
) {
  const { walletClient, publicClient } = evmConfig
  const { bridgeFee } = deploymentParams
  const encodedJoyDestAccount = addressCodec.decode(joyDestAccount)

  const txHash = await walletClient.writeContract({
    abi: BridgeAbi,
    address: contracts.bridge,
    account: requester,
    value: BigInt(bridgeFee),
    functionName: "requestTransferToJoystream",
    args: [encodedJoyDestAccount as Hex, amount],
  })
  const result = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  })
  expect(result.status).toBe("success")

  const transfersResponse = await waitForSquid(
    () =>
      request(API_URL, GetBridgeTransfersDocument, {
        where: {
          createdTxHash_eq: txHash,
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBeGreaterThan(0)
  const transfer = transfersResponse.bridgeTransfers[0]

  return [transfer, txHash, result.blockNumber] as const
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
          completedTxHash_eq: completeTxHash,
        },
      }),
    (response) => response.bridgeTransfers.length > 0,
  )
  expect(transfersResponse.bridgeTransfers.length).toBe(1)
  const transfer = transfersResponse.bridgeTransfers[0]
  return [transfer, completeTxHash, completeResult.blockNumber] as const
}

async function getTransfer(id: string) {
  const response = await request(API_URL, GetBridgeTransfersDocument, {
    where: {
      id_eq: id,
    },
  })
  return response.bridgeTransfers[0]
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

async function getEvmBridgeConfig() {
  const bridgeConfigs = await request(API_URL, GetEvmBridgeConfigDocument, {
    chainId: evmChainId.toString(),
  })
  expect(bridgeConfigs.evmBridgeConfigs.length).toBe(1)
  return bridgeConfigs.evmBridgeConfigs[0]
}

async function getJoyBridgeConfig() {
  const bridgeConfigs = await request(API_URL, GetJoyBridgeConfigDocument, {
    chainId: joyChainId.toString(),
  })
  expect(bridgeConfigs.joyBridgeConfigs.length).toBe(1)
  return bridgeConfigs.joyBridgeConfigs[0]
}

function randomAmount() {
  return BigInt(Math.floor(Math.random() * 100) + 1)
}
