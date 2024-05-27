import {
  BridgeTransfer,
  BridgeTransferStatus,
  EvmBridgeConfig,
  EvmBridgeFeeChangedEvent,
  EvmBridgeFeesWithdrawnEvent,
  EvmBridgeMintingLimits,
  EvmBridgeMintingLimitsUpdatedEvent,
  EvmBridgeRoleGrantedEvent,
  EvmBridgeRoleRevokedEvent,
  EvmBridgeStatus,
  EvmBridgeStatusChangedEvent,
  EvmBridgeTransferToEthCompletedEvent,
  EvmBridgeTransferToJoystreamRequestedEvent,
} from "../model"
import { groupByClass } from "../shared"
import * as argoBridgeAbi from "./abi/argoBridgeV1"
import { ARGO_ADDRESS, CHAIN_ID, Context } from "./processor"
import { EvmLog } from "./types"
import { NETWORKS, getEntityId } from "@joystream/argo-core"
import * as ss58 from "@subsquid/ss58"
import assert from "assert"
import { In } from "typeorm"

type EvmBridgeEvent =
  | EvmBridgeTransferToJoystreamRequestedEvent
  | EvmBridgeTransferToEthCompletedEvent
  | EvmBridgeFeesWithdrawnEvent
  | EvmBridgeFeeChangedEvent
  | EvmBridgeStatusChangedEvent
  | EvmBridgeMintingLimitsUpdatedEvent
  | EvmBridgeRoleGrantedEvent
  | EvmBridgeRoleGrantedEvent

const addressCodec = ss58.codec("joystream")

const joyTransferId = (id: bigint) => getEntityId("joystream", id)

let BRIDGE_ADMIN_ROLE: string
let BRIDGE_OPERATOR_ROLE: string
let BRIDGE_PAUSER_ROLE: string
let rolesSet = false

