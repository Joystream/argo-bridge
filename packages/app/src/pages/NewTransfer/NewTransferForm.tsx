import {
  NewTransferDisclaimer,
  useNewTransferDisclaimerStore,
} from './NewTransferDisclaimer'
import './NewTransferForm.css'
import { ParsedTransferFormData, TransferFormSchema } from './newTransfer.types'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ERC20_ADDRESS } from '@/config'
import { BridgeTransferType } from '@/gql/graphql'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { useJoyBalanceQuery } from '@/lib/hooks'
import {
  cn,
  formatEth,
  formatJoy,
  formatJoystreamAddress,
  joyToHapi,
} from '@/lib/utils'
import { useUser } from '@/providers/user/user.hooks'
import { Dnum } from 'dnum'
import { FC, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Address, isAddress } from 'viem'
import { useBalance } from 'wagmi'

export type NewTransferFormProps = {
  onSubmit: (data: ParsedTransferFormData) => void
  form: UseFormReturn<TransferFormSchema>
  transferType: BridgeTransferType
}

export const NewTransferForm: FC<NewTransferFormProps> = ({
  onSubmit,
  form,
  transferType,
}) => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)
  const { setHasAccepted: setHasAcceptedDisclaimer } =
    useNewTransferDisclaimerStore()
  const { evmAddresses, joyAddresses } = useUser()

  const { data: configsData, isEvmPaused, isJoyPaused } = useBridgeConfigs()
  const joyConfig = configsData?.joy
  const evmConfig = configsData?.evm

  const sourceAddresses =
    transferType === BridgeTransferType.JoyToEvm ? joyAddresses : evmAddresses

  const isOtherSideUnavailable =
    (transferType === BridgeTransferType.JoyToEvm && isEvmPaused) ||
    (transferType === BridgeTransferType.EvmToJoy && isJoyPaused)
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

  const handleFormSubmit = (data: TransferFormSchema) => {
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
      targetAddress:
        transferType === BridgeTransferType.EvmToJoy
          ? formatJoystreamAddress(data.targetAddress)
          : data.targetAddress,
      hapiAmount: amountHapi,
    }

    if (!useNewTransferDisclaimerStore.getState().hasAccepted) {
      setIsDisclaimerOpen(true)
      return
    }

    onSubmit(parsedData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <CardContent className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="sourceAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transfer from</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      if (!v) return
                      field.onChange(v)
                    }}
                  >
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
                  {transferType === BridgeTransferType.EvmToJoy ? (
                    evmEthBalance != null ? (
                      <span className="before:inline-block before:h-2.5 before:w-[1px] before:mx-1 before:bg-[currentColor] before:opacity-50">
                        {formatEth(evmEthBalance)}
                      </span>
                    ) : (
                      ''
                    )
                  ) : null}
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
                : null,
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
          {isOtherSideUnavailable ? (
            <p className="text-destructive text-sm">
              Bridge on chain you are bridging to is currently paused. There may
              be delays in the transfer.
            </p>
          ) : null}
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Continue
          </Button>
        </CardFooter>
      </form>
      <NewTransferDisclaimer
        isOpen={isDisclaimerOpen}
        onClose={(accepted) => {
          setIsDisclaimerOpen(false)
          if (accepted) {
            setHasAcceptedDisclaimer(true)
            form.handleSubmit(handleFormSubmit)()
          }
        }}
      />
    </Form>
  )
}
