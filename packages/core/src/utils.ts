import { BridgeAbi, EvmNetworkConfig, TimelockAbi } from "./config"
import { decodeFunctionData } from "viem"

export function getEntityId(
  chainId: number,
  entityId: bigint | string,
): string {
  return `${chainId}-${entityId}`
}

export function decodeCall(
  evmNetwork: EvmNetworkConfig,
  callTarget: string,
  callData: string,
): [string | null, readonly any[] | null] {
  let functionName: string | null = null
  let args: readonly any[] | null = null

  if (callTarget.toLowerCase() === evmNetwork.contracts.bridge.toLowerCase()) {
    const decoded = decodeFunctionData({
      abi: BridgeAbi,
      data: callData as `0x${string}`,
    })
    if (decoded) {
      functionName = decoded.functionName
      args = decoded.args
    }
  } else if (
    callTarget.toLowerCase() === evmNetwork.contracts.timelock.toLowerCase()
  ) {
    const decoded = decodeFunctionData({
      abi: TimelockAbi,
      data: callData as `0x${string}`,
    })
    if (decoded) {
      functionName = decoded.functionName
      args = decoded.args
    }
  } else if (
    callTarget.toLowerCase() === evmNetwork.contracts.erc20.toLowerCase()
  ) {
    const decoded = decodeFunctionData({
      abi: BridgeAbi,
      data: callData as `0x${string}`,
    })
    if (decoded) {
      functionName = decoded.functionName
      args = decoded.args
    }
  }

  return [functionName, args]
}
