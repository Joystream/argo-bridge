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

import { Address, encodeFunctionData } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLink } from '@/components/AddressLink'

const formSchema = z.object({
  newOperatorAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address'),
})
type FormSchema = z.infer<typeof formSchema>

export const SwapEvmOperator: FC = () => {
  const { data } = useBridgeConfigs()
  const evmConfig = data?.evm

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const { data: operatorRole } = useReadContract({
    abi: BridgeAbi,
    address: BRIDGE_ADDRESS,
    functionName: 'OPERATOR_ROLE',
  })

  const scheduleCall = useScheduleCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!operatorRole || !evmConfig) {
      console.error('Operator role not found')
      toast.error('Failed')
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'grantRole',
      args: [operatorRole, values.newOperatorAddress as Address],
    })
    const revokeCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'revokeRole',
      args: [operatorRole, evmConfig.bridgeOperatorAccounts[0] as Address],
    })

    await scheduleCall([
      {
        target: BRIDGE_ADDRESS,
        calldata: grantCalldata,
      },
      {
        target: BRIDGE_ADDRESS,
        calldata: revokeCalldata,
      },
    ])
  }

  return (
    <div>
      <TypographyH4>Swap bridge operator</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            Swap bridge operator from{' '}
            <AddressLink address={evmConfig!.bridgeOperatorAccounts[0]} /> to:
          </div>
          <FormField
            control={form.control}
            name="newOperatorAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>New bridge operator address</FormLabel>
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
