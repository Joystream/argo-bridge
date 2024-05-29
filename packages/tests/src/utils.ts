import { getEvmConfig, getEvmDeploymentParams } from "./setup"
import { NETWORKS, TimelockAbi } from "@joystream/argo-core"
import { expect } from "bun:test"
import { type Hex, TestClient, bytesToHex, zeroHash } from "viem"

const { timelock } = NETWORKS.hardhat.contracts!

export async function increaseTime(testClient: TestClient, newDate: Date) {
  return await testClient.setNextBlockTimestamp({
    timestamp: BigInt(Math.floor(newDate.getTime())),
  })
}

export async function scheduleTimelockCall(callTarget: Hex, callData: Hex) {
  const {
    JoystreamEth: { timelockDelay },
  } = getEvmDeploymentParams("", "")
  const { walletClient, adminAccount, publicClient } = await getEvmConfig()

  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(32)))
  const delay = BigInt(timelockDelay)
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
