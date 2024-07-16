import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FC } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type EvmConnectButtonProps = {
  variant?: ButtonProps['variant']
  fullWidth?: boolean
}

export const EvmConnectButton: FC<EvmConnectButtonProps> = ({
  variant,
  fullWidth,
}) => {
  const buttonProps: ButtonProps = {
    variant: variant || 'outline',
    className: cn(fullWidth && 'w-full'),
    type: 'button',
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            className={cn(fullWidth && 'w-full')}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} {...buttonProps}>
                    Base wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} {...buttonProps}>
                    Wrong network
                  </Button>
                )
              }

              return (
                <Button onClick={openAccountModal} {...buttonProps}>
                  Base wallet
                </Button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
