import * as argoBridgeAbi from "./abi/argoBridgeV1"
import * as timelockControllerAbi from "./abi/timelockController"
import { lookupArchive } from "@subsquid/archive-registry"
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor"
import { Store } from "@subsquid/typeorm-store"
import { assertNotNull } from "@subsquid/util-internal"

export const CHAIN_ID = 11155111
export const SEPOLIA_ARGO_ADDRESS =
  "0xdb696e892681A86f421c136F317496DcB5Cb3Ace".toLowerCase()
export const SEPOLIA_TIMELOCK_ADDRESS =
  "0xe070f47bf2849593f9745e448b2723C57B7E5292".toLowerCase()

export const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive("eth-sepolia"))
  .setRpcEndpoint({
    url: assertNotNull(process.env.SEPOLIA_RPC_ENDPOINT),
    rateLimit: 25,
  })
  .setFinalityConfirmation(75)
  .setFields({
    log: {
      transactionHash: true,
    },
    transaction: {
      from: true,
      hash: true,
    },
  })
  .setBlockRange({
    from: 5_861_090,
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeFeeChanged.topic],
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.topic],
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeStatusChanged.topic],
    transaction: true,
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.topic],
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoTransferToEthCompleted.topic],
  })
  .addLog({
    address: [SEPOLIA_ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoTransferToJoystreamRequested.topic],
  })
  .addLog({
    address: [SEPOLIA_TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallScheduled.topic],
  })
  .addLog({
    address: [SEPOLIA_TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallSalt.topic],
  })
  .addLog({
    address: [SEPOLIA_TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallExecuted.topic],
  })
  .addLog({
    address: [SEPOLIA_TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.Cancelled.topic],
  })
  .addLog({
    address: [SEPOLIA_TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.MinDelayChange.topic],
  })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
