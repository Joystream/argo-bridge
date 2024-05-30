import { createContext } from 'react'
import { Account } from '@polkadot-onboard/core'

export const JoyWalletContext = createContext<
  | undefined
  | {
      connectToWallet: (walletId: string) => Promise<Account[] | null>
      disconnectWallet: () => Promise<void>
    }
>(undefined)
