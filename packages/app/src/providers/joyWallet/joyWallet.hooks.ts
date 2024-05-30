import { useContext } from 'react'
import { JoyWalletContext } from './joyWallet.types'
import { useJoyWalletStore } from './joyWallet.store'
import { useWallets } from '@polkadot-onboard/react'

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
