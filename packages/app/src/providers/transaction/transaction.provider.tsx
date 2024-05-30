import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { CircleCheck, CircleX } from 'lucide-react'
import { useJoyWalletStore } from '@/providers/joyWallet/joyWallet.store'
import { ExtrinsicStatus, submitExtrinsic } from '@joystream/argo-core'

type TransactionContextType = {
  setTxForConfirmation: (
    tx: SubmittableExtrinsic<'promise'>,
    accountId: string
  ) => void
}

const TransactionContext = createContext<TransactionContextType>({
  setTxForConfirmation: () => {},
})

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [transaction, setTransaction] =
    useState<SubmittableExtrinsic<'promise'> | null>(null)
  const [transactionStatus, setTransactionStatus] =
    useState<ExtrinsicStatus | null>(null)
  const [accountId, setAccountId] = useState<string | null>(null)
  const [result, setResult] = useState<RawExtrinsicResult | null>(null)

  const setTxForConfirmation = useCallback(
    async (tx: SubmittableExtrinsic<'promise'>, accountId: string) => {
      setTransaction(tx)
      setAccountId(accountId)
    },
    []
  )

  const handleClose = () => {
    setTransaction(null)
    setTimeout(() => {
      setTransactionStatus(null)
      setAccountId(null)
      setResult(null)
    })
  }

  const handleContinue = async () => {
    if (!transaction || !accountId) {
      return
    }
    const signer = useJoyWalletStore.getState().wallet?.signer
    if (!signer) {
      console.error('No signer available')
      return
    }

    setTransactionStatus(ExtrinsicStatus.Unsigned)

    try {
      const result = await submitExtrinsic(
        transaction,
        accountId,
        signer,
        (status) => {
          setTransactionStatus(status)
        }
      )
      setResult(result)
      if (result.events.includes('system.ExtrinsicFailed')) {
        setTransactionStatus(ExtrinsicStatus.Error)
      } else {
        setTransactionStatus(ExtrinsicStatus.Completed)
      }
    } catch (error) {
      console.error('Error sending extrinsic:', error)
      setTransactionStatus(ExtrinsicStatus.Error)
    }
  }

  const renderTransactionStatus = () => {
    if (transactionStatus === ExtrinsicStatus.Signed) {
      return 'Waiting for confirmation...'
    }

    if (transactionStatus === ExtrinsicStatus.Completed) {
      return (
        <div>
          <h3 className="flex gap-2 text-green-600 items-center">
            <CircleCheck className="w-5 h-5" /> Success
          </h3>
          <a
            href={`https://joystream.subscan.io/extrinsic/${result?.transactionHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Subscan
          </a>
          <div>Events:</div>
          <ul>
            {result?.events.map((event, index) => <li key={index}>{event}</li>)}
          </ul>
        </div>
      )
    }

    if (transactionStatus === ExtrinsicStatus.Error) {
      return (
        <div>
          <h3 className="flex gap-2 text-destructive items-center">
            <CircleX className="w-5 h-5" /> Failed
          </h3>
          {result ? (
            <>
              <a
                href={`https://joystream.subscan.io/extrinsic/${result.transactionHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Subscan
              </a>
              <div>Events:</div>
              <ul>
                {result.events.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      )
    }

    return 'Waiting for signature...'
  }

  return (
    <TransactionContext.Provider value={{ setTxForConfirmation }}>
      <AlertDialog open={!!transaction}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm transaction</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Method
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {transaction?.method.section}.{transaction?.method.method}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Arguments
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* @ts-ignore */}
                  {JSON.stringify(transaction?.method.toHuman()?.args)}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Status
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {renderTransactionStatus()}
                </dd>
              </div>
            </dl>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleClose}
              disabled={transactionStatus === ExtrinsicStatus.Signed}
            >
              {!transactionStatus ? 'Cancel' : 'Close'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleContinue}
              disabled={
                !!transactionStatus &&
                transactionStatus !== ExtrinsicStatus.Error
              }
            >
              Sign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  const transactionContext = useContext(TransactionContext)

  if (transactionContext === null) {
    throw new Error(
      'useTransactionContext must be used within a TransactionProvider'
    )
  }

  return transactionContext
}
