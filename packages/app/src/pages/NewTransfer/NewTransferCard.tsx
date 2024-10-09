import { NewTransferAllowance } from './NewTransferAllowance'
import { NewTransferDirectionSelector } from './NewTransferDirectionSelector'
import { NewTransferForm } from './NewTransferForm'
import { NewTransferSummary } from './NewTransferSummary'
import { ParsedTransferFormData, TransferFormSchema } from './newTransfer.types'
import { EvmConnectButton } from '@/components/EvmConnectButton'
import { JoyConnectButton } from '@/components/JoyConnectButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { BRIDGE_ADDRESS, ERC20_ADDRESS } from '@/config'
import { BridgeTransferType } from '@/gql/graphql'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { evmAddressSchema, rawAmountSchema } from '@/lib/forms'
import { isJoyAddress } from '@/lib/utils'
import { useUser } from '@/providers/user/user.hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Erc20Abi } from '@joystream/argo-core'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'sonner'
import { Address, isAddress } from 'viem'
import { useAccount, useReadContract, useWalletClient } from 'wagmi'
import { z } from 'zod'

const evmToJoyFormSchema = z.object({
  sourceAddress: evmAddressSchema,
  targetAddress: z
    .string()
    .min(1, 'Target address is required')
    .refine(isJoyAddress, {
      message: 'This is not a valid Joystream address',
    }),
  amountRaw: rawAmountSchema,
})

const joyToEvmFormSchema = z.object({
  sourceAddress: z
    .string()
    .min(1, 'Source address is required')
    .refine(isJoyAddress, {
      message: 'This is not a valid Joystream address',
    }),
  targetAddress: evmAddressSchema,
  amountRaw: rawAmountSchema,
})

type TransferStep =
  | { type: 'form' }
  | { type: 'allowance'; data: ParsedTransferFormData }
  | { type: 'summary'; data: ParsedTransferFormData }

