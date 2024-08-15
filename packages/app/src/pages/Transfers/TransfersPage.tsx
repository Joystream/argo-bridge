import { TransfersTable } from './TransfersTable'
import { ProcessorStatusInfo } from '@/components/ProcessorStatusInfo'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'
import { useSafeStore } from '@/providers/safe/safe.store'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

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
