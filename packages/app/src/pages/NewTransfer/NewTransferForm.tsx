import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useUser } from '@/providers/user/user.hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBalance } from 'wagmi'
import { ERC20_ADDRESS } from '@/config'
import { Dnum } from 'dnum'
import { Address, isAddress } from 'viem'
import { z } from 'zod'
import { cn, formatEth, formatJoy, isJoyAddress, joyToHapi } from '@/lib/utils'
import { BridgeTransferType } from '@/gql/graphql'
import { useJoyBalanceQuery } from '@/lib/hooks'
import { Input } from '@/components/ui/input'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { Button } from '@/components/ui/button'
import './NewTransferForm.css'
import { rawAmountSchema } from '@/lib/forms'

export type ParsedTransferFormData = {
  sourceAddress: string
  targetAddress: string
  hapiAmount: bigint
}

export type NewTransferFormProps = {
  onSubmit: (data: ParsedTransferFormData) => void
  transferType: BridgeTransferType
}

const evmToJoyFormSchema = z.object({
  sourceAddress: z
    .string()
    .min(1, 'Source address is required')
    .refine(isAddress, {
      message: 'This is not a valid Base address',
    }),
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
  targetAddress: z
    .string()
    .min(1, 'Target address is required')
    .refine(isAddress, {
      message: 'This is not a valid Base address',
    }),
  amountRaw: rawAmountSchema,
})

type FormSchema = {
  sourceAddress: string
  targetAddress: string
  amountRaw: string
}

export const NewTransferForm: FC<NewTransferFormProps> = ({
  onSubmit,
  transferType,
}) => {
  const { evmAddresses, joyAddresses } = useUser()

  const { data: configsData } = useBridgeConfigs()
  const joyConfig = configsData?.joy
  const evmConfig = configsData?.evm

  const sourceAddresses =
    transferType === BridgeTransferType.JoyToEvm ? joyAddresses : evmAddresses
  const targetAddresses =
    transferType === BridgeTransferType.JoyToEvm ? evmAddresses : joyAddresses

  const formSchema = useMemo(
    () =>
      transferType === BridgeTransferType.JoyToEvm
        ? joyToEvmFormSchema
        : evmToJoyFormSchema,
    [transferType]
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceAddress: sourceAddresses?.[0] ?? '',
      amountRaw: '',
      targetAddress: targetAddresses?.[0] ?? '',
    },
  })
  const { sourceAddress } = form.watch()

  const _evmJoyBalance = useBalance({
    address: sourceAddress as Address,
    token: ERC20_ADDRESS,
    query: {
      enabled:
        transferType === BridgeTransferType.EvmToJoy &&
        isAddress(sourceAddress),
    },
  })
  const evmJoyBalance: Dnum | null = _evmJoyBalance.data
    ? [_evmJoyBalance.data.value, _evmJoyBalance.data.decimals]
    : null

  const joyBalance = useJoyBalanceQuery(sourceAddress).data ?? null

  const _evmEthBalance = useBalance({
    address: sourceAddress as Address,
    query: {
      enabled:
        transferType === BridgeTransferType.EvmToJoy &&
        isAddress(sourceAddress),
    },
  })
  const evmEthBalance: Dnum | null = _evmEthBalance.data
    ? [_evmEthBalance.data.value, _evmEthBalance.data.decimals]
    : null

  const sourceBalance =
    transferType === BridgeTransferType.JoyToEvm ? joyBalance : evmJoyBalance

  useEffect(() => {
    if (sourceAddress || !sourceAddresses?.length) return

    form.reset({
      sourceAddress: sourceAddresses[0],
    })
  }, [sourceAddress, form.reset, sourceAddresses])

  const handleFormSubmit = (data: FormSchema) => {
    const amountHapi = joyToHapi(parseFloat(data.amountRaw))
    if (sourceBalance) {
      if (sourceBalance[0] < amountHapi) {
        form.setError('amountRaw', {
          type: 'manual',
          message: "You don't have enough tokens",
        })
        return
      }

      if (transferType === BridgeTransferType.JoyToEvm) {
        if (
          joyConfig &&
          joyConfig.bridgingFee + amountHapi > sourceBalance[0]
        ) {
          form.setError('amountRaw', {
            type: 'fee',
            message: `You don't have enough tokens to cover the bridging fee`,
          })
          return
        }
      }
    }

    if (transferType === BridgeTransferType.EvmToJoy) {
      if (
        evmEthBalance &&
        evmConfig &&
        evmConfig.bridgingFee > evmEthBalance[0]
      ) {
        form.setError('sourceAddress', {
          type: 'fee',
          message: `You don't have enough ETH to cover the bridging fee`,
        })
        return
      }
    }

    const parsedData: ParsedTransferFormData = {
      sourceAddress: data.sourceAddress,
      targetAddress: data.targetAddress,
      hapiAmount: amountHapi,
    }

    console.log('data', parsedData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="sourceAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer from</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                    {sourceAddresses?.map((address) => (
                      <SelectItem
                        key={address}
                        value={address}
                        className="overflow-hidden text-ellipsis"
                      >
                        {address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Balance:{' '}
                {sourceBalance != null ? formatJoy(sourceBalance) : '—'}
                {transferType === BridgeTransferType.EvmToJoy
                  ? evmEthBalance != null
                    ? ` | ${formatEth(evmEthBalance)}`
                    : ''
                  : null}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amountRaw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer to</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p
          className={cn(
            'text-sm text-muted-foreground',
            (
              form.formState.errors.amountRaw ||
              form.formState.errors.sourceAddress
            )?.type === 'fee'
              ? 'text-destructive'
              : null
          )}
        >
          Bridging fee:{' '}
          {transferType === BridgeTransferType.JoyToEvm
            ? joyConfig
              ? formatJoy(joyConfig.bridgingFee)
              : '—'
            : evmConfig
              ? formatEth(evmConfig.bridgingFee)
              : '—'}
        </p>
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  )
}