export async function handleEvmBridgeEvents(
  logs: EvmLog[],
  ctx: Context,
): Promise<void> {
  const parsedEvents = parseRawLogs(logs)
  if (!rolesSet && logs.length > 0) {
    const ArgoContract = new argoBridgeAbi.Contract(
      ctx,
      logs[0].block,
      ARGO_ADDRESS,
    )
    const results = await Promise.all([
      ArgoContract.DEFAULT_ADMIN_ROLE(),
      ArgoContract.OPERATOR_ROLE(),
      ArgoContract.PAUSER_ROLE(),
    ])
    BRIDGE_ADMIN_ROLE = results[0]
    BRIDGE_OPERATOR_ROLE = results[1]
    BRIDGE_PAUSER_ROLE = results[2]

    rolesSet = true
  }

  // load existing transfers from the database
  const requestedTransferEvents: EvmBridgeTransferToJoystreamRequestedEvent[] =
    []
  const completedTransferEvents: EvmBridgeTransferToEthCompletedEvent[] = []
  for (const event of parsedEvents) {
    if (event instanceof EvmBridgeTransferToJoystreamRequestedEvent) {
      requestedTransferEvents.push(event)
    } else if (event instanceof EvmBridgeTransferToEthCompletedEvent) {
      completedTransferEvents.push(event)
    }
  }
  const transferIds = new Set([
    ...requestedTransferEvents.map((event) =>
      getEntityId(CHAIN_ID, event.ethTransferId),
    ),
    ...completedTransferEvents.map((event) =>
      joyTransferId(event.joyTransferId),
    ),
  ])
  const existingTransfers: Map<string, BridgeTransfer> = new Map(
    (await ctx.store.findBy(BridgeTransfer, { id: In([...transferIds]) })).map(
      (transfer) => [transfer.id, transfer],
    ),
  )
  const newTransfers: BridgeTransfer[] = []

  const bridgeConfig =
    (await ctx.store.findOneBy(EvmBridgeConfig, {
      id: CHAIN_ID.toString(),
    })) || getDefaultBridgeConfig(CHAIN_ID)

  for (const event of parsedEvents) {
    if (event instanceof EvmBridgeFeeChangedEvent) {
      bridgeConfig.bridgingFee = event.fee
    } else if (event instanceof EvmBridgeStatusChangedEvent) {
      bridgeConfig.status = event.status
    } else if (event instanceof EvmBridgeMintingLimitsUpdatedEvent) {
      const limits = bridgeConfig.mintingLimits
      limits.periodLength = event.periodLength
      limits.periodLimit = event.periodLimit
      if (limits.currentPeriodEndBlock === 0) {
        // this happens in ArgoBridgeV1 constructor
        limits.currentPeriodEndBlock = event.block + event.periodLength
      }
    } else if (event instanceof EvmBridgeTransferToJoystreamRequestedEvent) {
      const {
        amount,
        ethRequester,
        ethTransferId,
        joyDestAccount,
        block,
        timestamp,
        txHash,
      } = event
      const { bridgingFee } = bridgeConfig

      const transferId = getEntityId(CHAIN_ID, ethTransferId)
      const transfer = existingTransfers.get(transferId)

      if (transfer) {
        // this could happen if the JOY processor processed the finalization event before the EVM processor processed the request event
        // in that case, we assert the MAYBE_COMPLETED status and update the transfer
        assert(
          transfer.status === BridgeTransferStatus.MAYBE_COMPLETED,
          `Requested EVM (${CHAIN_ID}) outbound transfer ${transferId} already exists`,
        )

        transfer.status = BridgeTransferStatus.COMPLETED
        transfer.sourceAccount = ethRequester
        transfer.feePaid = bridgingFee
        transfer.createdAtBlock = block
        transfer.createdAtTimestamp = timestamp
        transfer.createdTxHash = txHash
      } else {
        const transfer = new BridgeTransfer({
          id: transferId,
          amount: amount,
          status: BridgeTransferStatus.REQUESTED,
          feePaid: bridgingFee,
          sourceChainId: CHAIN_ID,
          sourceTransferId: ethTransferId,
          sourceAccount: ethRequester,
          destChainId: NETWORKS.joystream.chainId,
          destAccount: joyDestAccount,
          createdAtBlock: block,
          createdAtTimestamp: timestamp,
          createdTxHash: txHash,
        })
        newTransfers.push(transfer)
      }

      bridgeConfig.totalBurned += event.amount
    } else if (event instanceof EvmBridgeTransferToEthCompletedEvent) {
      // update minting period if needed before processing the transfer
      updateMintingPeriod(bridgeConfig, event.block)

      const transfer = existingTransfers.get(joyTransferId(event.joyTransferId))
      if (transfer) {
        transfer.status = BridgeTransferStatus.COMPLETED
        transfer.completedAtBlock = event.block
        transfer.completedAtTimestamp = event.timestamp
        transfer.completedTxHash = event.txHash
      } else {
        // this could happen if the Joystream chain processor hasn't processed this transfer yet
        // in that case, we set MAYBE_COMPLETED status and Joystream processor should mark it as COMPLETED once it processes it
        ctx.log.warn(
          `Completed unknown transfer from Joystream ${event.joyTransferId}`,
        )
        const transfer = new BridgeTransfer({
          id: joyTransferId(event.joyTransferId),
          amount: event.amount,
          status: BridgeTransferStatus.MAYBE_COMPLETED,
          sourceChainId: NETWORKS.joystream.chainId,
          sourceTransferId: event.joyTransferId,
          destChainId: CHAIN_ID,
          destAccount: event.ethDestAddress,
          completedAtBlock: event.block,
          completedAtTimestamp: event.timestamp,
          completedTxHash: event.txHash,
          // below fields should be updated by Joystream processor
          sourceAccount: "",
          feePaid: 0n,
          createdAtBlock: event.block,
          createdAtTimestamp: event.timestamp,
          createdTxHash: event.txHash,
        })
        newTransfers.push(transfer)
      }

      bridgeConfig.totalMinted += event.amount
      bridgeConfig.mintingLimits.currentPeriodMinted += event.amount
    } else if (event instanceof EvmBridgeRoleGrantedEvent) {
      const { account, role } = event
      if (role === BRIDGE_ADMIN_ROLE) {
        bridgeConfig.adminAccounts.push(account)
      } else if (role === BRIDGE_OPERATOR_ROLE) {
        bridgeConfig.operatorAccounts.push(account)
      } else if (role === BRIDGE_PAUSER_ROLE) {
        bridgeConfig.pauserAccounts.push(account)
      }
    } else if (event instanceof EvmBridgeRoleRevokedEvent) {
      const { account, role } = event
      if (role === BRIDGE_ADMIN_ROLE) {
        bridgeConfig.adminAccounts = bridgeConfig.adminAccounts.filter(
          (a) => a !== account,
        )
      } else if (role === BRIDGE_OPERATOR_ROLE) {
        bridgeConfig.operatorAccounts = bridgeConfig.operatorAccounts.filter(
          (a) => a !== account,
        )
      } else if (role === BRIDGE_PAUSER_ROLE) {
        bridgeConfig.pauserAccounts = bridgeConfig.pauserAccounts.filter(
          (a) => a !== account,
        )
      }
    }
  }

  const groupedEvents = groupByClass(parsedEvents)
  const eventsSavePromises = Object.values(groupedEvents).map((events) =>
    ctx.store.insert(events),
  )

  await Promise.all([
    ctx.store.save([...existingTransfers.values()]),
    ctx.store.save(bridgeConfig),
    ctx.store.insert(newTransfers),
    ...eventsSavePromises,
  ])
}

