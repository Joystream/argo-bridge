import {
  BridgeTransfer,
  BridgeTransferStatus,
  JoyBridgeConfig,
  JoyBridgeConfigUpdatedEvent,
  JoyBridgeInboundTransferFinalizedEvent,
  JoyBridgeOutboundTransferRequestedEvent,
  JoyBridgePausedEvent,
  JoyBridgeStatus,
  JoyBridgeThawnFinishedEvent,
  JoyBridgeThawnStartedEvent,
} from "../model"
import {
  groupByClass,
  joyAccountCodec,
  tryDecodeEthereumAddress,
} from "../shared"
import { argoBridge } from "./generated/events"
import { CHAIN_ID, Event, ProcessorContext } from "./processor"
import { getEntityId } from "@joystream/argo-core"
import { Store } from "@subsquid/typeorm-store"
import assert from "assert"
import { In } from "typeorm"

type JoyBridgeEvent =
  | JoyBridgeConfigUpdatedEvent
  | JoyBridgePausedEvent
  | JoyBridgeThawnStartedEvent
  | JoyBridgeThawnFinishedEvent
  | JoyBridgeOutboundTransferRequestedEvent
  | JoyBridgeInboundTransferFinalizedEvent

export async function handleJoyBridgeEvents(
  events: Event[],
  ctx: ProcessorContext<Store>,
): Promise<void> {
  const parsedEvents = await parseRawEvents(events, ctx)

  // load existing transfers from the database
  const requestedTransferEvents: JoyBridgeOutboundTransferRequestedEvent[] = []
  const finalizedTransferEvents: JoyBridgeInboundTransferFinalizedEvent[] = []
  for (const event of parsedEvents) {
    if (event instanceof JoyBridgeOutboundTransferRequestedEvent) {
      requestedTransferEvents.push(event)
    } else if (event instanceof JoyBridgeInboundTransferFinalizedEvent) {
      finalizedTransferEvents.push(event)
    }
  }
  const transferIds = new Set([
    ...requestedTransferEvents.map((event) =>
      getEntityId(CHAIN_ID, event.joyTransferId),
    ),
    ...finalizedTransferEvents.map((event) =>
      getEntityId(event.remoteChainId, event.remoteTransferId),
    ),
  ])
  const transfers: Map<string, BridgeTransfer> = new Map(
    (await ctx.store.findBy(BridgeTransfer, { id: In([...transferIds]) })).map(
      (transfer) => [transfer.id, transfer],
    ),
  )

  const bridgeConfig =
    (await ctx.store.findOneBy(JoyBridgeConfig, {
      id: CHAIN_ID.toString(),
    })) || getDefaultBridgeConfig(CHAIN_ID)

  for (const event of parsedEvents) {
    if (event instanceof JoyBridgePausedEvent) {
      bridgeConfig.status = JoyBridgeStatus.PAUSED
      bridgeConfig.thawnStartedAtBlock = null
    } else if (event instanceof JoyBridgeThawnStartedEvent) {
      bridgeConfig.status = JoyBridgeStatus.THAWN
      bridgeConfig.thawnStartedAtBlock = event.block
    } else if (event instanceof JoyBridgeThawnFinishedEvent) {
      bridgeConfig.status = JoyBridgeStatus.ACTIVE
      bridgeConfig.thawnStartedAtBlock = null
    } else if (event instanceof JoyBridgeConfigUpdatedEvent) {
      // TODO: update bridge config
    } else if (event instanceof JoyBridgeOutboundTransferRequestedEvent) {
      const {
        amount,
        destAccount,
        destChainId,
        feePaid,
        joyRequester,
        joyTransferId,
      } = event
      const transferId = getEntityId(CHAIN_ID, joyTransferId)
      const transfer = transfers.get(transferId)

      if (transfer) {
        // this could happen if the EVM processor processed the finalization event before the JOY processor processed the request event
        // in that case, we assert the MAYBE_COMPLETED status and update the transfer
        assert(
          transfer.status === BridgeTransferStatus.MAYBE_COMPLETED,
          `Requested JOY outbound transfer ${transferId} already exists`,
        )

        transfer.status = BridgeTransferStatus.COMPLETED
        transfer.sourceAccount = joyRequester
        transfer.feePaid = feePaid
        transfer.createdAtBlock = event.block
        transfer.createdAtTimestamp = event.timestamp
        transfer.createdTxHash = event.txHash
      } else {
        const transfer = new BridgeTransfer({
          id: getEntityId(CHAIN_ID, joyTransferId),
          amount: event.amount,
          status: BridgeTransferStatus.REQUESTED,
          feePaid,
          sourceChainId: CHAIN_ID,
          sourceTransferId: joyTransferId,
          sourceAccount: joyRequester,
          destChainId,
          destAccount: destAccount,
          createdAtBlock: event.block,
          createdAtTimestamp: event.timestamp,
          createdTxHash: event.txHash,
        })
        transfers.set(transfer.id, transfer)
      }

      bridgeConfig.totalBurned += amount
      bridgeConfig.feesBurned += feePaid
    } else if (event instanceof JoyBridgeInboundTransferFinalizedEvent) {
      const { amount, remoteChainId, remoteTransferId, joyDestAccount } = event
      const transferId = getEntityId(remoteChainId, remoteTransferId)
      const transfer = transfers.get(transferId)
      if (transfer) {
        transfer.status = BridgeTransferStatus.COMPLETED
        transfer.completedAtBlock = event.block
        transfer.completedAtTimestamp = event.timestamp
        transfer.completedTxHash = event.txHash
      } else {
        // this could happen if the EVM processor hasn't processed this transfer yet
        // in that case, we set MAYBE_COMPLETED status and EVM processor should mark it as COMPLETED once it processes it
        ctx.log.warn(
          `Completed unknown transfer from chain ${remoteChainId} with id ${remoteTransferId}`,
        )
        const transfer = new BridgeTransfer({
          id: getEntityId(remoteChainId, remoteTransferId),
          amount,
          status: BridgeTransferStatus.MAYBE_COMPLETED,
          sourceChainId: remoteChainId,
          sourceTransferId: remoteTransferId,
          destChainId: CHAIN_ID,
          destAccount: joyDestAccount,
          completedAtBlock: event.block,
          completedAtTimestamp: event.timestamp,
          completedTxHash: event.txHash,
          // below fields should be updated by EVM processor
          sourceAccount: "",
          feePaid: 0n,
          createdAtBlock: event.block,
          createdAtTimestamp: event.timestamp,
          createdTxHash: event.txHash,
        })
        transfers.set(transfer.id, transfer)
      }

      bridgeConfig.totalMinted += amount
    }
  }

  const groupedEvents = groupByClass(parsedEvents)
  const eventsSavePromises = Object.values(groupedEvents).map((events) =>
    ctx.store.save(events),
  )
  await Promise.all([
    ctx.store.save([...transfers.values()]),
    ctx.store.save(bridgeConfig),
    ...eventsSavePromises,
  ])
}

