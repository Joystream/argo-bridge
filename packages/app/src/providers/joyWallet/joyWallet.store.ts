import { Account, BaseWallet } from '@polkadot-onboard/core'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type WalletStatus = 'unknown' | 'connected' | 'disconnected' | 'pending'

export type JoyWalletStoreState = {
  wallet: BaseWallet | null
  walletAccounts: Account[]
  selectedAccount: Account | null
  walletStatus: WalletStatus
  lastUsedWalletName: string | null
}

export type JoyWalletStoreActions = {
  setWallet: (wallet: BaseWallet | null) => void
  setWalletAccounts: (accounts: Account[]) => void
  setWalletStatus: (status: WalletStatus) => void
  setSelectedAccount: (account: Account) => void
}

export const useJoyWalletStore = create<
  JoyWalletStoreState & JoyWalletStoreActions
>()(
  persist(
    immer((set) => ({
      wallet: null,
      walletAccounts: [],
      selectedAccount: null,
      walletStatus: 'unknown',
      lastUsedWalletName: null,
      setWallet: (wallet) => {
        set((state) => {
          state.wallet = wallet
          state.lastUsedWalletName = wallet?.metadata.id || null
        })
      },
      setWalletAccounts: (accounts) => {
        set((state) => {
          state.walletAccounts = accounts
          state.selectedAccount = accounts[0] || null
        })
      },
      setWalletStatus: (status) => {
        set((state) => {
          state.walletStatus = status
        })
      },
      setSelectedAccount: (account) => {
        set((state) => {
          state.selectedAccount = account
        })
      },
    })),
    {
      name: 'argoapp-joy-wallet',
      partialize: (s) => ({
        lastUsedWalletName: s.lastUsedWalletName,
      }),
    },
  ),
)
