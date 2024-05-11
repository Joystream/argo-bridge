import { EvmTimelockCall, EvmTimelockCallStatus } from "../model"
import * as timelockControllerAbi from "./abi/timelockController"
import { DataHandlerContext, Log } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { bytesToHex, zeroHash } from "viem"

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
        const {
          id: idBytes,
          target,
          value,
          data,
          predecessor: predecessorBytes,
          delay,
        } = timelockControllerAbi.events.CallScheduled.decode(log)
        const id = bytesToHex(idBytes)
        const predecessor = bytesToHex(predecessorBytes)

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
            callData: bytesToHex(data),
            predecessor: predecessor !== zeroHash ? predecessor : null,

            delayDoneTimestamp: new Date(
              log.block.timestamp + Number(delay) * 1000,
            ),
          }),
        )
        break
      }

      case timelockControllerAbi.events.CallSalt.topic: {
        const { id: idBytes, salt } =
          timelockControllerAbi.events.CallSalt.decode(log)
        const id = bytesToHex(idBytes)
        const call = await getCall(id, log.transactionHash)
        if (call) {
          call.salt = bytesToHex(salt)
        }
        break
      }

      case timelockControllerAbi.events.CallExecuted.topic: {
        const { id: idBytes } =
          timelockControllerAbi.events.CallExecuted.decode(log)
        const id = bytesToHex(idBytes)
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
        const { id: idBytes } =
          timelockControllerAbi.events.Cancelled.decode(log)
        const id = bytesToHex(idBytes)
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
