import { useContext } from 'react'
import { TransactionContext } from './transaction.types'

export const useTransaction = () => {
  const transactionContext = useContext(TransactionContext)

  if (transactionContext === null) {
    throw new Error('useTransaction must be used within a TransactionProvider')
  }

  return transactionContext
}
