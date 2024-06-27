import {
  EvmTimelockCall,
  EvmTimelockCallExecutedEvent,
  EvmTimelockCallSaltEvent,
  EvmTimelockCallScheduledEvent,
  EvmTimelockOperation,
  EvmTimelockOperationCancelledEvent,
  EvmTimelockOperationStatus,
  EvmTimelockRoleGrantedEvent,
  EvmTimelockRoleRevokedEvent,
} from "../model"
import { saveEvents } from "../shared"
import * as timelockControllerAbi from "./abi/timelockController"
import { ARGO_ADDRESS, CHAIN_ID, TIMELOCK_ADDRESS } from "./processor"
import {
  getBridgeRolesLookup,
  getEvmBridgeConfig,
  getTimelockRolesLookup,
} from "./shared"
import { EvmLog } from "./types"
import { BridgeAbi, TimelockAbi, getEntityId } from "@joystream/argo-core"
import { DataHandlerContext } from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { In } from "typeorm"
import { Hex, decodeFunctionData } from "viem"

type TimelockOperationEvent =
  | EvmTimelockCallScheduledEvent
  | EvmTimelockCallSaltEvent
  | EvmTimelockCallExecutedEvent
  | EvmTimelockOperationCancelledEvent

type TimelockRoleEvent =
  | EvmTimelockRoleGrantedEvent
  | EvmTimelockRoleRevokedEvent

export async function handleTimelockEvents(
  logs: EvmLog[],
  ctx: DataHandlerContext<Store>,
): Promise<void> {
  const [operationEvents, roleEvents] = parseRawLogs(logs)

  const operationIds = new Set()
  for (const event of operationEvents) {
    operationIds.add(getEntityId(CHAIN_ID, event.operationId))
  }

  const operations: Map<string, EvmTimelockOperation> = new Map(
    (
      await ctx.store.find(EvmTimelockOperation, {
        where: { id: In([...operationIds]) },
        relations: {
          calls: true,
        },
      })
    ).map((call) => [call.id, call]),
  )

  const getOperation = (operationId: string) => {
    const id = getEntityId(CHAIN_ID, operationId)
    let operation = operations.get(id)
    if (!operation) {
      operation = new EvmTimelockOperation({ id })
      operations.set(id, operation)
    }
    return operation
  }
  const newCalls: EvmTimelockCall[] = []

  const rolesLookup = await getTimelockRolesLookup(ctx, logs)
  const bridgeConfig = await getEvmBridgeConfig(ctx, CHAIN_ID)

  for (const event of operationEvents) {
    if (event instanceof EvmTimelockCallScheduledEvent) {
      const operation = getOperation(event.operationId)
      const decodedCall = decodeCall(event.callTarget, event.callData)

      operation.operationId = event.operationId
      operation.chainId = CHAIN_ID
      operation.createdAtBlock = event.block
      operation.createdAtTimestamp = event.timestamp
      operation.createdTxHash = event.txHash
      operation.status = EvmTimelockOperationStatus.PENDING

      if (!operation.calls) {
        operation.calls = []
      }

      const call = new EvmTimelockCall()
      call.id = `${CHAIN_ID}-${event.operationId}-${event.callIndex}`
      call.operation = operation
      call.chainId = CHAIN_ID
      call.callIndex = event.callIndex
      call.callTarget = event.callTarget
      call.callValue = event.callValue
      call.callData = event.callData
      call.callSignature = decodedCall[0]
      call.callArgs = decodedCall[1]
      operation.calls.push(call)
      newCalls.push(call)

      operation.predecessor = event.predecessor
      operation.delayDoneTimestamp = new Date(
        event.timestamp.getTime() + Number(event.delay) * 1000,
      )
    } else if (event instanceof EvmTimelockCallSaltEvent) {
      const operation = getOperation(event.operationId)
      operation.salt = event.salt
    } else if (event instanceof EvmTimelockCallExecutedEvent) {
      const operation = getOperation(event.operationId)
      operation.executedAtBlock = event.block
      operation.executedAtTimestamp = event.timestamp
      operation.executedTxHash = event.txHash
      operation.status = EvmTimelockOperationStatus.EXECUTED
    } else if (event instanceof EvmTimelockOperationCancelledEvent) {
      const operation = getOperation(event.operationId)
      operation.cancelledAtBlock = event.block
      operation.cancelledAtTimestamp = event.timestamp
      operation.cancelledTxHash = event.txHash
      operation.status = EvmTimelockOperationStatus.CANCELLED
    }
  }

  for (const event of roleEvents) {
    if (event instanceof EvmTimelockRoleGrantedEvent) {
      if (!rolesLookup) {
        throw new Error("Roles lookup not initialized")
      }
      if (event.role === rolesLookup.timelockProposer) {
        bridgeConfig.timelockAdminAccounts.push(event.account)
      }
    } else if (event instanceof EvmTimelockRoleRevokedEvent) {
      if (!rolesLookup) {
        throw new Error("Roles lookup not initialized")
      }
      if (event.role === rolesLookup.timelockProposer) {
        bridgeConfig.timelockAdminAccounts =
          bridgeConfig.timelockAdminAccounts.filter(
            (account) => account !== event.account,
          )
      }
    }
  }

  await Promise.all([
    ctx.store.save([...operations.values()]),
    ctx.store.save(newCalls),
    ctx.store.save(bridgeConfig),
    saveEvents(ctx, [...operationEvents, ...roleEvents]),
  ])
}

