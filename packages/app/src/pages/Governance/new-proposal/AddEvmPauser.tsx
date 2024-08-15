import { NewProposalFields } from './NewProposalFields'
import { useProposeCall } from './proposals.utils'
import { AddressLink } from '@/components/AddressLink'
import { BRIDGE_ADDRESS } from '@/config'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { evmAddressSchema } from '@/lib/forms'
import { zodResolver } from '@hookform/resolvers/zod'
import { BridgeAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Address, encodeFunctionData, isAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { z } from 'zod'

const formSchema = z.object({
  newPauserAddress: evmAddressSchema,
})
type FormSchema = z.infer<typeof formSchema>

export const AddEvmPauser: FC = () => {
  const { data } = useBridgeConfigs()
  const evmConfig = data?.evm

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const { data: pauserRole } = useReadContract({
    abi: BridgeAbi,
    address: BRIDGE_ADDRESS,
    functionName: 'PAUSER_ROLE',
  })

  const proposeCall = useProposeCall()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!pauserRole || !evmConfig) {
      toast.error('Unexpected error')
      console.error({ pauserRole, evmConfig })
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'grantRole',
      args: [pauserRole, values.newPauserAddress],
    })

    await proposeCall([
      {
        target: BRIDGE_ADDRESS,
        calldata: grantCalldata,
      },
    ])
  }

  if (!evmConfig) {
    return <div>Loading...</div>
  }

  return (
    <NewProposalFields
      form={form}
      description="Add a new pauser to the bridge. They are able to pause the bridge at any time in case of emergency. Bridge can be unpaused only by governance proposal."
      fields={[
        {
          name: 'newPauserAddress',
          label: 'New pauser address',
        },
      ]}
      onSubmit={handleSubmit}
    />
  )
}
