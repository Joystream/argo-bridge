import { NewProposalFields } from './NewProposalFields'
import { useProposeCall } from './proposals.utils'
import { BRIDGE_ADDRESS } from '@/config'
import { BridgeAbi } from '@joystream/argo-core'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { encodeFunctionData } from 'viem'

export const UnpauseEvm: FC = () => {
  const proposeCall = useProposeCall()

  const handleSubmit = async () => {
    const unpauseCalldata = encodeFunctionData({
      abi: BridgeAbi,
      functionName: 'unpauseBridge',
    })

    await proposeCall([
      {
        target: BRIDGE_ADDRESS,
        calldata: unpauseCalldata,
      },
    ])
  }

  // empty form cause i'm too lazy to refactor NewProposalFields
  const form = useForm()

  return (
    <NewProposalFields
      form={form}
      description="Unpauses the bridge and allows new transfers."
      fields={[]}
      onSubmit={handleSubmit}
    />
  )
}
