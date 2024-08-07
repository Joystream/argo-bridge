import { FC } from 'react'
import { ProposalsTable } from './ProposalsTable'
import { Outlet } from 'react-router-dom'
import { ProcessorStatusInfo } from '@/components/ProcessorStatusInfo'

export const ProposalsTab: FC = () => {
  return (
    <>
      <ProcessorStatusInfo title="Proposals" className="mb-4" />
      <ProposalsTable />
      <Outlet />
    </>
  )
}
