import { GovernancePage } from '@/pages/Governance/Governance'
import { TransfersPage } from '@/pages/Transfers'
import { NewTransferPage } from '@/pages/NewTransfer'

export const ROUTES = [
  {
    path: '/new',
    element: <NewTransferPage />,
    name: 'New transfer',
  },
  {
    path: '/',
    element: <TransfersPage />,
    name: 'Transfers',
  },
  {
    path: '/governance',
    element: <GovernancePage />,
    name: 'Governance',
  },
]
