import {
  BridgeTransferStatus,
  BridgeTransferType,
  GetTransfersQuery,
} from '@/gql/graphql'
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types'
import * as dn from 'dnum'
import { Hex } from 'viem'

export type BridgeTransfer = {
  id: string
  status: BridgeTransferStatus
  type: BridgeTransferType
  sourceAccount: Hex
  sourceChainId: number
  sourceTransferId: bigint
  destAccount: Hex
  destChainId: number
  createdTxHash: Hex
  createdAtTimestamp: Date
  createdAtBlock: number
  completedTxHash: Hex | null
  completedAtTimestamp: Date | null
  completedAtBlock: number | null
  amount: bigint
  amountDn: dn.Dnum
  feePaid: bigint
  feePaidDn: dn.Dnum
  safeCall?: SafeMultisigTransactionResponse
}

export function parseTransfer(
  raw: GetTransfersQuery['bridgeTransfers'][number],
): BridgeTransfer {
  const amount = BigInt(raw.amount)
  const feePaid = BigInt(raw.feePaid)
  return {
    id: raw.id,
    status: raw.status,
    type: raw.type,
    sourceAccount: raw.sourceAccount as Hex,
    sourceChainId: raw.sourceChainId,
    sourceTransferId: BigInt(raw.sourceTransferId),
    destAccount: raw.destAccount as Hex,
    destChainId: raw.destChainId,
    createdTxHash: raw.createdTxHash as Hex,
    createdAtTimestamp: new Date(raw.createdAtTimestamp),
    createdAtBlock: raw.createdAtBlock,
    completedTxHash: raw.completedTxHash ? (raw.completedTxHash as Hex) : null,
    completedAtTimestamp: raw.completedAtTimestamp
      ? new Date(raw.completedAtTimestamp)
      : null,
    completedAtBlock: raw.completedAtBlock ? raw.completedAtBlock : null,
    amount,
    amountDn: [amount, 10],
    feePaid,
    feePaidDn: [amount, 10],
  }
}
