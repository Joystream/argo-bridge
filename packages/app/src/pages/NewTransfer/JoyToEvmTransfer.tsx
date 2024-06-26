import { z } from 'zod'
import { FC, ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { JoyHapiInput } from '@/components/JoyHapiInput'
import { Button } from '@/components/ui/button'
import { useJoyWalletStore } from '@/providers/joyWallet/joyWallet.store'
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from '@/components/ui/typography'
import { useTransaction } from '@/providers/transaction'
import { buildRequestTransferExtrinsic } from '@/lib/joyExtrinsics'
import { EVM_NETWORK } from '@/config'
import { toast } from 'sonner'
import { isHex } from 'viem'
import { formatEth, formatJoy } from '@/lib/utils'
import { useBridgeConfigs } from '@/lib/bridgeConfig'

const formSchema = z.object({
  targetEvmAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address'),
  amount: z.bigint().positive(),
})
type FormSchema = z.infer<typeof formSchema>

export const JoyToEvmTransfer: FC = () => {
  const joyAccount = useJoyWalletStore((s) => s.selectedAccount)
  const { submitJoyTx } = useTransaction()

  const form = useForm<FormSchema>({
    defaultValues: {
      targetEvmAddress: '',
      // amount: 0n,
    },
    resolver: zodResolver(formSchema),
  })

  const { data: configsData } = useBridgeConfigs()
  const joyConfig = configsData?.joy

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!joyAccount || !submitJoyTx || !isHex(values.targetEvmAddress)) {
      toast.error('Error')
      console.error('Missing joyAccount or submitJoyTx')
      return
    }
    await submitJoyTx(
      await buildRequestTransferExtrinsic(
        EVM_NETWORK.chainId,
        values.targetEvmAddress,
        values.amount
      ),
      joyAccount.address
    )
  }

  const wrapContent = (content: ReactNode) => (
    <div className="space-y-3 py-4 px-3 border-2 my-3 border-primary rounded-xl">
      <TypographyH3>JOY to EVM transfer</TypographyH3>
      {content}
    </div>
  )

  if (!joyAccount) {
    return wrapContent(<span>Connect Joystream wallet</span>)
  }

  return wrapContent(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <span>From: {joyAccount.address}</span>
        <FormField
          control={form.control}
          name="targetEvmAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Destination EVM address</FormLabel>
              <Input type="text" {...field} className="text-sm h-10" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <JoyHapiInput
                type="joy"
                label="JOY amount"
                hapiValue={field.value}
                setHapiValue={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <TypographyP>
          Current bridging fee:{' '}
          {joyConfig ? formatJoy(joyConfig.bridgingFee) : 'unknown'}
        </TypographyP>
        <Button type="submit">Transfer</Button>
        <Button type="submit">Transfer</Button>
      </form>
    </Form>
  )
}
