import { FC } from 'react'
import { TypographyH4 } from '@/components/ui/typography'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useScheduleCall } from './proposals.utils'
import { encodeFunctionData, parseEther } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { rawAmountSchema } from '@/lib/forms'

const formSchema = z.object({
  newFeeRaw: rawAmountSchema,
})
type FormSchema = z.infer<typeof formSchema>

export const ChangeEvmFee: FC = () => {
  const form = useForm<FormSchema>({
    defaultValues: {
      newFeeRaw: '',
    },
    resolver: zodResolver(formSchema),
  })

  const scheduleCall = useScheduleCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const amountWei = parseEther(values.newFeeRaw)
    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'setBridgeFee',
      args: [amountWei],
    })

    await scheduleCall([
      {
        target: BRIDGE_ADDRESS,
        calldata,
      },
    ])
  }

  return (
    <div>
      <TypographyH4>Change brdiging fee</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newFeeRaw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New bridging fee (ETH)</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Propose change</Button>
        </form>
      </Form>
    </div>
  )
}
