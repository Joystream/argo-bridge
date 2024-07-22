import { FC } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProposeCall } from './proposals.utils'

import { Address, encodeFunctionData, isAddress } from 'viem'
import { BridgeAbi } from '@joystream/argo-core'
import { BRIDGE_ADDRESS } from '@/config'
import { useReadContract } from 'wagmi'
import { toast } from 'sonner'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { AddressLink } from '@/components/AddressLink'
import { NewProposalFields } from './NewProposalFields'
import { evmAddressSchema } from '@/lib/forms'

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
