import { createContext } from 'react'
import { ApiPromise } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { RawExtrinsicResult } from '@joystream/argo-core'

export type SubmitJoyTx = (
  buildTx: (
    api: ApiPromise
  ) =>
    | Promise<SubmittableExtrinsic<'promise'>>
    | SubmittableExtrinsic<'promise'>,
  sender?: string
) => Promise<RawExtrinsicResult | undefined>

export type TransactionContextType = {
  addTxPromise?: (txPromise: Promise<unknown>, onSuccess?: () => void) => void
  submitJoyTx?: SubmitJoyTx
  isSubmittingTx?: boolean
}
export const TransactionContext = createContext<TransactionContextType>({})
