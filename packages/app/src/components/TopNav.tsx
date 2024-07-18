import { FC } from 'react'
import { Disclosure } from '@headlessui/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '@/routes'
import { JoyConnectButton } from '@/components/JoyConnectButton'
import { EvmConnectButton } from '@/components/EvmConnectButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/theme.provider'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

export const TopNav: FC = () => {
  const { setTheme } = useTheme()
  const { pathname } = useLocation()

  return (
    <div>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto sm:px-6 lg:px-8">
              <div>
                <div className="h-20 py-4 items-center justify-between grid grid-cols-[1fr_2fr_1fr] px-4 sm:px-0">
                  <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl text-foreground">
                    Argo
                  </h1>
                  <NavigationMenu className="place-self-center hidden md:block">
                    <NavigationMenuList className="gap-4">
                      {ROUTES.map((item) => (
                        <NavigationMenuItem key={item.path}>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            asChild
                            active={pathname === item.path}
                          >
                            <NavLink to={item.path}>{item.name}</NavLink>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                  <div className="flex gap-x-3 items-center justify-end">
                    <JoyConnectButton />
                    <EvmConnectButton />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                    className="text-foreground hover:bg-primary-foreground block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
