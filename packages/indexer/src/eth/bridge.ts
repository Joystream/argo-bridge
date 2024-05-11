import {
  EthereumCompletedTransfer,
  EthereumRequestedTransfer,
  EvmBridgeConfig,
  EvmBridgeFeesWithdrawn,
  EvmBridgeStatus,
  EvmMintingLimits,
} from "../model"
import * as argoBridgeAbi from "./abi/argoBridgeV1"
import { CHAIN_ID } from "./processor"
import { Log } from "@subsquid/evm-processor"
import * as ss58 from "@subsquid/ss58"
import { Store } from "@subsquid/typeorm-store"

const addressCodec = ss58.codec("joystream")

const getDefaultBridgeConfig = (chainId: number) =>
  new EvmBridgeConfig({
    id: chainId.toString(),
    bridgingFee: 0n,
    status: EvmBridgeStatus.PAUSED,
    mintingLimits: new EvmMintingLimits({
      currentPeriodMinted: 0n,
      periodLimit: 0n,
      periodLength: 0,
    }),
  })

export async function handleEvmBridgeEvents(
  logs: Log[],
  store: Store,
): Promise<void> {
  const requestedTransfers: EthereumRequestedTransfer[] = []
  const completedTransfers: EthereumCompletedTransfer[] = []
  const feeWithdrawals: EvmBridgeFeesWithdrawn[] = []

  const currentConfig =
    (await store.findOneBy(EvmBridgeConfig, {
      id: CHAIN_ID.toString(),
    })) || getDefaultBridgeConfig(CHAIN_ID)

  for (const log of logs) {
    const commonFields = {
      block: log.block.height,
      timestamp: new Date(log.block.timestamp),
      txHash: log.transaction?.hash,
    }
    switch (log.topics[0]) {
      case argoBridgeAbi.events.ArgoBridgeFeeChanged.topic: {
        const { newFee } = argoBridgeAbi.events.ArgoBridgeFeeChanged.decode(log)
        currentConfig.bridgingFee = newFee
        break
      }

      case argoBridgeAbi.events.ArgoBridgeStatusChanged.topic: {
        const { newStatus } =
          argoBridgeAbi.events.ArgoBridgeStatusChanged.decode(log)
        currentConfig.status =
          newStatus === 1 ? EvmBridgeStatus.PAUSED : EvmBridgeStatus.ACTIVE
        break
      }

      case argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.topic: {
        const { newMintingLimitPeriodLengthBlocks, newMintingLimitPerPeriod } =
          argoBridgeAbi.events.ArgoBridgeMintingLimitsUpdated.decode(log)
        currentConfig.mintingLimits.periodLength = Number(
          newMintingLimitPeriodLengthBlocks,
        )
        currentConfig.mintingLimits.periodLimit = newMintingLimitPerPeriod
        break
      }

      case argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.topic: {
        const { destination, amount } =
          argoBridgeAbi.events.ArgoBridgeFeesWithdrawn.decode(log)
        feeWithdrawals.push(
          new EvmBridgeFeesWithdrawn({
            destination,
            amount,
            ...commonFields,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoTransferToJoystreamRequested.topic: {
        const { amount, ethRequester, ethTransferId, joyDestAccount } =
          argoBridgeAbi.events.ArgoTransferToJoystreamRequested.decode(log)

        requestedTransfers.push(
          new EthereumRequestedTransfer({
            id: ethTransferId.toString(),
            amount,
            requester: ethRequester,
            joyDestAccount: addressCodec.encode(joyDestAccount),
            ...commonFields,
          }),
        )
        break
      }

      case argoBridgeAbi.events.ArgoTransferToEthCompleted.topic: {
        const { amount, ethDestAddress, joyTransferId } =
          argoBridgeAbi.events.ArgoTransferToEthCompleted.decode(log)

        completedTransfers.push(
          new EthereumCompletedTransfer({
            id: joyTransferId.toString(),
            amount,
            ethDestAddress,
            ...commonFields,
          }),
        )
        break
      }
    }

    await Promise.all([
      store.save(currentConfig),
      store.upsert(requestedTransfers),
      store.upsert(completedTransfers),
      store.upsert(feeWithdrawals),
    ])
  }
}
