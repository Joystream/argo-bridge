import { NewProposalFields } from './NewProposalFields'
import { useProposeCall } from './proposals.utils'
import { BRIDGE_ADDRESS } from '@/config'
import { rawAmountSchema } from '@/lib/forms'
import { joyToHapi } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { BridgeAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { encodeFunctionData } from 'viem'
import { z } from 'zod'

const formSchema = z.object({
  newMintingPeriodRaw: z
    .string()
    .min(1, 'Period is required')
    .regex(/^-?\d+$/, 'Period must be a positive integer')
    .refine(
      (v) => {
        try {
          const n = parseInt(v)
          if (isNaN(n)) return false
          return n > 0
        } catch {
          return false
        }
      },
      { message: 'Period must be a positive integer' },
    ),
  newMintingAmountRaw: rawAmountSchema,
})
type FormSchema = z.infer<typeof formSchema>

export const ChangeEvmLimits: FC = () => {
  const form = useForm<FormSchema>({
    defaultValues: {
      newMintingPeriodRaw: '',
      newMintingAmountRaw: '',
    },
    resolver: zodResolver(formSchema),
  })

  const proposeCall = useProposeCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const amountHapi = joyToHapi(parseFloat(values.newMintingAmountRaw))

    const calldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'setMintingLimits',
      args: [BigInt(values.newMintingPeriodRaw), amountHapi],
    })

    await proposeCall([
      {
        target: BRIDGE_ADDRESS,
        calldata,
      },
    ])
  }

  return (
    <NewProposalFields
      form={form}
      description="Change how many JOY tokens can be minted in a given period of time (blocks)."
      fields={[
        {
          name: 'newMintingPeriodRaw',
          label: 'New minting limit period (blocks)',
        },
        {
          name: 'newMintingAmountRaw',
          label: 'New minting limit amount (JOY)',
        },
      ]}
      onSubmit={handleSubmit}
    />
  )
}
