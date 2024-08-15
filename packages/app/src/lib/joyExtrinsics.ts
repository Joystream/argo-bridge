import { ApiPromise } from '@polkadot/api'
import { Hex, pad } from 'viem'

export async function buildRequestTransferExtrinsic(
  destChainId: number,
  destAccount: string,
  amount: bigint,
) {
  return async (api: ApiPromise) => {
    const encodedDestAccount = api.createType('Bytes', pad(destAccount as Hex))
    const remoteAccount = api.createType('PalletArgoBridgeRemoteAccount', {
      account: encodedDestAccount,
      chain_id: destChainId,
    })
    const expectedFee = await api.query.argoBridge.bridgingFee()
    return api.tx.argoBridge.requestOutboundTransfer(
      remoteAccount,
      amount,
      expectedFee,
    )
  }
}

export function buildFinalizeTransferExtrinsic({
  sourceChainId,
  sourceTransferId,
  destAccount,
  amount,
}: {
  sourceChainId: number
  sourceTransferId: bigint
  destAccount: string
  amount: bigint
}) {
  return (api: ApiPromise) => {
    const remoteTransfer = api.createType('PalletArgoBridgeRemoteTransfer', {
      id: sourceTransferId,
      chain_id: sourceChainId,
    })
    return api.tx.argoBridge.finalizeInboundTransfer(
      remoteTransfer,
      destAccount,
      amount,
    )
  }
}
