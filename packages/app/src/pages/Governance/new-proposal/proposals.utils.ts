import { EVM_NETWORK, TIMELOCK_ADDRESS } from '@/config'
import { useSafeStore } from '@/providers/safe/safe.store'
import { useTransaction } from '@/providers/transaction'
import { useUser } from '@/providers/user/user.hooks'
import { TimelockAbi } from '@joystream/argo-core'
import {
  MetaTransactionData,
  OperationType,
} from '@safe-global/safe-core-sdk-types'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { Address, Hex, bytesToHex, encodeFunctionData, zeroHash } from 'viem'
import { useReadContract } from 'wagmi'

type Call = {
  target: Address
  calldata: Hex
}

export const useProposeCall = () => {
  const { data: timelockMinDelay } = useReadContract({
    abi: TimelockAbi,
    address: TIMELOCK_ADDRESS,
    functionName: 'getMinDelay',
  })
  const { userEvmAdmin } = useUser()
  const { addTxPromise } = useTransaction()
  const { adminSafe, safeApiKit } = useSafeStore()

  return useCallback(
    async (calls: Call[]) => {
      const safeAddress = EVM_NETWORK.adminMulti?.address

      if (
        timelockMinDelay == null ||
        !addTxPromise ||
        !calls.length ||
        !safeAddress ||
        !userEvmAdmin ||
        !adminSafe ||
        !safeApiKit
      ) {
        toast.error('Unexpected error')
        console.error({
          timelockMinDelay,
          addTxPromise,
          calls,
          safeAddress,
          userEvmAdmin,
          adminSafe,
          safeApiKit,
        })
        return
      }

      const doScheduleCall = async () => {
        const saltBytes = crypto.getRandomValues(new Uint8Array(32))

        const calldata = encodeFunctionData({
          abi: TimelockAbi,
          functionName: calls.length > 1 ? 'scheduleBatch' : 'schedule',
          args:
            calls.length > 1
              ? [
                  calls.map((call) => call.target),
                  calls.map(() => 0n),
                  calls.map((call) => call.calldata),
                  zeroHash,
                  bytesToHex(saltBytes),
                  timelockMinDelay,
                ]
              : [
                  calls[0].target,
                  0n,
                  calls[0].calldata,
                  zeroHash,
                  bytesToHex(saltBytes),
                  timelockMinDelay,
                ],
        })

        const safeTransactionData: MetaTransactionData = {
          to: TIMELOCK_ADDRESS,
          value: '0',
          operation: OperationType.Call,
          data: calldata,
        }
        const safeTransaction = await adminSafe.createTransaction({
          transactions: [safeTransactionData],
          options: {
            nonce: await safeApiKit.getNextNonce(safeAddress),
          },
        })
        const safeTxHash = await adminSafe.getTransactionHash(safeTransaction)
        const signature = await adminSafe.signHash(safeTxHash)

        await safeApiKit.proposeTransaction({
          safeAddress,
          safeTransactionData: safeTransaction.data,
          safeTxHash,
          senderAddress: userEvmAdmin,
          senderSignature: signature.data,
        })
      }

      addTxPromise(doScheduleCall())
    },
    [timelockMinDelay, addTxPromise],
  )
}
