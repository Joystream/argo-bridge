import { TransactionContext } from './transaction.types'
import { useContext } from 'react'

export const useTransaction = () => {
  const transactionContext = useContext(TransactionContext)

  if (transactionContext === null) {
    throw new Error('useTransaction must be used within a TransactionProvider')
  }

  return transactionContext
}
