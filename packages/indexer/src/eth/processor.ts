import * as argoBridgeAbi from "./abi/argoBridgeV1"
import * as timelockControllerAbi from "./abi/timelockController"
import { ChainName, NETWORKS } from "@joystream/argo-core"
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

const TARGET_CHAIN: ChainName = "hardhat"
const NETWORK = NETWORKS[TARGET_CHAIN]

export const CHAIN_ID = NETWORK.chainId
export const ARGO_ADDRESS = NETWORK.contracts.bridge.toLowerCase()
export const TIMELOCK_ADDRESS = NETWORK.contracts.timelock.toLowerCase()

export const processor = new EvmBatchProcessor()
  // .setGateway(lookupArchive("eth-sepolia"))
  .setRpcEndpoint({
    url: assertNotNull(NETWORK.rpcUrl),
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
    from: NETWORK.startBlock,
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

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