async function parseRawEvents(
  events: Event[],
  ctx: ProcessorContext<Store>,
): Promise<JoyBridgeEvent[]> {
  const parsedEvents: JoyBridgeEvent[] = []

  for (const event of events) {
    assert(event.block.height)
    assert(event.block.timestamp)
    assert(event.extrinsic?.hash)
    const baseEvent = {
      id: `${CHAIN_ID}-${event.block.height}-${event.index}`,
      chainId: CHAIN_ID,
      txHash: event.extrinsic.hash,
      block: event.block.height,
      timestamp: new Date(event.block.timestamp),
    }
    switch (event.name) {
      case argoBridge.bridgeConfigUpdated.name:
        parsedEvents.push(
          new JoyBridgeConfigUpdatedEvent({
            ...baseEvent,
          }),
        )
        break

      case argoBridge.bridgePaused.name:
        const [pauserAccountRaw] = argoBridge.bridgePaused.v2003.decode(event)
        const pauserAccount = joyAccountCodec.encode(pauserAccountRaw)
        parsedEvents.push(
          new JoyBridgePausedEvent({
            ...baseEvent,
            account: pauserAccount,
          }),
        )
        break

      case argoBridge.bridgeThawnStarted.name:
        const unpauserAccountRaw =
          argoBridge.bridgeThawnStarted.v2003.decode(event)
        const unpauserAccount = joyAccountCodec.encode(unpauserAccountRaw)
        parsedEvents.push(
          new JoyBridgeThawnStartedEvent({
            ...baseEvent,
            account: unpauserAccount,
          }),
        )
        break

      case argoBridge.bridgeThawnFinished.name:
        parsedEvents.push(new JoyBridgeThawnFinishedEvent(baseEvent))
        break

      case argoBridge.outboundTransferRequested.name:
        const [
          joyTransferId,
          joyRequester,
          destRemoteAccount,
          burntAmount,
          feePaid,
        ] = argoBridge.outboundTransferRequested.v2003.decode(event)
        const { account: destAccountRaw, chainId: destChainIdNum } =
          destRemoteAccount

        const destAccount = tryDecodeEthereumAddress(destAccountRaw)

        parsedEvents.push(
          new JoyBridgeOutboundTransferRequestedEvent({
            ...baseEvent,
            joyTransferId,
            joyRequester,
            destAccount: destAccount ? destAccount : destAccountRaw,
            destChainId: BigInt(destChainIdNum),
            amount: burntAmount,
            feePaid,
          }),
        )
        break

      case argoBridge.inboundTransferFinalized.name:
        const [remoteTransfer, joyDestAccount, mintedAmount] =
          argoBridge.inboundTransferFinalized.v2003.decode(event)
        const { id: remoteTransferId, chainId: remoteChainId } = remoteTransfer

        parsedEvents.push(
          new JoyBridgeInboundTransferFinalizedEvent({
            ...baseEvent,
            remoteTransferId,
            remoteChainId: BigInt(remoteChainId),
            joyDestAccount,
            amount: mintedAmount,
          }),
        )
        break
      default:
        ctx.log.warn(`Unsupported event: ${event.name}`)
    }
  }

  return parsedEvents
}

const getDefaultBridgeConfig = (chainId: bigint) =>
  new JoyBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
    operatorAccount: "",
    pauserAccounts: [],
    status: JoyBridgeStatus.PAUSED,
    thawnStartedAtBlock: null,
    thawnDurationBlocks: 100,
    mintAllowance: 0n,
    totalMinted: 0n,
    totalBurned: 0n,
    feesBurned: 0n,
  })
