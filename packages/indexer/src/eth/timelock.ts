import { EvmTimelockCall, EvmTimelockCallStatus } from "../model"
import * as timelockControllerAbi from "./abi/timelockController"
import { ARGO_ADDRESS, TIMELOCK_ADDRESS } from "./processor"
import { BridgeAbi, TimelockAbi } from "@joystream/argo-core"
import { DataHandlerContext, Log } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { decodeFunctionData, zeroHash } from "viem"

export async function handleTimelockEvents(
  logs: Log<{ log: { transactionHash: true } }>[],
  ctx: DataHandlerContext<Store>,
): Promise<void> {
  const calls: Map<string, EvmTimelockCall> = new Map()

  const getCall = async (id: string, txHash: string) => {
    let call = calls.get(id)
    if (!call) {
      call = await ctx.store.findOne(EvmTimelockCall, { where: { id } })
      if (call) {
        calls.set(id, call)
      } else {
        ctx.log.error(`Timelock call not found: ${id}. Tx: ${txHash}`)
      }
    }
    return call
  }

  for (const log of logs) {
    switch (log.topics[0]) {
      case timelockControllerAbi.events.CallScheduled.topic: {
        const { id, target, value, data, predecessor, delay } =
          timelockControllerAbi.events.CallScheduled.decode(log)

        const decodedCall = decodeCall(target, data)

        calls.set(
          id,
          new EvmTimelockCall({
            id,
            createdAtBlock: log.block.height,
            createdAtTimestamp: new Date(log.block.timestamp),
            createdTxHash: log.transactionHash,
            status: EvmTimelockCallStatus.PENDING,

            callTarget: target,
            callValue: value,
            callData: data,
            callSignature: decodedCall[0],
            callArgs: decodedCall[1],

            predecessor: predecessor !== zeroHash ? predecessor : null,
            delayDoneTimestamp: new Date(
              log.block.timestamp + Number(delay) * 1000,
            ),
          }),
        )
        break
      }

      case timelockControllerAbi.events.CallSalt.topic: {
        const { id, salt } = timelockControllerAbi.events.CallSalt.decode(log)
        const call = await getCall(id, log.transactionHash)
        if (call) {
          call.salt = salt
        }
        break
      }

      case timelockControllerAbi.events.CallExecuted.topic: {
        const { id } = timelockControllerAbi.events.CallExecuted.decode(log)
        const call = await getCall(id, log.transactionHash)
        if (call) {
          call.status = EvmTimelockCallStatus.EXECUTED
          call.executedAtBlock = log.block.height
          call.executedAtTimestamp = new Date(log.block.timestamp)
          call.executedTxHash = log.transactionHash
        }
        break
      }

      case timelockControllerAbi.events.Cancelled.topic: {
        const { id } = timelockControllerAbi.events.Cancelled.decode(log)
        const call = await getCall(id, log.transactionHash)
        if (call) {
          call.status = EvmTimelockCallStatus.CANCELLED
          call.cancelledAtBlock = log.block.height
          call.cancelledAtTimestamp = new Date(log.block.timestamp)
          call.cancelledTxHash = log.transactionHash
        }
        break
      }
    }

    await ctx.store.save([...calls.values()])
  }
}

function decodeCall(
  callTarget: string,
  callData: string,
): [string | null, string | null] {
  let functionName: string | null = null
  let args: readonly any[] | null = null

  if (callTarget.toLowerCase() === ARGO_ADDRESS) {
    const decoded = decodeFunctionData({
      abi: BridgeAbi,
      data: callData as `0x${string}`,
    })
    if (decoded) {
      functionName = decoded.functionName
      args = decoded.args
    }
  } else if (callTarget.toLowerCase() === TIMELOCK_ADDRESS) {
    const decoded = decodeFunctionData({
      abi: TimelockAbi,
      data: callData as `0x${string}`,
    })
    if (decoded) {
      functionName = decoded.functionName
      args = decoded.args
    }
  }

  return [
    functionName,
    args
      ? JSON.stringify(args, (_, value) => {
          if (typeof value === "bigint") {
            return value.toString()
          }
          return value
        })
      : null,
  ]
}
