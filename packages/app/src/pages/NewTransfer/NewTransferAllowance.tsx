import React, { FC } from 'react'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { BRIDGE_ADDRESS, ERC20_ADDRESS } from '@/config'
import { Erc20Abi } from '@joystream/argo-core'
import { Address, maxUint256 } from 'viem'
import { useTransaction } from '@/providers/transaction'
import { useWriteContract } from 'wagmi'

type NewTransferAllowanceProps = {
  userAddress: string
  onGoBack: () => void
  onSuccess: () => void
}

export const NewTransferAllowance: FC<NewTransferAllowanceProps> = ({
  userAddress,
  onGoBack,
  onSuccess,
}) => {
  const { addTxPromise, isSubmittingTx } = useTransaction()
  const { writeContractAsync } = useWriteContract()

  const handleApprove = async () => {
    if (!addTxPromise || !writeContractAsync) {
      toast.error('Error')
      console.error('Missing evmAddress or addTxPromise')
      return
    }
    const tx = writeContractAsync(
      {
        account: userAddress as Address,
        address: ERC20_ADDRESS,
        abi: Erc20Abi,
        functionName: 'approve',
        args: [BRIDGE_ADDRESS, maxUint256],
      },
      {
        onSuccess: () => onSuccess(),
      }
    )
    addTxPromise(tx)
  }

  return (
    <CardFooter className="justify-between">
      <Button variant="ghost" onClick={onGoBack}>
        Go back
      </Button>
      <Button onClick={handleApprove} disabled={isSubmittingTx}>
        {isSubmittingTx ? 'Approving...' : 'Approve'}
      </Button>
    </CardFooter>
  )
}
