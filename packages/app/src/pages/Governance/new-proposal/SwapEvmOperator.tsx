import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProposeCall } from './proposals.utils'

import { encodeFunctionData } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLink } from '@/components/AddressLink'
import { NewProposalFields } from './NewProposalFields'
import { evmAddressSchema } from '@/lib/forms'

const formSchema = z.object({
  newOperatorAddress: evmAddressSchema,
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

  const proposeCall = useProposeCall()

  const currentOperator = evmConfig?.bridgeOperatorAccounts[0]

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!operatorRole || !currentOperator) {
      toast.error('Unexpected error')
      console.error({ operatorRole, currentAdmin: currentOperator })
      return
    }
    const grantCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'grantRole',
      args: [operatorRole, values.newOperatorAddress],
    })
    const revokeCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'revokeRole',
      args: [operatorRole, currentOperator],
    })

    await proposeCall([
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

  if (!currentOperator) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2">
      <h5>
        Swap timelock admin from <AddressLink address={currentOperator} /> to:
      </h5>
      <NewProposalFields
        form={form}
        fields={[
          {
            name: 'newOperatorAddress',
            label: 'New bridge operator address',
          },
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  )
}