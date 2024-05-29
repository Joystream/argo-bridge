import { getEvmConfig } from "../src/setup"
import { increaseTime, scheduleTimelockCall } from "../src/utils"
import { BridgeAbi, NETWORKS, TimelockAbi } from "@joystream/argo-core"
import { encodeFunctionData, zeroHash } from "viem"

const { bridge, timelock } = NETWORKS.hardhat.contracts!

async function main() {
  const { publicClient, walletClient, testClient, otherAccount } =
    await getEvmConfig()

  const callData = encodeFunctionData({
    abi: BridgeAbi,
    functionName: "unpauseBridge",
  })
  const { salt, delay, block } = await scheduleTimelockCall(bridge, callData)

  const delayDoneTimestamp = new Date(Number(block.timestamp + delay) * 1000)

  await increaseTime(testClient, delayDoneTimestamp)
  const executeTxHash = await walletClient.writeContract({
    abi: TimelockAbi,
    address: timelock,
    account: otherAccount,
    functionName: "execute",
    args: [bridge, 0n, callData, zeroHash, salt],
  })
  await publicClient.waitForTransactionReceipt({
    hash: executeTxHash,
  })
}

await main()
