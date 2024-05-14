import { EvmTimelockCall, EvmTimelockCallStatus } from "../model"
import * as timelockControllerAbi from "./abi/timelockController"
import { ARGO_ADDRESS, CHAIN_ID, TIMELOCK_ADDRESS } from "./processor"
import { EvmLog } from "./types"
import { BridgeAbi, TimelockAbi, getEntityId } from "@joystream/argo-core"
import { DataHandlerContext } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { In } from "typeorm"
import { Hex, decodeFunctionData } from "viem"

type BaseEvent = {
  transactionHash: Hex
  block: {
    height: number
    timestamp: number
  }
}

type CallScheduledEvent = {
  type: "CallScheduled"
  localId: Hex
  target: Hex
  value: bigint
  data: Hex
  predecessor: Hex | null
  delay: bigint
}

type CallSaltEvent = {
  type: "CallSalt"
  localId: Hex
  salt: Hex
}

type CallExecutedEvent = {
  type: "CallExecuted"
  localId: Hex
}

type CancelledEvent = {
  type: "Cancelled"
  localId: Hex
}

type TimelockEvent = BaseEvent &
  (CallExecutedEvent | CallSaltEvent | CallScheduledEvent | CancelledEvent)

export async function handleTimelockEvents(
  logs: EvmLog[],
  ctx: DataHandlerContext<Store>,
): Promise<void> {
  const parsedLogs = parseRawLogs(logs)

  const callIds = new Set()
  for (const call of parsedLogs) {
    callIds.add(getEntityId(CHAIN_ID, call.localId))
  }

  const calls: Map<string, EvmTimelockCall> = new Map(
    (await ctx.store.findBy(EvmTimelockCall, { id: In([...callIds]) })).map(
      (call) => [call.id, call],
    ),
  )

  const getCall = (localId: string) => {
    const id = getEntityId(CHAIN_ID, localId)
    let call = calls.get(id)
    if (!call) {
      call = new EvmTimelockCall({ id })
      calls.set(id, call)
    }
    return call
  }

  for (const log of parsedLogs) {
    switch (log.type) {
      case "CallScheduled": {
        const call = getCall(log.localId)
        const decodedCall = decodeCall(log.target, log.data)

        call.chainId = CHAIN_ID
        call.createdAtBlock = log.block.height
        call.createdAtTimestamp = new Date(log.block.timestamp)
        call.createdTxHash = log.transactionHash
        call.status = EvmTimelockCallStatus.PENDING

        call.callTarget = log.target
        call.callValue = log.value
        call.callData = log.data
        call.callSignature = decodedCall[0]
        call.callArgs = decodedCall[1]

        call.predecessor = log.predecessor
        call.delayDoneTimestamp = new Date(
          log.block.timestamp + Number(log.delay) * 1000,
        )
        break
      }

      case "CallSalt": {
        const call = getCall(log.localId)
        call.salt = log.salt
        break
      }

      case "CallExecuted": {
        const call = getCall(log.localId)
        call.executedAtBlock = log.block.height
        call.executedAtTimestamp = new Date(log.block.timestamp)
        call.executedTxHash = log.transactionHash
        call.status = EvmTimelockCallStatus.EXECUTED
        break
      }

      case "Cancelled": {
        const call = getCall(log.localId)
        call.cancelledAtBlock = log.block.height
        call.cancelledAtTimestamp = new Date(log.block.timestamp)
        call.cancelledTxHash = log.transactionHash
        call.status = EvmTimelockCallStatus.CANCELLED
        break
      }
    }
  }

  await ctx.store.save([...calls.values()])
}

function parseRawLogs(logs: EvmLog[]): TimelockEvent[] {
  const parsedLogs: TimelockEvent[] = []

  for (const log of logs) {
    const baseEvent: BaseEvent = {
      transactionHash: log.transactionHash as Hex,
      block: {
        height: log.block.height,
        timestamp: log.block.timestamp,
      },
    }

    switch (log.topics[0]) {
      case timelockControllerAbi.events.CallScheduled.topic: {
        const { id, target, value, data, predecessor, delay } =
          timelockControllerAbi.events.CallScheduled.decode(log)
        parsedLogs.push({
          type: "CallScheduled",
          localId: id as Hex,
          target: target as Hex,
          value,
          data: data as Hex,
          predecessor: predecessor ? (predecessor as Hex) : null,
          delay,
          ...baseEvent,
        })
        break
      }

      case timelockControllerAbi.events.CallSalt.topic: {
        const { id, salt } = timelockControllerAbi.events.CallSalt.decode(log)
        parsedLogs.push({
          type: "CallSalt",
          localId: id as Hex,
          salt: salt as Hex,
          ...baseEvent,
        })
        break
      }

      case timelockControllerAbi.events.CallExecuted.topic: {
        const { id } = timelockControllerAbi.events.CallExecuted.decode(log)
        parsedLogs.push({
          type: "CallExecuted",
          localId: id as Hex,
          ...baseEvent,
        })
        break
      }

      case timelockControllerAbi.events.Cancelled.topic: {
        const { id } = timelockControllerAbi.events.Cancelled.decode(log)
        parsedLogs.push({
          type: "Cancelled",
          localId: id as Hex,
          ...baseEvent,
        })
        break
      }
    }
  }

  return parsedLogs
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
