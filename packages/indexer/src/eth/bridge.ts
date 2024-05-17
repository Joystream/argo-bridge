import {
  BridgeTransfer,
  BridgeTransferStatus,
  EvmBridgeConfig,
  EvmBridgeFeeChangedEvent,
  EvmBridgeFeesWithdrawnEvent,
  EvmBridgeMintingLimits,
  EvmBridgeMintingLimitsUpdatedEvent,
  EvmBridgeStatus,
  EvmBridgeStatusChangedEvent,
  EvmBridgeTransferToEthCompletedEvent,
  EvmBridgeTransferToJoystreamRequestedEvent,
} from "../model"
import * as argoBridgeAbi from "./abi/argoBridgeV1"
import { CHAIN_ID } from "./processor"
import { EvmLog } from "./types"
import { NETWORKS, getEntityId } from "@joystream/argo-core"
import { DataHandlerContext } from "@subsquid/evm-processor"
import * as ss58 from "@subsquid/ss58"
import { Store } from "@subsquid/typeorm-store"
import { In } from "typeorm"

type EvmBridgeEvent =
  | EvmBridgeTransferToJoystreamRequestedEvent
  | EvmBridgeTransferToEthCompletedEvent
  | EvmBridgeFeesWithdrawnEvent
  | EvmBridgeFeeChangedEvent
  | EvmBridgeStatusChangedEvent
  | EvmBridgeMintingLimitsUpdatedEvent

const addressCodec = ss58.codec("joystream")

const joyTransferId = (id: bigint) => getEntityId("joystream", id)

export async function handleEvmBridgeEvents(
  logs: EvmLog[],
  ctx: DataHandlerContext<Store>,
): Promise<void> {
  const parsedEvents = parseRawLogs(logs)

  // load existing transfers from the database
  const transferIds = new Set(
    parsedEvents
      .filter(
        (event): event is EvmBridgeTransferToEthCompletedEvent =>
          event instanceof EvmBridgeTransferToEthCompletedEvent,
      )
      .map((event) => joyTransferId(event.joyTransferId)),
  )
  const transfers: Map<string, BridgeTransfer> = new Map(
    (await ctx.store.findBy(BridgeTransfer, { id: In([...transferIds]) })).map(
      (transfer) => [transfer.id, transfer],
    ),
  )

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
      const transfer = new BridgeTransfer({
        id: getEntityId(CHAIN_ID, event.ethTransferId),
        amount: event.amount,
        status: BridgeTransferStatus.REQUESTED,
        feePaid: bridgeConfig.bridgingFee,
        sourceChainId: CHAIN_ID,
        sourceTransferId: event.ethTransferId,
        sourceAccount: event.ethRequester,
        destChainId: NETWORKS.joystream.chainId,
        destAccount: event.joyDestAccount,
        createdAtBlock: event.block,
        createdAtTimestamp: event.timestamp,
        createdTxHash: event.txHash,
      })
      transfers.set(transfer.id, transfer)

      bridgeConfig.totalBurned += event.amount
    } else if (event instanceof EvmBridgeTransferToEthCompletedEvent) {
      // update minting period if needed before processing the transfer
      updateMintingPeriod(bridgeConfig, event.block)

      const transfer = transfers.get(joyTransferId(event.joyTransferId))
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
          id: getEntityId(CHAIN_ID, event.joyTransferId),
          amount: event.amount,
          status: BridgeTransferStatus.MAYBE_COMPLETED,
          sourceChainId: NETWORKS.joystream.chainId,
          sourceTransferId: event.joyTransferId,
          destChainId: CHAIN_ID,
          destAccount: event.ethDestAddress,
          // below fields should be updated by Joystream processor
          feePaid: 0n,
          createdAtBlock: event.block,
          createdAtTimestamp: event.timestamp,
          createdTxHash: event.txHash,
        })
        transfers.set(transfer.id, transfer)
      }

      bridgeConfig.totalMinted += event.amount
      bridgeConfig.mintingLimits.currentPeriodMinted += event.amount
    }
  }

  await Promise.all([
    ctx.store.save([...transfers.values()]),
    ctx.store.save(bridgeConfig),
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
    }
  }

  return parsedLogs
}

const getDefaultBridgeConfig = (chainId: bigint) =>
  new EvmBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
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
