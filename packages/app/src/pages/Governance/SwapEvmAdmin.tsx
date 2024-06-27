import { FC } from 'react'
import { TypographyH4, TypographyP } from '@/components/ui/typography'
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
import { useScheduleCall } from '@/pages/Governance/governance.utils'
import { Address, encodeFunctionData } from 'viem'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'

const formSchema = z.object({
  newAdminAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address'),
})
type FormSchema = z.infer<typeof formSchema>

export const SwapEvmAdmin: FC = () => {
  const { data } = useBridgeConfigs()
  const evmConfig = data?.evm

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const { data: proposerRole } = useReadContract({
    abi: TimelockAbi,
    address: TIMELOCK_ADDRESS,
    functionName: 'PROPOSER_ROLE',
  })

  const scheduleCall = useScheduleCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!proposerRole || !evmConfig) {
      console.error('Admin role not found')
      toast.error('Failed')
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: TimelockAbi,
      functionName: 'grantRole',
      args: [proposerRole, values.newAdminAddress as Address],
    })
    const revokeCalldata = encodeFunctionData({
      abi: TimelockAbi,
      functionName: 'revokeRole',
      args: [proposerRole, evmConfig.timelockAdminAccounts[0] as Address],
    })

    await scheduleCall([
      {
        target: TIMELOCK_ADDRESS,
        calldata: grantCalldata,
      },
      {
        target: TIMELOCK_ADDRESS,
        calldata: revokeCalldata,
      },
    ])
  }

  return (
    <div className="max-w-[500px] border-2 rounded border-primary px-3 py-2">
      <TypographyH4>Swap timelock admin</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TypographyP>
            Swap timelock admin from {evmConfig?.timelockAdminAccounts[0]} to:
          </TypographyP>
          <FormField
            control={form.control}
            name="newAdminAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>New EVM timelock admin address</FormLabel>
                <Input type="text" {...field} className="text-sm h-10" />
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
