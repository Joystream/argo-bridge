import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, truncateValue } from '@/lib/utils'
import { useJoyWallets } from '@/providers/joyWallet'
import { useUser } from '@/providers/user/user.hooks'
import { CopyIcon } from 'lucide-react'
import { FC } from 'react'
import { toast } from 'sonner'

type JoyConnectButtonProps = {
  fullWidth?: boolean
}

export const JoyConnectButton: FC<JoyConnectButtonProps> = ({
  fullWidth = false,
}) => {
  const {
    connectToWallet,
    disconnectWallet,
    allWallets,
    walletStatus,
    wallet,
    walletAccounts,
  } = useJoyWallets()

  const { userJoyOperator, userJoyPauser } = useUser()

  const handleConnectWallet = async (walletId: string) => {
    try {
      const accounts = await connectToWallet(walletId)
      if (!accounts || accounts.length === 0) {
        toast.warning('Joystream wallet connected with no accounts')
        return
      }
      toast.success(
        `Joystream wallet connected with ${accounts.length} accounts`,
      )
    } catch (error) {
      console.error(error)
      toast.error('Joystream wallet connection failed')
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet()
      toast.success('Joystream wallet disconnected')
    } catch (error) {
      toast.error('Failed to disconnect Joystream wallet')
    }
  }

  const getDescription = () => {
    if (walletStatus === 'pending') {
      return 'Connecting...'
    }
    if (walletStatus === 'connected') {
      return `Connected to ${wallet?.metadata.title}`
    }
    return 'Not connected'
  }

  const getMainButton = () => {
    if (walletStatus === 'pending') {
      return (
        <Button disabled variant="outline">
          Connecting...
        </Button>
      )
    }
    if (walletStatus === 'connected') {
      return (
        <Button variant="outline" onClick={handleDisconnectWallet}>
          Disconnect wallet
        </Button>
      )
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Connect wallet</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
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
  }

  const getRoles = () => {
    if (userJoyOperator || userJoyPauser) {
      return (
        <div className="flex flex-col gap-1 mb-2">
          <h4 className="font-semibold">Roles:</h4>
          <ul className="flex flex-col gap-1">
            {userJoyOperator ? (
              <li className="text-xs text-muted-foreground">
                Operator - {truncateValue(userJoyOperator, 9)}
              </li>
            ) : null}
            {userJoyPauser ? (
              <li className="text-xs text-muted-foreground">
                Pauser - {truncateValue(userJoyPauser, 9)}
              </li>
            ) : null}
          </ul>
        </div>
      )
    }
  }

  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard')
  }

  const getAccounts = () => {
    if (walletAccounts?.length) {
      return (
        <>
          <h4 className="font-semibold mb-2">
            Connected accounts ({walletAccounts?.length})
          </h4>
          <div className="flex flex-col gap-2">
            {walletAccounts?.map((account) => (
              <Card key={account.address}>
                <CardHeader className="space-y-0 p-3 flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium w-fit">
                          {truncateValue(account.address, 9)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{account.address}</TooltipContent>
                    </Tooltip>
                    <span className="text-sm text-muted-foreground">
                      {account.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center gap-2"
                    onClick={() => copyAddress(account.address)}
                  >
                    <CopyIcon className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn(fullWidth && 'w-full')}>
          Joy wallet
        </Button>
      </DialogTrigger>
      <DialogContent closeable className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Joystream wallet</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>
        {getMainButton()}
        <ScrollArea className="max-h-[70vh]">
          {getRoles()}
          {getAccounts()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
