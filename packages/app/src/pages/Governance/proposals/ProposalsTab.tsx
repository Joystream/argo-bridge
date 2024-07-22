import { FC } from 'react'
import { useEvmProposalsQuery } from '@/lib/hooks'
import { ProposalsTable } from './ProposalsTable'

export const ProposalsTab: FC = () => {
  return <ProposalsTable />
}
