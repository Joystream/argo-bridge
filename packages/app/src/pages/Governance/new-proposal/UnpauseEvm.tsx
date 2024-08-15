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