export const NewTransferCard: FC = () => {
  const { isJoyPaused, isEvmPaused } = useBridgeConfigs()

  const [transferType, setTransferType] = useState<BridgeTransferType>(
    BridgeTransferType.JoyToEvm,
  )
  const [transferStep, setTransferStep] = useState<TransferStep>({
    type: 'form',
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const { evmAddresses, joyAddresses } = useUser()
  const { chain: connectedEvmChain } = useAccount()

  const formSchema = useMemo(
    () =>
      transferType === BridgeTransferType.JoyToEvm
        ? joyToEvmFormSchema
        : evmToJoyFormSchema,
    [transferType],
  )
  const queryClient = useQueryClient()

  const sourceAddresses =
    transferType === BridgeTransferType.JoyToEvm ? joyAddresses : evmAddresses

  const isBridgeUnavailable =
    (transferType === BridgeTransferType.JoyToEvm && isJoyPaused) ||
    (transferType === BridgeTransferType.EvmToJoy && isEvmPaused)

  const form = useForm<TransferFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceAddress: sourceAddresses?.[0] ?? '',
      amountRaw: '',
      targetAddress: '',
    },
  })

  const sourceAddress = form.watch('sourceAddress')

  // set default source address if empty
  useEffect(() => {
    if (sourceAddress || !sourceAddresses?.length) return

    form.reset({
      sourceAddress: sourceAddresses[0],
    })
  }, [sourceAddress, form.reset, sourceAddresses])

  const { queryKey: evmAllowanceQueryKey } = useReadContract({
    address: ERC20_ADDRESS,
    abi: Erc20Abi,
    functionName: 'allowance',
    args: [(sourceAddress as Address) ?? '0x0', BRIDGE_ADDRESS],
    query: {
      enabled:
        transferType === BridgeTransferType.EvmToJoy &&
        isAddress(sourceAddress),
      retry: 3,
    },
  })

  const handleTransferTypeChange = (newType: BridgeTransferType) => {
    if (newType === transferType) return

    setTransferType(newType)

    setTransferStep({ type: 'form' })

    form.reset({
      sourceAddress:
        (newType === BridgeTransferType.JoyToEvm
          ? joyAddresses
          : evmAddresses)?.[0] ?? '',
      targetAddress: '',
      amountRaw: form.getValues('amountRaw'),
    })
  }

  const handleFormSubmit = async (
    data: ParsedTransferFormData,
    retriesDone = 0,
  ) => {
    if (retriesDone > 2) {
      toast.error('Unexpected error')
      console.error('Too many retries')
      return
    }

    if (transferType === BridgeTransferType.EvmToJoy) {
      // we will call this function with timeout if the approval data is not ready
      // for that reason we need to get query state directly from queryClient, so we don't get stale React data
      // I'll be honest, it's a bit dirty

      const allowanceQueryState =
        queryClient.getQueryState(evmAllowanceQueryKey)

      if (!allowanceQueryState) {
        toast.error('Unexpected error')
        console.error('Allowance query state not found')
        return
      }

      if (allowanceQueryState.error) {
        toast.error('Unexpected error')
        console.error('Could not fetch allowance', allowanceQueryState.error)
        return
      }

      if (allowanceQueryState.data == null) {
        console.warn('no allowance data yet')
        setTimeout(() => {
          handleFormSubmit(data, retriesDone + 1)
        }, 500)
        return
      }

      const allowance = allowanceQueryState.data as bigint
      if (allowance < data.hapiAmount) {
        setTransferStep({ type: 'allowance', data })
        return
      }
    }

    setTransferStep({ type: 'summary', data })
  }

  const isMissingWallet =
    (transferType === BridgeTransferType.JoyToEvm && !joyAddresses?.length) ||
    (transferType === BridgeTransferType.EvmToJoy &&
      (!evmAddresses?.length || !connectedEvmChain))

  const getCardTitle = () => {
    if (isBridgeUnavailable) {
      return 'Bridge is not active'
    }

    if (isMissingWallet) {
      return 'Connect wallet'
    }

    if (transferStep.type === 'form') {
      return transferType === BridgeTransferType.JoyToEvm
        ? 'Transfer from Joystream to Base'
        : 'Transfer from Base to Joystream'
    }
    if (transferStep.type === 'allowance') {
      return 'Before you initiate a transfer...'
    }
    if (transferStep.type === 'summary') {
      return 'Transfer summary'
    }
  }
  const cardTitle = getCardTitle()

  const getCardDescription = () => {
    if (isBridgeUnavailable) {
      return `Bridge is paused on ${
        transferType === BridgeTransferType.JoyToEvm ? 'Joystream' : 'Base'
      } network. Please try again later.`
    }

    if (isMissingWallet) {
      return `Connect your ${
        transferType === BridgeTransferType.JoyToEvm ? 'Joystream' : 'Base'
      } wallet to proceed.`
    }

    if (transferStep.type === 'form') {
      return transferType === BridgeTransferType.JoyToEvm
        ? 'Enter the information below to request transfer of JOY tokens.'
        : 'Enter the information below to request transfer of JOY tokens.'
    }
    if (transferStep.type === 'allowance') {
      return 'You need to allow the bridge contract to transfer ERC20 JOY tokens on your behalf.'
    }
    if (transferStep.type === 'summary') {
      return null
    }
  }
  const cardDescription = getCardDescription()

  const getDisplayedContent = () => {
    if (isBridgeUnavailable) {
      return (
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <NavLink to="/governance">Check governance page</NavLink>
          </Button>
        </CardFooter>
      )
    }

    if (isMissingWallet) {
      if (transferType === BridgeTransferType.JoyToEvm) {
        return (
          <CardFooter>
            <JoyConnectButton fullWidth />
          </CardFooter>
        )
      } else {
        return (
          <CardFooter>
            <EvmConnectButton variant="default" fullWidth />
          </CardFooter>
        )
      }
    }

    if (transferStep.type === 'form') {
      return (
        <NewTransferForm
          form={form}
          onSubmit={handleFormSubmit}
          transferType={transferType}
        />
      )
    }

    if (transferStep.type === 'allowance') {
      return (
        <NewTransferAllowance
          userAddress={sourceAddress}
          onGoBack={() => setTransferStep({ type: 'form' })}
          onSuccess={() =>
            setTransferStep({ type: 'summary', data: transferStep.data })
          }
        />
      )
    }

    if (transferStep.type === 'summary') {
      return (
        <NewTransferSummary
          transferData={transferStep.data}
          transferType={transferType}
          onGoBack={() => setTransferStep({ type: 'form' })}
          onSuccess={() => {
            setTransferStep({ type: 'form' })
            setShowSuccessDialog(true)
          }}
        />
      )
    }
  }

  return (
    <div className="mx-auto max-w-md w-full">
      {transferStep.type === 'form' ? (
        <NewTransferDirectionSelector
          value={transferType}
          onChange={handleTransferTypeChange}
        />
      ) : null}
      <TransferSuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />

      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          {cardDescription ? (
            <CardDescription>{cardDescription}</CardDescription>
          ) : null}
        </CardHeader>
        {getDisplayedContent()}
      </Card>
    </div>
  )
}

const TransferSuccessDialog: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { data: walletClient } = useWalletClient()
  const handleAddToWallet = async () => {
    if (!walletClient) {
      toast.error('Unexpected error')
      console.error('No client found')
      return
    }
    const handleError = (error: Error) => {
      toast.error('Failed to add JOY to your wallet')
      console.error('Failed to add JOY to your wallet', error)
    }

    try {
      const success = await walletClient.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: ERC20_ADDRESS,
            symbol: 'JOY',
            decimals: 10,
            image:
              'https://raw.githubusercontent.com/Joystream/design/refs/heads/master/logo/joystream/logo%20icon/SVG/Icon-mono-white-1bg-blue.svg',
          },
        },
      })
      if (!success) {
        handleError(new Error('Failed to add JOY to your wallet'))
      } else {
        toast.success('JOY added to your wallet')
      }
    } catch (error) {
      handleError(error as Error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" closeable>
        <DialogHeader>
          <DialogTitle className="text-center">Transfer requested</DialogTitle>
          <div className="flex flex-col items-center">
            <DotLottieReact
              src="https://lottie.host/e3dcc672-3e03-469d-bf77-f935d9f2cc17/9dIoizkn3h.lottie"
              loop={false}
              speed={0.5}
              autoplay={true}
              style={{ width: '200px', height: '200px' }}
            />
          </div>
          <DialogDescription className="text-center text-sm text-gray-500">
            Your funds are on their way. The transaction may take a few days to
            complete.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <Button variant="outline" asChild>
            <Link to="/transfers">View transfers</Link>
          </Button>
          {walletClient ? (
            <Button variant="outline" onClick={handleAddToWallet}>
              Track JOY in your wallet
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
