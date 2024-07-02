import { FC } from 'react'
import { useSafeStore } from '@/providers/safe/safe.store'
import { useQuery } from '@tanstack/react-query'
import { EVM_NETWORK } from '@/config'
import { SafeMultisigTransactionResponse } from '@safe-global/safe-core-sdk-types'
import { TypographyH3 } from '@/components/ui/typography'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AddressLabel } from '@/components/AddressLabel'
import { decodeCall } from '@joystream/argo-core'
import { useTransaction } from '@/providers/transaction'

export const PendingAdminSafeTransactions: FC = () => {
  const { safeApiKit } = useSafeStore()

  const { data } = useQuery({
    queryKey: ['pendingAdminCalls'],
    queryFn: async () => {
      return safeApiKit?.getPendingTransactions(
        EVM_NETWORK.adminMulti?.address || ''
      )
    },
    enabled: !!safeApiKit && !!EVM_NETWORK.adminMulti,
  })

  return (
    <div>
      <TypographyH3>Pending admin multisig transactions</TypographyH3>
      <div className="pt-4">
        {data?.results.map((transaction) => (
          <PendingAdminSafeTransaction
            key={transaction.safeTxHash}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  )
}

const PendingAdminSafeTransaction: FC<{
  transaction: SafeMultisigTransactionResponse
}> = ({ transaction }) => {
  const { safeApiKit, adminSafe } = useSafeStore()
  const { addTxPromise } = useTransaction()

  const confirmations = transaction.confirmations?.length ?? 0
  const requiredConfirmations = transaction.confirmationsRequired

  const handleConfirm = async () => {
    if (!adminSafe) return

    const signature = await adminSafe.signHash(transaction.safeTxHash)
    await safeApiKit?.confirmTransaction(transaction.safeTxHash, signature.data)
  }

  const handleExecute = async () => {
    if (!adminSafe) return
    const txPromise = adminSafe
      .executeTransaction(transaction)
      .then((executeTxResponse) =>
        // @ts-ignore
        executeTxResponse.transactionResponse?.wait?.()
      )
    addTxPromise?.(txPromise)
  }

  const [decodedFnName, decodedArgs] = decodeCall(
    EVM_NETWORK,
    transaction.to,
    transaction.data || '0x'
  )

  const decodedCalls = []
  if (decodedFnName === 'schedule' && decodedArgs) {
    const [decodedCallFnName, decodedCallArgs] = decodeCall(
      EVM_NETWORK,
      decodedArgs[0],
      decodedArgs[2] || '0x'
    )
    decodedCalls.push({
      target: decodedArgs[0],
      value: decodedArgs[1],
      callFn: decodedCallFnName,
      callArgs: decodedCallArgs,
      formatted: `${decodedCallFnName}(${decodedCallArgs?.join(', ')})`,
    })
  } else if (decodedFnName === 'scheduleBatch' && decodedArgs) {
    for (let i = 0; i < decodedArgs[0].length; i++) {
      const [decodedCallFnName, decodedCallArgs] = decodeCall(
        EVM_NETWORK,
        decodedArgs[0][i],
        decodedArgs[2][i] || '0x'
      )
      decodedCalls.push({
        target: decodedArgs[0][i],
        value: decodedArgs[1][i],
        callFn: decodedCallFnName,
        callArgs: decodedCallArgs,
        formatted: `${decodedCallFnName}(${decodedCallArgs?.join(', ')})`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction #{transaction.nonce}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-1">
        <p>Transaction hash: {transaction.safeTxHash}</p>
        <p>Required confirmations: {requiredConfirmations}</p>
        <div>
          Current confirmations ({confirmations}):
          <ol className="list-decimal list-inside">
            {transaction.confirmations?.map((confirmation) => (
              <li key={confirmation.owner}>{confirmation.owner}</li>
            ))}
          </ol>
        </div>
        <div>
          Transaction target: <AddressLabel address={transaction.to} />
        </div>
        {decodedCalls.length > 0 ? (
          <div>
            Proposed timelock calls:
            <ol className="list-decimal list-inside">
              {decodedCalls.map((call, index) => (
                <li key={index}>
                  <div>
                    Call target: <AddressLabel address={call.target} />
                  </div>
                  <div className="">
                    Call: <pre>{call.formatted}</pre>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        {confirmations < requiredConfirmations && (
          <Button variant="outline" onClick={handleConfirm}>
            Confirm
          </Button>
        )}
        {confirmations >= requiredConfirmations && (
          <Button onClick={handleExecute}>Execute</Button>
        )}
      </CardFooter>
    </Card>
  )
}
