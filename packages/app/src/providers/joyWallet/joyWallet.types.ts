import { Account } from '@polkadot-onboard/core'
import { createContext } from 'react'

export const JoyWalletContext = createContext<
  | undefined
  | {
      connectToWallet: (walletId: string) => Promise<Account[] | null>
      disconnectWallet: () => Promise<void>
    }
>(undefined)
