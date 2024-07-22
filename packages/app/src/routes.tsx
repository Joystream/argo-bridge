import { GovernancePage } from '@/pages/Governance/GovernancePage'
import { TransfersPage } from '@/pages/Transfers'
import { NewTransferPage } from '@/pages/NewTransfer'
import { RouteObject } from 'react-router-dom'
import { TransferDetails } from '@/pages/Transfers/TransferDetails'
import { ProposalDetails } from '@/pages/Governance/proposals/ProposalDetails'

export const ROUTES: (RouteObject & { name: string; path: string })[] = [
  {
    path: '/',
    element: <NewTransferPage />,
    name: 'New transfer',
  },
  {
    path: '/transfers',
    element: <TransfersPage />,
    name: 'Transfers',
    children: [
      {
        path: ':id',
        element: <TransferDetails />,
      },
    ],
  },
  {
    path: '/governance',
    element: <GovernancePage />,
    name: 'Governance',
    children: [
      {
        path: 'proposals/:id',
        element: <ProposalDetails />,
      },
    ],
  },
]
