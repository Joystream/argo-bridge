import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
} from 'react'

import {
  APP_NAME,
  JOYSTREAM_CHAIN_ID,
  WC_METADATA,
  WC_PROJECT_ID,
} from '@/config'
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets'
import { extensionConfig } from './extensionsConfig'
import {
  WalletConnectConfiguration,
  WalletConnectProvider,
} from '@polkadot-onboard/wallet-connect'
import { Account, WalletAggregator } from '@polkadot-onboard/core'
import { PolkadotWalletsContextProvider } from '@polkadot-onboard/react'
import { useJoyWalletStore } from './joyWallet.store'
import { JoyWalletContext } from './joyWallet.types'
import { formatJoystreamAddress } from '@/lib/utils'

const walletConnectParams: WalletConnectConfiguration = {
  projectId: WC_PROJECT_ID,
  relayUrl: 'wss://relay.walletconnect.com',
  metadata: WC_METADATA,
  chainIds: [JOYSTREAM_CHAIN_ID],
  optionalChainIds: [JOYSTREAM_CHAIN_ID],
}

const injectedWalletProvider = new InjectedWalletProvider(
  extensionConfig,
  APP_NAME
)

const walletConnectProvider = new WalletConnectProvider(
  walletConnectParams,
  APP_NAME
)
const walletAggregator = new WalletAggregator([
  injectedWalletProvider,
  walletConnectProvider,
])

function parseAccounts(accounts: Account[]): Account[] {
  return accounts
    .filter((account) => !account.type || account.type === 'sr25519')
    .map((account) => ({
      ...account,
      address: formatJoystreamAddress(account.address),
    }))
}

const InnerWalletsProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    wallet,
    walletAccounts,
    walletStatus,
    setWallet,
    setWalletAccounts,
    setWalletStatus,
    lastUsedWalletName,
  } = useJoyWalletStore()

  const connectToWallet = useCallback(
    async (walletId: string): Promise<Account[] | null> => {
      try {
        setWalletStatus('pending')
        const wallets = await walletAggregator.getWallets()
        const selectedWallet = wallets?.find(
          (wallet) => wallet.metadata.id === walletId
        )
        if (!selectedWallet) {
          console.error(`Wallet ${walletId} not found`)
          console.dir(wallets)
          setWalletStatus('disconnected')
          return null
        }

        await selectedWallet.connect()
        const allAccounts = await selectedWallet.getAccounts()

        const accounts = parseAccounts(allAccounts)

        setWalletAccounts(accounts)
        setWallet(selectedWallet)
        setWalletStatus('connected')

        return accounts
      } catch (e) {
        setWalletStatus('disconnected')
        throw e
      }
    },
    [setWallet, setWalletAccounts, setWalletStatus]
  )

  const disconnectWallet = useCallback(async () => {
    if (wallet) {
      await wallet.disconnect()
      setWallet(null)
      setWalletAccounts([])
      setWalletStatus('disconnected')
    }
  }, [wallet, setWallet, setWalletAccounts, setWalletStatus])

  const handleAccountsChange = useCallback(
    (accounts?: Account[]) => {
      if (!accounts) {
        setWalletAccounts([])
        return
      }
      const parsedAccounts = parseAccounts(accounts)
      setWalletAccounts(parsedAccounts)
    },
    [setWalletAccounts]
  )

  useEffect(() => {
    if (!wallet || walletStatus !== 'connected') {
      return
    }
    type UnsubFn = () => void
    let unsubscribeAccounts: UnsubFn | undefined
    const subscribePromise = wallet.subscribeAccounts(
      handleAccountsChange
    ) as Promise<UnsubFn>
    subscribePromise.then((unsub) => {
      unsubscribeAccounts = unsub
    })
    return () => {
      unsubscribeAccounts?.()
    }
  }, [handleAccountsChange, wallet, walletStatus])

  useEffect(() => {
    if (walletStatus !== 'unknown' || !lastUsedWalletName || wallet) {
      return
    }

    setWalletStatus('pending')

    // new Promise((resolve) => setTimeout(resolve, 20)).then(() => {
    connectToWallet(lastUsedWalletName)
    // })
  }, [
    walletStatus,
    lastUsedWalletName,
    wallet,
    connectToWallet,
    setWalletStatus,
  ])

  return (
    <JoyWalletContext.Provider value={{ connectToWallet, disconnectWallet }}>
      {children}
    </JoyWalletContext.Provider>
  )
}

export const JoyWalletProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      <InnerWalletsProvider>{children}</InnerWalletsProvider>
    </PolkadotWalletsContextProvider>
  )
}