function updateMintingPeriod(
  config: EvmBridgeConfig,
  currentBlock: number,
): void {
  const limits = config.mintingLimits
  if (currentBlock >= limits.currentPeriodEndBlock) {
    limits.currentPeriodEndBlock = currentBlock + limits.periodLength
    limits.currentPeriodMinted = 0n
  }
}

function parseRawLogs(logs: EvmLog[]): EvmBridgeEvent[] {
  const parsedLogs: EvmBridgeEvent[] = []

  for (const log of logs) {
    const baseEvent = {
      id: `${CHAIN_ID}-${log.block.height}-${log.logIndex}`,
      chainId: CHAIN_ID,
      txHash: log.transactionHash,
      block: log.block.height,
      timestamp: new Date(log.block.timestamp),
    }
    switch (log.topics[0]) {
      case argoBridgeAbi.events.ArgoBridgeFeeChanged.topic: {
        const { newFee } = argoBridgeAbi.events.ArgoBridgeFeeChanged.decode(log)
        parsedLogs.push(
          new EvmBridgeFeeChangedEvent({
            ...baseEvent,
            fee: newFee,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoBridgeStatusChanged.topic: {
        const { newStatus } =
          argoBridgeAbi.events.ArgoBridgeStatusChanged.decode(log)
        parsedLogs.push(
          new EvmBridgeStatusChangedEvent({
            ...baseEvent,
            status:
              newStatus === 1 ? EvmBridgeStatus.PAUSED : EvmBridgeStatus.ACTIVE,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.topic: {
        const { newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod } =
          argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.decode(log)
        parsedLogs.push(
          new EvmBridgeMintingLimitsUpdatedEvent({
            ...baseEvent,
            periodLength: Number(newMintingLimitPeriodLengthBlocks),
            periodLimit: newMintingLimitPerPeriod,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.topic: {
        const { destination, amount } =
          argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.decode(log)
        parsedLogs.push(
          new EvmBridgeFeesWithdrawnEvent({
            ...baseEvent,
            destination,
            amount,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoTransferToJoystreamRequested.topic: {
        const { amount, ethRequester, ethTransferId, joyDestAccount } =
          argoBridgeAbi.events.ArgoTransferToJoystreamRequested.decode(log)
        parsedLogs.push(
          new EvmBridgeTransferToJoystreamRequestedEvent({
            ...baseEvent,
            amount,
            ethRequester,
            ethTransferId,
            joyDestAccount: addressCodec.encode(joyDestAccount),
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoTransferToEthCompleted.topic: {
        const { amount, ethDestAddress, joyTransferId } =
          argoBridgeAbi.events.ArgoTransferToEthCompleted.decode(log)
        parsedLogs.push(
          new EvmBridgeTransferToEthCompletedEvent({
            ...baseEvent,
            amount,
            ethDestAddress,
            joyTransferId,
          }),
        )
        break
      }

      case argoBridgeAbi.events.RoleGranted.topic: {
        const { role, account } = argoBridgeAbi.events.RoleGranted.decode(log)
        parsedLogs.push(
          new EvmBridgeRoleGrantedEvent({
            ...baseEvent,
            role,
            account,
          }),
        )
        break
      }

      case argoBridgeAbi.events.RoleRevoked.topic: {
        const { role, account } = argoBridgeAbi.events.RoleRevoked.decode(log)
        parsedLogs.push(
          new EvmBridgeRoleRevokedEvent({
            ...baseEvent,
            role,
            account,
          }),
        )
        break
      }
    }
  }

  return parsedLogs
}

const getDefaultBridgeConfig = (chainId: number) =>
  new EvmBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
    adminAccounts: [],
    operatorAccounts: [],
    pauserAccounts: [],
    status: EvmBridgeStatus.PAUSED,
    totalMinted: 0n,
    totalBurned: 0n,
    mintingLimits: new EvmBridgeMintingLimits({
      currentPeriodEndBlock: 0,
      currentPeriodMinted: 0n,
      periodLimit: 0n,
      periodLength: 0,
    }),
  })
