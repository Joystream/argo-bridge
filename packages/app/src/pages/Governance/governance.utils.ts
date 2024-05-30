import { useReadContract, useWriteContract } from 'wagmi'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useTransaction } from '@/providers/transaction'
import { Address, bytesToHex, Hex, zeroHash } from 'viem'
import { useCallback } from 'react'
import { toast } from 'sonner'

export const useScheduleCall = () => {
  const { writeContractAsync } = useWriteContract()
  const { data: timelockMinDelay } = useReadContract({
    abi: TimelockAbi,
    address: TIMELOCK_ADDRESS,
    functionName: 'getMinDelay',
  })
  const { addTxPromise } = useTransaction()

  const scheduleCall = useCallback(
    async (target: Address, calldata: Hex) => {
      if (timelockMinDelay == null || !addTxPromise) {
        toast.error('Timelock min delay not available')
        return
      }

      const saltBytes = crypto.getRandomValues(new Uint8Array(32))
      const writePromise = writeContractAsync(
        {
          abi: TimelockAbi,
          address: TIMELOCK_ADDRESS,
          functionName: 'schedule',
          args: [
            target,
            0n,
            calldata,
            zeroHash,
            bytesToHex(saltBytes),
            timelockMinDelay,
          ],
        },
        {
          onSettled: (data, error) => {
            if (error) {
              console.error('Error:', error)
            } else {
              console.log('Data:', data)
            }
          },
        }
      )
      addTxPromise(writePromise)
    },
    [timelockMinDelay, addTxPromise]
  )

  return scheduleCall
}
