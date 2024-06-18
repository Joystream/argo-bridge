import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { WC_METADATA, WC_PROJECT_ID } from '@/config'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'

const queryClient = new QueryClient()

const chains = [baseSepolia] as const

const config = getDefaultConfig({
  appName: WC_METADATA.name,
  projectId: WC_PROJECT_ID,
  chains: chains,
})

export const EvmProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
