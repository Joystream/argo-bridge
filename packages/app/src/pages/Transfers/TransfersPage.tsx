import { FC } from 'react'
import { TransfersTable } from './TransfersTable'
import { Outlet } from 'react-router-dom'
import { useTransfersQuery } from '@/lib/hooks'
import { useSafeStore } from '@/providers/safe/safe.store'
import { usePendingOperatorCallsQuery } from '@/providers/safe/safe.hooks'

export const TransfersPage: FC = () => {
  const { data } = useTransfersQuery()

  const { safeApiKit } = useSafeStore()
  // prefetch pending safe operations
  usePendingOperatorCallsQuery(safeApiKit)

  return (
    <div>
      <TransfersTable transfers={data || []} />
      <Outlet />
    </div>
  )
}
