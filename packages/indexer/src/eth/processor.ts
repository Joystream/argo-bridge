import * as argoBridgeAbi from "./abi/argoBridgeV1"
import * as timelockControllerAbi from "./abi/timelockController"
import { EVM_NETWORKS, EvmChainName } from "@joystream/argo-core"
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

const EVM_NETWORK = process.env.EVM_NETWORK as EvmChainName
if (!EVM_NETWORK) {
  throw new Error("EVM_NETWORK is not set")
}
if (!EVM_NETWORKS[EVM_NETWORK]) {
  throw new Error(`Unknown EVM_NETWORK: ${EVM_NETWORK}`)
}

export const NETWORK = EVM_NETWORKS[EVM_NETWORK]

export const CHAIN_ID = NETWORK.chainId
export const ARGO_ADDRESS = NETWORK.contracts.bridge.toLowerCase()
export const TIMELOCK_ADDRESS = NETWORK.contracts.timelock.toLowerCase()

export const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(NETWORK.rpc.url),
    rateLimit: assertNotNull(NETWORK.rpc.rateLimit),
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
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeFeeChanged.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeStatusChanged.topic],
    transaction: true,
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoTransferToEthCompleted.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoTransferToJoystreamRequested.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.ArgoTransferToJoystreamReverted.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.RoleGranted.topic],
  })
  .addLog({
    address: [ARGO_ADDRESS],
    topic0: [argoBridgeAbi.events.RoleRevoked.topic],
  })
  .addLog({
    address: [TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallScheduled.topic],
  })
  .addLog({
    address: [TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallSalt.topic],
  })
  .addLog({
    address: [TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.CallExecuted.topic],
  })
  .addLog({
    address: [TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.Cancelled.topic],
  })
  .addLog({
    address: [TIMELOCK_ADDRESS],
    topic0: [timelockControllerAbi.events.MinDelayChange.topic],
  })

if (NETWORK.archiveName) {
  processor.setGateway(lookupArchive(NETWORK.archiveName))
}

if (NETWORK.startBlock) {
  processor.setBlockRange({
    from: NETWORK.startBlock,
  })
}

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
