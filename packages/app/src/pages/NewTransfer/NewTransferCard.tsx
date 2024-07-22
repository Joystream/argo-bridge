import { FC, useEffect, useMemo, useState } from 'react'
import { BridgeTransferType } from '@/gql/graphql'
import { NewTransferForm } from './NewTransferForm'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAccount, useReadContract } from 'wagmi'
import { BRIDGE_ADDRESS, ERC20_ADDRESS } from '@/config'
import { Erc20Abi } from '@joystream/argo-core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Address, isAddress } from 'viem'
import { isJoyAddress } from '@/lib/utils'
import { evmAddressSchema, rawAmountSchema } from '@/lib/forms'
import { ParsedTransferFormData, TransferFormSchema } from './newTransfer.types'
import { useUser } from '@/providers/user/user.hooks'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { NewTransferDirectionSelector } from './NewTransferDirectionSelector'
import { NewTransferAllowance } from './NewTransferAllowance'
import { NewTransferSummary } from './NewTransferSummary'
import { JoyConnectButton } from '@/components/JoyConnectButton'
import { EvmConnectButton } from '@/components/EvmConnectButton'

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
  const [transferType, setTransferType] = useState<BridgeTransferType>(
    BridgeTransferType.JoyToEvm
  )
  const [transferStep, setTransferStep] = useState<TransferStep>({
    type: 'form',
  })

  const { evmAddresses, joyAddresses } = useUser()
  const { chain: connectedEvmChain } = useAccount()

  const formSchema = useMemo(
    () =>
      transferType === BridgeTransferType.JoyToEvm
        ? joyToEvmFormSchema
        : evmToJoyFormSchema,
    [transferType]
  )
  const queryClient = useQueryClient()

  const sourceAddresses =
    transferType === BridgeTransferType.JoyToEvm ? joyAddresses : evmAddresses

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
    retriesDone = 0
  ) => {
    if (retriesDone > 2) {
      toast.error('Unexpected error')
      console.error('Too many retries')
      return
    }

    if (transferType === BridgeTransferType.EvmToJoy) {
      // we will call this function with timeout if the approval data is not ready
      // for that reason we need to get query state directly from queryClient, so we don't get stale React data

      const allowanceQueryState =
        queryClient.getQueryState(evmAllowanceQueryKey)

      console.log('allowanceQueryState', allowanceQueryState)

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
    if (isMissingWallet) {
      if (transferType === BridgeTransferType.JoyToEvm) {
        return (
          <CardFooter>
            <JoyConnectButton
              variant="default"
              text="Connect wallet"
              fullWidth
            />
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
          onSuccess={() => setTransferStep({ type: 'form' })}
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
