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
import { TypographyH2, TypographyH3 } from '@/components/ui/typography'

const formSchema = z.object({
  targetEvmAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address'),
  amount: z.bigint().positive(),
})
type FormSchema = z.infer<typeof formSchema>

export const JoyToEvmTransfer: FC = () => {
  const joyAccount = useJoyWalletStore((s) => s.selectedAccount)

  const form = useForm<FormSchema>({
    defaultValues: {
      targetEvmAddress: '',
      // amount: 0n,
    },
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
        <Button type="submit">Transfer</Button>
      </form>
    </Form>
  )
}
