import { FC } from 'react'
import { ProposalsTable } from './ProposalsTable'
import { Outlet } from 'react-router-dom'

export const ProposalsTab: FC = () => {
  return (
    <>
      <ProposalsTable />
      <Outlet />
    </>
  )
}
