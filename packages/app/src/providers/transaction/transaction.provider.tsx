import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { useJoyWalletStore } from '@/providers/joyWallet/joyWallet.store'
import { submitExtrinsic } from '@joystream/argo-core'
import { useJoyApiContext } from '@/providers/joyApi'
import { toast } from 'sonner'
import { SubmitJoyTx, TransactionContext } from './transaction.types'
import { Account, BaseWallet } from '@polkadot-onboard/core'
import { JOY_NETWORK } from '@/config'

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { api: joyApi } = useJoyApiContext()

  const selectedJoyAccountRef = useRef<Account | null>(null)
  useEffect(() => {
    const unsub = useJoyWalletStore.subscribe((s) => {
      selectedJoyAccountRef.current = s.selectedAccount
    })
    return () => unsub()
  }, [])

  const addTxPromise = useCallback(async (txPromise: Promise<unknown>) => {
    txPromise.catch((e) => {
      console.error('Error sending transaction:', e)
    })
    toast.promise(txPromise, {
      loading: 'Sending transaction...',
      success: 'Transaction sent',
      error: 'Failed to send transaction',
    })
  }, [])

  const submitJoyTx = useCallback<SubmitJoyTx>(
    async (buildTx, sender) => {
      if (!joyApi) {
        toast.error('joyApi not available')
        return
      }
      if (!sender) {
        if (!selectedJoyAccountRef.current) {
          toast.error('No sender account selected')
          return
        }
        sender = selectedJoyAccountRef.current.address
      }

      const signer = useJoyWalletStore.getState().wallet?.signer
      if (!signer) {
        toast.error('No signer available')
        return
      }

      try {
        const tx = await buildTx(joyApi)
        const submitPromise = submitExtrinsic(
          tx,
          sender,
          JOY_NETWORK.rpc.url,
          signer
        )
        addTxPromise(submitPromise)
        // @ts-ignore
        const txInfo = `${tx.method.section}.${tx.method.method}(${JSON.stringify(tx.method.toHuman()?.args)})`
        console.log(`Sending transaction: ${txInfo}`)

        return submitPromise
      } catch (error) {
        toast.error('Failed to send transaction')
        console.error('Error sending extrinsic:', error)
      }
    },
    [joyApi]
  )

  const contextValue = {
    addTxPromise,
    submitJoyTx: joyApi ? submitJoyTx : undefined,
  }

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  )
}

// export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
//   const [transaction, setTransaction] =
//     useState<SubmittableExtrinsic<'promise'> | null>(null)
//   const [transactionStatus, setTransactionStatus] =
//     useState<ExtrinsicStatus | null>(null)
//   const [accountId, setAccountId] = useState<string | null>(null)
//   const [result, setResult] = useState<RawExtrinsicResult | null>(null)
//
//   const setTxForConfirmation = useCallback(
//     async (tx: SubmittableExtrinsic<'promise'>, accountId: string) => {
//       setTransaction(tx)
//       setAccountId(accountId)
//     },
//     []
//   )
//
//   const handleClose = () => {
//     setTransaction(null)
//     setTimeout(() => {
//       setTransactionStatus(null)
//       setAccountId(null)
//       setResult(null)
//     })
//   }
//
//   const handleContinue = async () => {
//     if (!transaction || !accountId) {
//       return
//     }
//     const signer = useJoyWalletStore.getState().wallet?.signer
//     if (!signer) {
//       console.error('No signer available')
//       return
//     }
//
//     setTransactionStatus(ExtrinsicStatus.Unsigned)
//
//     try {
//       const result = await submitExtrinsic(
//         transaction,
//         accountId,
//         signer,
//         (status) => {
//           setTransactionStatus(status)
//         }
//       )
//       setResult(result)
//       if (result.events.includes('system.ExtrinsicFailed')) {
//         setTransactionStatus(ExtrinsicStatus.Error)
//       } else {
//         setTransactionStatus(ExtrinsicStatus.Completed)
//       }
//     } catch (error) {
//       console.error('Error sending extrinsic:', error)
//       setTransactionStatus(ExtrinsicStatus.Error)
//     }
//   }
//
//   const renderTransactionStatus = () => {
//     if (transactionStatus === ExtrinsicStatus.Signed) {
//       return 'Waiting for confirmation...'
//     }
//
//     if (transactionStatus === ExtrinsicStatus.Completed) {
//       return (
//         <div>
//           <h3 className="flex gap-2 text-green-600 items-center">
//             <CircleCheck className="w-5 h-5" /> Success
//           </h3>
//           <a
//             href={`https://joystream.subscan.io/extrinsic/${result?.transactionHash}`}
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-600 underline"
//           >
//             Subscan
//           </a>
//           <div>Events:</div>
//           <ul>
//             {result?.events.map((event, index) => <li key={index}>{event}</li>)}
//           </ul>
//         </div>
//       )
//     }
//
//     if (transactionStatus === ExtrinsicStatus.Error) {
//       return (
//         <div>
//           <h3 className="flex gap-2 text-destructive items-center">
//             <CircleX className="w-5 h-5" /> Failed
//           </h3>
//           {result ? (
//             <>
//               <a
//                 href={`https://joystream.subscan.io/extrinsic/${result.transactionHash}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 Subscan
//               </a>
//               <div>Events:</div>
//               <ul>
//                 {result.events.map((event, index) => (
//                   <li key={index}>{event}</li>
//                 ))}
//               </ul>
//             </>
//           ) : null}
//         </div>
//       )
//     }
//
//     return 'Waiting for signature...'
//   }
//
//   return (
//     <TransactionContext.Provider value={{ setTxForConfirmation }}>
//       <AlertDialog open={!!transaction}>
//         <AlertDialogContent className="max-w-xl">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Confirm transaction</AlertDialogTitle>
//           </AlertDialogHeader>
//           <div className="mt-6 border-t border-gray-100">
//             <dl className="divide-y divide-gray-100">
//               <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Method
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {transaction?.method.section}.{transaction?.method.method}
//                 </dd>
//               </div>
//               <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Arguments
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {/* @ts-ignore */}
//                   {JSON.stringify(transaction?.method.toHuman()?.args)}
//                 </dd>
//               </div>
//               <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-900">
//                   Status
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
//                   {renderTransactionStatus()}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//           <AlertDialogFooter>
//             <AlertDialogCancel
//               onClick={handleClose}
//               disabled={transactionStatus === ExtrinsicStatus.Signed}
//             >
//               {!transactionStatus ? 'Cancel' : 'Close'}
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleContinue}
//               disabled={
//                 !!transactionStatus &&
//                 transactionStatus !== ExtrinsicStatus.Error
//               }
//             >
//               Sign
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       {children}
//     </TransactionContext.Provider>
//   )
// }
