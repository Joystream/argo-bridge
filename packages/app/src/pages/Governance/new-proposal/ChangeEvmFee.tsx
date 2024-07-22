import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProposeCall } from './proposals.utils'
import { encodeFunctionData, parseEther } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { rawAmountSchema } from '@/lib/forms'
import { NewProposalFields } from './NewProposalFields'

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

  const scheduleCall = useProposeCall()

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
    <NewProposalFields
      form={form}
      description="Change the fee charged by the bridge for bridging transactions. Fees can be withdrawn by a governance proposal."
      fields={[
        {
          name: 'newFeeRaw',
          label: 'New bridging fee (ETH)',
        },
      ]}
      onSubmit={handleSubmit}
    />
  )
}
