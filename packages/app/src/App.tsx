import { JoyApiProvider } from './providers/joyApi'
import { JoyWalletProvider } from './providers/joyWallet'
import { Footer } from '@/components/Footer'
import { TopNav } from '@/components/TopNav'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { EvmProvider } from '@/providers/evm.provider'
import { ThemeProvider } from '@/providers/theme.provider'
import { TransactionProvider } from '@/providers/transaction'
import { ROUTES } from '@/routes'
import { FC } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

const Layout: FC = () => (
  <div className="flex flex-col min-h-screen">
    <TopNav />
    <main className="flex-grow px-4 pb-6 sm:px-6 lg:px-8 mt-[10px] sm:mt-[10px] md:mt-[20px]">
      <Outlet />
    </main>
    <Footer />
  </div>
)

const router = createBrowserRouter([
  {
    path: '',
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
