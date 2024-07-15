import { JoyApiProvider } from './providers/joyApi'
import { JoyWalletProvider } from './providers/joyWallet'
import { TopNav } from '@/components/TopNav'

import { Toaster } from '@/components/ui/sonner'
import { Settings } from '@/components/Settings'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { FC } from 'react'
import { TransactionProvider } from '@/providers/transaction'
import { EvmProvider } from '@/providers/evm.provider'
import { ROUTES } from '@/routes'

const Layout: FC = () => (
  <>
    <Settings />
    <TopNav />
    <main className="px-4 pb-6 sm:px-6 lg:px-8 mt-[150px]">
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
  )
}

export default App
