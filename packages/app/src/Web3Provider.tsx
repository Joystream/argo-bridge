import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { FC, PropsWithChildren } from "react"
import { WagmiProvider } from "wagmi"
import { sepolia } from "wagmi/chains"

const queryClient = new QueryClient()

const projectId = "182045328bc80762fd8f59b92190dc13"

const metadata = {
  name: "Argo Bridge",
  description: "Bridge between Joystream L1 and EVM chains",
  url: "https://joystream.org",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

const chains = [sepolia] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "light",
})

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
