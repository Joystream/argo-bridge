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
import { useScheduleCall } from '@/pages/Governance/governance.utils'
import { Address, encodeFunctionData } from 'viem'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLabel } from '@/components/AddressLabel'

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
    <div>
      <TypographyH4>Swap EVM timelock admin</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            Swap timelock admin from{' '}
            <AddressLabel address={evmConfig!.timelockAdminAccounts[0]} /> to:
          </div>
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
