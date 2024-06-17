import { events } from "./generated"
import { JOY_NETWORKS } from "@joystream/argo-core"
import {
  BlockHeader,
  DataHandlerContext,
  SubstrateBatchProcessor,
  SubstrateBatchProcessorFields,
  Call as _Call,
  Event as _Event,
  Extrinsic as _Extrinsic,
  assertNotNull,
} from "@subsquid/substrate-processor"

const JOY_NETWORK = process.env.JOY_NETWORK as keyof typeof JOY_NETWORKS

if (!JOY_NETWORK) {
  throw new Error("JOY_NETWORK is not set")
}

if (!JOY_NETWORKS[JOY_NETWORK]) {
  throw new Error(`Unknown JOY_NETWORK: ${JOY_NETWORK}`)
}

export const NETWORK = JOY_NETWORKS[JOY_NETWORK]
export const CHAIN_ID = NETWORK.chainId
const RPC_ENDPOINT = assertNotNull(NETWORK.rpc.url)

console.log(`Connecting to RPC endpoint: ${RPC_ENDPOINT}`)

export const processor = new SubstrateBatchProcessor()
  // .setGateway(lookupArchive("joystream", { release: "ArrowSquid" }))
  .setRpcEndpoint({
    url: RPC_ENDPOINT,
    rateLimit: assertNotNull(NETWORK.rpc.rateLimit),
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
  .addEvent({
    name: [events.argoBridge.outboundTransferReverted.name],
    extrinsic: true,
  })

if (NETWORK.startBlock) {
  processor.setBlockRange({
    from: NETWORK.startBlock,
  })
}

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
