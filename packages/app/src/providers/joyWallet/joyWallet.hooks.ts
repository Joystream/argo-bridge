import { useJoyWalletStore } from './joyWallet.store'
import { JoyWalletContext } from './joyWallet.types'
import { useWallets } from '@polkadot-onboard/react'
import { useContext } from 'react'

export const useJoyWallets = () => {
  const { wallets: allWallets } = useWallets()
  const context = useContext(JoyWalletContext)
  if (!context) {
    throw new Error('useWalletsContext must be used within a WalletProvider')
  }
  const store = useJoyWalletStore()
  return {
    ...store,
    ...context,
    allWallets,
  }
}
