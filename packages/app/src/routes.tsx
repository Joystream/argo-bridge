import { GovernancePage } from '@/pages/Governance/Governance'
import { TransfersPage } from '@/pages/Transfers'
import { NewTransferPage } from '@/pages/NewTransfer'

export const ROUTES = [
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
  {
    path: '/new',
    element: <NewTransferPage />,
    name: 'New transfer',
  },
]
