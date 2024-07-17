import { JoyApiProvider } from './providers/joyApi'
import { JoyWalletProvider } from './providers/joyWallet'
import { TopNav } from '@/components/TopNav'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { FC } from 'react'
import { TransactionProvider } from '@/providers/transaction'
import { EvmProvider } from '@/providers/evm.provider'
import { ROUTES } from '@/routes'
import { ThemeProvider } from '@/providers/theme.provider'

const Layout: FC = () => (
  <>
    <TopNav />
    <main className="px-4 pb-6 sm:px-6 lg:px-8 mt-[120px]">
      <Outlet />
    </main>
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: ROUTES,
  },
])

const App = () => {
  return (
    <ThemeProvider>
      <JoyApiProvider>
        <JoyWalletProvider>
          <EvmProvider>
            <TooltipProvider delayDuration={300}>
              <TransactionProvider>
                <RouterProvider router={router} />
                <Toaster />
              </TransactionProvider>
            </TooltipProvider>
          </EvmProvider>
        </JoyWalletProvider>
      </JoyApiProvider>
    </ThemeProvider>
  )
}

export default App
