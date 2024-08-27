import { WAGMI_CHAINS, WC_METADATA, WC_PROJECT_ID } from '@/config'
import { SafeManager } from '@/providers/safe/safe.manager'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: WC_METADATA.name,
  projectId: WC_PROJECT_ID,
  chains: WAGMI_CHAINS,
})

export const EvmProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <SafeManager />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
