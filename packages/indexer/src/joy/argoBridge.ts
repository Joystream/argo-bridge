import {
  BridgeTransfer,
  JoyBridgeConfigUpdatedEvent,
  JoyBridgeInboundTransferFinalizedEvent,
  JoyBridgeOutboundTransferRequestedEvent,
  JoyBridgePausedEvent,
  JoyBridgeThawnFinishedEvent,
  JoyBridgeThawnStartedEvent,
} from "../model"
import { joyAccountCodec, tryDecodeEthereumAddress } from "../shared"
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
  const transferIds = new Set(
    parsedEvents
      .filter(
        (event): event is JoyBridgeInboundTransferFinalizedEvent =>
          event instanceof JoyBridgeInboundTransferFinalizedEvent,
      )
      .map((event) => getEntityId(event.remoteChainId, event.remoteTransferId)),
  )
  const transfers: Map<string, BridgeTransfer> = new Map(
    (await ctx.store.findBy(BridgeTransfer, { id: In([...transferIds]) })).map(
      (transfer) => [transfer.id, transfer],
    ),
  )

  await ctx.store.upsert(parsedEvents)
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
