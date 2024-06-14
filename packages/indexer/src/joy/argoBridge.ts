import {
  BridgeTransfer,
  BridgeTransferStatus,
  BridgeTransferType,
  JoyBridgeConfig,
  JoyBridgeConfigUpdatedEvent,
  JoyBridgeInboundTransferFinalizedEvent,
  JoyBridgeOutboundTransferRequestedEvent,
  JoyBridgeOutboundTransferRevertedEvent,
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
import { hexToU8a, u8aToString } from "@polkadot/util"
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
  | JoyBridgeOutboundTransferRevertedEvent

export async function handleJoyBridgeEvents(
  events: Event[],
  ctx: ProcessorContext<Store>,
): Promise<void> {
  const parsedEvents = await parseRawEvents(events, ctx)

  // load existing transfers from the database
  const transferIds = new Set<string>()
  for (const event of parsedEvents) {
    if (event instanceof JoyBridgeOutboundTransferRequestedEvent) {
      transferIds.add(getEntityId(CHAIN_ID, event.joyTransferId))
    } else if (event instanceof JoyBridgeInboundTransferFinalizedEvent) {
      transferIds.add(getEntityId(event.remoteChainId, event.remoteTransferId))
    } else if (event instanceof JoyBridgeOutboundTransferRevertedEvent) {
      transferIds.add(getEntityId(CHAIN_ID, event.joyTransferId))
    }
  }
  const existingTransfers: Map<string, BridgeTransfer> = new Map(
    (await ctx.store.findBy(BridgeTransfer, { id: In([...transferIds]) })).map(
      (transfer) => [transfer.id, transfer],
    ),
  )
  const newTransfers: BridgeTransfer[] = []

  const bridgeConfig =
    (await ctx.store.findOneBy(JoyBridgeConfig, {
      id: CHAIN_ID.toString(),
    })) || getDefaultBridgeConfig(CHAIN_ID)

  for (const event of parsedEvents) {
    if (event instanceof JoyBridgePausedEvent) {
      bridgeConfig.status = JoyBridgeStatus.PAUSED
      bridgeConfig.thawnEndsAtBlock = null
    } else if (event instanceof JoyBridgeThawnStartedEvent) {
      bridgeConfig.status = JoyBridgeStatus.THAWN
      bridgeConfig.thawnEndsAtBlock = event.thawnEndsAtBlock
    } else if (event instanceof JoyBridgeThawnFinishedEvent) {
      bridgeConfig.status = JoyBridgeStatus.ACTIVE
      bridgeConfig.thawnEndsAtBlock = null
    } else if (event instanceof JoyBridgeConfigUpdatedEvent) {
      const {
        newBridgingFee,
        newOperatorAccount,
        newPauserAccounts,
        newThawnDuration,
        newRemoteChains,
      } = event
      if (newBridgingFee != null) {
        bridgeConfig.bridgingFee = newBridgingFee
      }
      if (newOperatorAccount != null) {
        bridgeConfig.operatorAccount = newOperatorAccount
      }
      if (newPauserAccounts != null) {
        bridgeConfig.pauserAccounts = newPauserAccounts
      }
      if (newThawnDuration != null) {
        bridgeConfig.thawnDurationBlocks = newThawnDuration
      }
      if (newRemoteChains != null) {
        bridgeConfig.supportedRemoteChainIds = newRemoteChains
      }
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
      const transfer = existingTransfers.get(transferId)

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
          type: BridgeTransferType.JOY_TO_EVM,
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
        newTransfers.push(transfer)
      }

      bridgeConfig.totalBurned += amount
      bridgeConfig.feesBurned += feePaid
      bridgeConfig.mintAllowance += amount
    } else if (event instanceof JoyBridgeInboundTransferFinalizedEvent) {
      const { amount, remoteChainId, remoteTransferId, joyDestAccount } = event
      const transferId = getEntityId(remoteChainId, remoteTransferId)
      const transfer = existingTransfers.get(transferId)
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
          type: BridgeTransferType.EVM_TO_JOY,
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
        newTransfers.push(transfer)
      }

      bridgeConfig.totalMinted += amount
      bridgeConfig.mintAllowance -= amount
    } else if (event instanceof JoyBridgeOutboundTransferRevertedEvent) {
      const { joyTransferId, revertAccount, revertAmount, rationale } = event
      const transferId = getEntityId(CHAIN_ID, joyTransferId)
      const transfer =
        existingTransfers.get(transferId) ||
        newTransfers.find((t) => t.id === transferId)
      if (transfer) {
        transfer.status = BridgeTransferStatus.REVERTED
        transfer.revertedAtBlock = event.block
        transfer.revertedAtTimestamp = event.timestamp
        transfer.revertedTxHash = event.txHash
        transfer.revertAccount = revertAccount
        transfer.revertAmount = revertAmount
        transfer.revertReason = u8aToString(hexToU8a(rationale))
      } else {
        ctx.log.error(
          `Reverted unknown Joystream outbound transfer with id ${transferId} at block ${event.block}`,
        )
      }

      bridgeConfig.totalMinted += revertAmount
      bridgeConfig.mintAllowance -= revertAmount
    }
  }

  const groupedEvents = groupByClass(parsedEvents)
  const eventsSavePromises = Object.values(groupedEvents).map((events) =>
    ctx.store.insert(events),
  )
  await Promise.all([
    ctx.store.save([...existingTransfers.values()]),
    ctx.store.insert(newTransfers),
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

    if (event.name !== argoBridge.bridgeConfigUpdated.name) {
      // bridgeConfigUpdated event is emitted as part of proposal execution so will not have an associated extrinsic
      assert(event.extrinsic?.hash)
    }
    const baseEvent = {
      id: `${CHAIN_ID}-${event.block.height}-${event.index}`,
      chainId: CHAIN_ID,
      txHash: event.extrinsic?.hash,
      block: event.block.height,
      timestamp: new Date(event.block.timestamp),
    }
    switch (event.name) {
      case argoBridge.bridgeConfigUpdated.name:
        const config = argoBridge.bridgeConfigUpdated.v2004.decode(event)
        parsedEvents.push(
          new JoyBridgeConfigUpdatedEvent({
            ...baseEvent,
            newBridgingFee: config.bridgingFee,
            newOperatorAccount: config.operatorAccount
              ? joyAccountCodec.encode(config.operatorAccount)
              : null,
            newPauserAccounts: config.pauserAccounts
              ? config.pauserAccounts.map((acc) => joyAccountCodec.encode(acc))
              : null,
            newThawnDuration: config.thawnDuration,
            newRemoteChains: config.remoteChains,
          }),
        )
        break

      case argoBridge.bridgePaused.name:
        const pauserAccountRaw = argoBridge.bridgePaused.v2004.decode(event)
        const pauserAccount = joyAccountCodec.encode(pauserAccountRaw)
        parsedEvents.push(
          new JoyBridgePausedEvent({
            ...baseEvent,
            account: pauserAccount,
          }),
        )
        break

      case argoBridge.bridgeThawnStarted.name:
        const [unpauserAccountRaw, thawnEndsAtBlock] =
          argoBridge.bridgeThawnStarted.v2004.decode(event)
        const unpauserAccount = joyAccountCodec.encode(unpauserAccountRaw)
        parsedEvents.push(
          new JoyBridgeThawnStartedEvent({
            ...baseEvent,
            account: unpauserAccount,
            thawnEndsAtBlock,
          }),
        )
        break

      case argoBridge.bridgeThawnFinished.name:
        parsedEvents.push(new JoyBridgeThawnFinishedEvent(baseEvent))
        break

      case argoBridge.outboundTransferRequested.name:
        const [
          joyTransferId,
          joyRequesterRaw,
          destRemoteAccount,
          burntAmount,
          feePaid,
        ] = argoBridge.outboundTransferRequested.v2004.decode(event)
        const { account: destAccountRaw, chainId: destChainId } =
          destRemoteAccount

        const joyRequester = joyAccountCodec.encode(joyRequesterRaw)
        const destAccount = tryDecodeEthereumAddress(destAccountRaw)

        parsedEvents.push(
          new JoyBridgeOutboundTransferRequestedEvent({
            ...baseEvent,
            joyTransferId,
            joyRequester,
            destAccount: destAccount ? destAccount : destAccountRaw,
            destChainId,
            amount: burntAmount,
            feePaid,
          }),
        )
        break

      case argoBridge.inboundTransferFinalized.name:
        const [remoteTransfer, joyDestAccountRaw, mintedAmount] =
          argoBridge.inboundTransferFinalized.v2004.decode(event)
        const { id: remoteTransferId, chainId: remoteChainId } = remoteTransfer

        const joyDestAccount = joyAccountCodec.encode(joyDestAccountRaw)

        parsedEvents.push(
          new JoyBridgeInboundTransferFinalizedEvent({
            ...baseEvent,
            remoteTransferId,
            remoteChainId,
            joyDestAccount,
            amount: mintedAmount,
          }),
        )
        break

      case argoBridge.outboundTransferReverted.name:
        const [joyTransferIdd, revertAccountRaw, revertAmount, rationale] =
          argoBridge.outboundTransferReverted.v2004.decode(event)
        const revertAccount = joyAccountCodec.encode(revertAccountRaw)

        parsedEvents.push(
          new JoyBridgeOutboundTransferRevertedEvent({
            ...baseEvent,
            joyTransferId: joyTransferIdd,
            revertAmount,
            revertAccount,
            rationale,
          }),
        )
        break

      default:
        ctx.log.warn(`Unsupported event: ${event.name}`)
    }
  }

  return parsedEvents
}

const getDefaultBridgeConfig = (chainId: number) =>
  new JoyBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
    operatorAccount: "",
    pauserAccounts: [],
    status: JoyBridgeStatus.PAUSED,
    thawnEndsAtBlock: null,
    supportedRemoteChainIds: [],
    thawnDurationBlocks: 100,
    mintAllowance: 0n,
    totalMinted: 0n,
    totalBurned: 0n,
    feesBurned: 0n,
  })
