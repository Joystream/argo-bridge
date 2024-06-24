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
  // setTxForConfirmation: (
  //   tx: SubmittableExtrinsic<'promise'>,
  //   accountId: string
  // ) => void
  addTxPromise?: (txPromise: Promise<unknown>) => void
  submitJoyTx?: SubmitJoyTx
}
export const TransactionContext = createContext<TransactionContextType>({})
