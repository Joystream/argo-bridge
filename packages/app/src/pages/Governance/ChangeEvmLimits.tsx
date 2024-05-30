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
import { JoyHapiInput } from '@/components/JoyHapiInput'
import { Button } from '@/components/ui/button'
import { useScheduleCall } from '@/pages/Governance/governance.utils'
import { encodeFunctionData } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'

const formSchema = z.object({
  newMintingPeriod: z.number().int().positive(),
  newMintingAmount: z.bigint().positive(),
})
type FormSchema = z.infer<typeof formSchema>

export const ChangeEvmLimits: FC = () => {
  const form = useForm<FormSchema>({
    defaultValues: {
      newMintingPeriod: 0,
      newMintingAmount: 0n,
    },
    resolver: zodResolver(formSchema),
  })

  const scheduleCall = useScheduleCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'setMintingLimits',
      args: [BigInt(values.newMintingPeriod), values.newMintingAmount],
    })

    await scheduleCall(BRIDGE_ADDRESS, calldata)
  }

  return (
    <div className="max-w-[300px] border-2 rounded border-primary px-3 py-2">
      <TypographyH4>Change EVM limits</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newMintingPeriod"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>New minting limit period (blocks)</FormLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value))
                  }}
                  className="text-sm h-10"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newMintingAmount"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <JoyHapiInput
                  type="joy"
                  label="New minting limit amount (JOY)"
                  hapiValue={field.value}
                  setHapiValue={field.onChange}
                />
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
