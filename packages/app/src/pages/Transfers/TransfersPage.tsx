import { FC } from 'react'
import { TransfersTable } from './TransfersTable'
import { Outlet } from 'react-router-dom'
import { useSafeStore } from '@/providers/safe/safe.store'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'
import { ProcessorStatusInfo } from '@/components/ProcessorStatusInfo'

export const TransfersPage: FC = () => {
  const { safeApiKit } = useSafeStore()
  // prefetch pending safe operations
  usePendingOperatorCallsQuery(safeApiKit)

  return (
    <div>
      <ProcessorStatusInfo title="Transfers" />
      <TransfersTable />
      <Outlet />
    </div>
  )
}
