import { useReadContract, useWriteContract } from 'wagmi'
import { TimelockAbi } from '@joystream/argo-core'
import { TIMELOCK_ADDRESS } from '@/config'
import { useTransaction } from '@/providers/transaction'
import { Address, bytesToHex, Hex, zeroHash } from 'viem'
import { useCallback } from 'react'
import { toast } from 'sonner'

type Call = {
  target: Address
  calldata: Hex
}

export const useScheduleCall = () => {
  const { writeContractAsync } = useWriteContract()
  const { data: timelockMinDelay } = useReadContract({
    abi: TimelockAbi,
    address: TIMELOCK_ADDRESS,
    functionName: 'getMinDelay',
  })
  const { addTxPromise } = useTransaction()

  const scheduleCall = useCallback(
    async (calls: Call[]) => {
      if (timelockMinDelay == null || !addTxPromise || !calls.length) {
        toast.error('Timelock min delay not available')
        return
      }

      const saltBytes = crypto.getRandomValues(new Uint8Array(32))

      let writePromise: Promise<Hex>
      if (calls.length > 1) {
        writePromise = writeContractAsync(
          {
            abi: TimelockAbi,
            address: TIMELOCK_ADDRESS,
            functionName: 'scheduleBatch',
            args: [
              calls.map((call) => call.target),
              calls.map(() => 0n),
              calls.map((call) => call.calldata),
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
      } else {
        writePromise = writeContractAsync(
          {
            abi: TimelockAbi,
            address: TIMELOCK_ADDRESS,
            functionName: 'schedule',
            args: [
              calls[0].target,
              0n,
              calls[0].calldata,
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
      }
      addTxPromise(writePromise)
    },
    [timelockMinDelay, addTxPromise]
  )

  return scheduleCall
}
