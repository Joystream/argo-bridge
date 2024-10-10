import { NewProposalFields } from './NewProposalFields'
import { useProposeCall } from './proposals.utils'
import { TIMELOCK_ADDRESS } from '@/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { TimelockAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { encodeFunctionData } from 'viem'
import { z } from 'zod'

const formSchema = z.object({
  newDelaySecondsRaw: z
    .string()
    .min(1, 'Delay is required')
    .regex(/^-?\d+$/, 'Delay must be a positive integer')
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
      { message: 'Delay must be a positive integer' },
    ),
})
type FormSchema = z.infer<typeof formSchema>

export const ChangeDelay: FC = () => {
  const form = useForm<FormSchema>({
    defaultValues: {
      newDelaySecondsRaw: '',
    },
    resolver: zodResolver(formSchema),
  })

  const scheduleCall = useProposeCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const delaySeconds = parseInt(values.newDelaySecondsRaw)
    const calldata = encodeFunctionData({
      abi: TimelockAbi,
      functionName: 'updateDelay',
      args: [BigInt(delaySeconds)],
    })

    await scheduleCall([
      {
        target: TIMELOCK_ADDRESS,
        calldata,
      },
    ])
  }

  return (
    <NewProposalFields
      form={form}
      description="Change the delay for the timelock. The delay is the time it takes for a proposal to be executed after it is approved."
      fields={[
        {
          name: 'newDelaySecondsRaw',
          label: 'New delay (seconds)',
        },
      ]}
      onSubmit={handleSubmit}
    />
  )
}
