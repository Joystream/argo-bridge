import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProposeCall } from './proposals.utils'

import { encodeFunctionData } from 'viem'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLink } from '@/components/AddressLink'
import { NewProposalFields } from './NewProposalFields'
import { evmAddressSchema } from '@/lib/forms'

const formSchema = z.object({
  newAdminAddress: evmAddressSchema,
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

  const proposeCall = useProposeCall()

  const currentAdmin = evmConfig?.timelockAdminAccounts[0]

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!proposerRole || !currentAdmin) {
      toast.error('Unexpected error')
      console.error({ proposerRole, currentAdmin })
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: TimelockAbi,
      functionName: 'grantRole',
      args: [proposerRole, values.newAdminAddress],
    })
    const revokeCalldata = encodeFunctionData({
      abi: TimelockAbi,
      functionName: 'revokeRole',
      args: [proposerRole, currentAdmin],
    })

    await proposeCall([
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

  if (!currentAdmin) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2">
      <h5>
        Swap timelock admin from <AddressLink address={currentAdmin} /> to:
      </h5>
      <NewProposalFields
        form={form}
        fields={[
          {
            name: 'newAdminAddress',
            label: 'New timelock admin address',
          },
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
