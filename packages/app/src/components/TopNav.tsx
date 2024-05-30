import { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useJoyWallets } from '@/providers/joyWallet'
import { useSettingsStore } from '@/components/Settings'
import { Disclosure } from '@headlessui/react'
import { cn } from '@/lib/utils'
import { Menu, Settings, Wallet, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/routes'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const TopNav: FC = () => {
  const {
    connectToWallet,
    disconnectWallet,
    allWallets,
    walletStatus,
    wallet,
  } = useJoyWallets()

  const setSettingsOpen = useSettingsStore((s) => s.setSettingsOpen)

  const handleConnectWallet = async (walletId: string) => {
    try {
      const accounts = await connectToWallet(walletId)
      toast.success(`Wallet connected with ${accounts?.length} accounts`)
    } catch (error) {
      toast.error('Failed to connect wallet')
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet()
      toast.success('Wallet disconnected')
    } catch (error) {
      toast.error('Failed to disconnect wallet')
    }
  }

  const joyWalletNode =
    walletStatus === 'connected' ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="nav" size="icon">
            <Wallet />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Connected to {wallet?.metadata.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnectWallet}>
            Disconnect wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : walletStatus === 'pending' ? (
      <Button disabled variant="outline">
        Connecting...
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">JOY wallet</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allWallets?.map((wallet) => (
            <DropdownMenuItem
              key={wallet.metadata.id}
              onClick={() => handleConnectWallet(wallet.metadata.id)}
            >
              {wallet.type === 'WALLET_CONNECT'
                ? 'WalletConnect'
                : wallet.metadata.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )

  return (
    <div className="bg-gray-800">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl text-white">
                      Argo
                    </h1>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {ROUTES.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                              cn(
                                isActive
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-x-3 items-center md:ml-6 mr-3 md:mr-0">
                    <ConnectButton label="EVM wallet" />
                    {joyWalletNode}
                    <Button
                      variant="nav"
                      size="icon"
                      onClick={() => setSettingsOpen(true)}
                    >
                      <Settings className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
              <div className="space-y-1 px-2 py-3 sm:px-3">
                {ROUTES.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.path}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              {/*<div className="border-t border-gray-700 pb-3 pt-4">*/}
              {/*  <div className="flex items-center px-5">*/}
              {/*    <div className="flex-shrink-0">*/}
              {/*      <img*/}
              {/*        className="h-10 w-10 rounded-full"*/}
              {/*        src={user.imageUrl}*/}
              {/*        alt=""*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*    <div className="ml-3">*/}
              {/*      <div className="text-base font-medium leading-none text-white">*/}
              {/*        {user.name}*/}
              {/*      </div>*/}
              {/*      <div className="text-sm font-medium leading-none text-gray-400">*/}
              {/*        {user.email}*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <button*/}
              {/*      type="button"*/}
              {/*      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
              {/*    >*/}
              {/*      <span className="absolute -inset-1.5" />*/}
              {/*      <span className="sr-only">View notifications</span>*/}
              {/*      <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*  <div className="mt-3 space-y-1 px-2">*/}
              {/*    {userNavigation.map((item) => (*/}
              {/*      <Disclosure.Button*/}
              {/*        key={item.name}*/}
              {/*        as="a"*/}
              {/*        href={item.href}*/}
              {/*        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"*/}
              {/*      >*/}
              {/*        {item.name}*/}
              {/*      </Disclosure.Button>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