function parseRawLogs(
  logs: EvmLog[],
): [TimelockOperationEvent[], TimelockRoleEvent[]] {
  const operationEvents: TimelockOperationEvent[] = []
  const roleEvents: TimelockRoleEvent[] = []

  for (const log of logs) {
    const baseEvent = {
      id: `${CHAIN_ID}-${log.block.height}-${log.logIndex}`,
      chainId: CHAIN_ID,
      txHash: log.transactionHash,
      block: log.block.height,
      timestamp: new Date(log.block.timestamp),
    }

    switch (log.topics[0]) {
      case timelockControllerAbi.events.CallScheduled.topic: {
        const { id, index, target, value, data, predecessor, delay } =
          timelockControllerAbi.events.CallScheduled.decode(log)
        operationEvents.push(
          new EvmTimelockCallScheduledEvent({
            ...baseEvent,
            operationId: id as Hex,
            callIndex: Number(index),
            callTarget: target as Hex,
            callValue: value,
            callData: data as Hex,
            predecessor: predecessor ? (predecessor as Hex) : null,
            delay,
          }),
        )
        break
      }

      case timelockControllerAbi.events.CallSalt.topic: {
        const { id, salt } = timelockControllerAbi.events.CallSalt.decode(log)
        operationEvents.push(
          new EvmTimelockCallSaltEvent({
            ...baseEvent,
            operationId: id as Hex,
            salt: salt as Hex,
          }),
        )
        break
      }

      case timelockControllerAbi.events.CallExecuted.topic: {
        const { id, index } =
          timelockControllerAbi.events.CallExecuted.decode(log)
        operationEvents.push(
          new EvmTimelockCallExecutedEvent({
            ...baseEvent,
            operationId: id as Hex,
            callIndex: Number(index),
          }),
        )
        break
      }

      case timelockControllerAbi.events.Cancelled.topic: {
        const { id } = timelockControllerAbi.events.Cancelled.decode(log)
        operationEvents.push(
          new EvmTimelockOperationCancelledEvent({
            ...baseEvent,
            operationId: id as Hex,
          }),
        )
        break
      }

      case timelockControllerAbi.events.RoleGranted.topic: {
        const { role, account } =
          timelockControllerAbi.events.RoleGranted.decode(log)
        roleEvents.push(
          new EvmTimelockRoleGrantedEvent({
            ...baseEvent,
            role: role as Hex,
            account: account as Hex,
          }),
        )
        break
      }

      case timelockControllerAbi.events.RoleRevoked.topic: {
        const { role, account } =
          timelockControllerAbi.events.RoleRevoked.decode(log)
        roleEvents.push(
          new EvmTimelockRoleRevokedEvent({
            ...baseEvent,
            role: role as Hex,
            account: account as Hex,
          }),
        )
        break
      }
    }
  }

  return [operationEvents, roleEvents]
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
