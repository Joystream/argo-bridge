import { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button, ButtonProps } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { useJoyWallets } from '@/providers/joyWallet'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type JoyConnectButtonProps = {
  text?: string
  variant?: ButtonProps['variant']
  fullWidth?: boolean
}

export const JoyConnectButton: FC<JoyConnectButtonProps> = ({
  text,
  variant,
  fullWidth = false,
}) => {
  const {
    connectToWallet,
    disconnectWallet,
    allWallets,
    walletStatus,
    wallet,
  } = useJoyWallets()

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

  if (walletStatus === 'pending') {
    return (
      <Button disabled variant="outline">
        Connecting...
      </Button>
    )
  }

  if (walletStatus === 'connected') {
    return (
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
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant || 'outline'}
          className={cn(fullWidth && 'w-full')}
        >
          {text || 'JOY wallet'}
        </Button>
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
}
