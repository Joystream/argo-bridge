import {
  EvmBridgeConfig,
  EvmBridgeMintingLimits,
  EvmBridgeStatus,
} from "../model"
import * as argoBridgeAbi from "./abi/argoBridgeV1"
import * as timelockControllerAbi from "./abi/timelockController"
import {
  ARGO_ADDRESS,
  CHAIN_ID,
  Context,
  Log,
  TIMELOCK_ADDRESS,
} from "./processor"

let BRIDGE_ADMIN_ROLE: string
let BRIDGE_OPERATOR_ROLE: string
let BRIDGE_PAUSER_ROLE: string
let bridgeRolesSet = false

export async function getBridgeRolesLookup(ctx: Context, logs: Log[]) {
  if (bridgeRolesSet) {
    return {
      bridgeAdmin: BRIDGE_ADMIN_ROLE,
      bridgeOperator: BRIDGE_OPERATOR_ROLE,
      bridgePauser: BRIDGE_PAUSER_ROLE,
    }
  }
  if (logs.length > 0) {
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

    bridgeRolesSet = true

    return {
      bridgeAdmin: BRIDGE_ADMIN_ROLE,
      bridgeOperator: BRIDGE_OPERATOR_ROLE,
      bridgePauser: BRIDGE_PAUSER_ROLE,
    }
  }
  return null
}

let TIMELOCK_PROPOSER_ROLE: string
let timelockRolesSet = false

export async function getTimelockRolesLookup(ctx: Context, logs: Log[]) {
  if (timelockRolesSet) {
    return {
      timelockProposer: TIMELOCK_PROPOSER_ROLE,
    }
  }

  if (logs.length > 0) {
    const TimelockContract = new timelockControllerAbi.Contract(
      ctx,
      logs[0].block,
      TIMELOCK_ADDRESS,
    )
    TIMELOCK_PROPOSER_ROLE = await TimelockContract.PROPOSER_ROLE()
    timelockRolesSet = true

    return {
      timelockProposer: TIMELOCK_PROPOSER_ROLE,
    }
  }
}

export const getEvmBridgeConfig = async (ctx: Context, chainId: number) => {
  const existingConfig = await ctx.store.findOneBy(EvmBridgeConfig, {
    id: CHAIN_ID.toString(),
  })
  if (existingConfig) {
    return existingConfig
  }
  return new EvmBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
    bridgeAdminAccounts: [],
    bridgeOperatorAccounts: [],
    pauserAccounts: [],
    timelockAdminAccounts: [],
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
}
