import { events } from "./generated"
import { ChainName, NETWORKS } from "@joystream/argo-core"
import {
  BlockHeader,
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Call as _Call,
  Event as _Event,
  Extrinsic as _Extrinsic,
} from "@subsquid/substrate-processor"

const TARGET_CHAIN: ChainName = "joystreamDev"
export const NETWORK = NETWORKS[TARGET_CHAIN]
export const CHAIN_ID = NETWORK.chainId
const RPC_ENDPOINT = NETWORK.rpcUrl

console.log(`Connecting to RPC endpoint: ${RPC_ENDPOINT}`)

export const processor = new SubstrateBatchProcessor()
  // .setGateway(lookupArchive("joystream", { release: "ArrowSquid" }))
  .setRpcEndpoint({
    url: RPC_ENDPOINT,
    rateLimit: 500,
  })
  .setBlockRange({
    from: NETWORK.startBlock,
  })
  .setFields({
    event: {
      args: true,
    },
    extrinsic: {
      hash: true,
    },
    block: {
      timestamp: true,
    },
  })
  .addEvent({
    name: [events.argoBridge.bridgeConfigUpdated.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.argoBridge.bridgePaused.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.argoBridge.bridgeThawnFinished.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.argoBridge.bridgeThawnStarted.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.argoBridge.inboundTransferFinalized.name],
    extrinsic: true,
  })
  .addEvent({
    name: [events.argoBridge.outboundTransferRequested.name],
    extrinsic: true,
  })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
