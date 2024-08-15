import { RawExtrinsicResult } from '@joystream/argo-core'
import { ApiPromise } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { createContext } from 'react'

export type SubmitJoyTx = (
  buildTx: (
    api: ApiPromise,
  ) =>
    | Promise<SubmittableExtrinsic<'promise'>>
    | SubmittableExtrinsic<'promise'>,
  sender?: string,
) => Promise<RawExtrinsicResult | undefined>

export type TransactionContextType = {
  addTxPromise?: (txPromise: Promise<unknown>, onSuccess?: () => void) => void
  submitJoyTx?: SubmitJoyTx
  isSubmittingTx?: boolean
}
export const TransactionContext = createContext<TransactionContextType>({})
