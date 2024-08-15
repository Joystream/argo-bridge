import { ProposalsTable } from './ProposalsTable'
import { ProcessorStatusInfo } from '@/components/ProcessorStatusInfo'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const ProposalsTab: FC = () => {
  return (
    <>
      <ProcessorStatusInfo title="Proposals" className="mb-4" />
      <ProposalsTable />
      <Outlet />
    </>
  )
}
