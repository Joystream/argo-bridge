import { GovernancePage } from '@/pages/Governance/GovernancePage'
import { TransfersPage } from '@/pages/Transfers'
import { NewTransferPage } from '@/pages/NewTransfer'
import { RouteObject } from 'react-router-dom'
import { TransferDetails } from '@/pages/Transfers/TransferDetails'
import { ProposalDetails } from '@/pages/Governance/proposals/ProposalDetails'
import { BridgeStatusTab } from '@/pages/Governance/BridgeStatusTab'
import { ProposalsTab } from '@/pages/Governance/proposals/ProposalsTab'
import { NewProposalTab } from '@/pages/Governance/new-proposal/NewProposalTab'
import { Navigate } from 'react-router-dom'

export const ROUTES: (RouteObject & { name: string; path: string })[] = [
  {
    path: '',
    element: <NewTransferPage />,
    name: 'New transfer',
  },
  {
    path: 'transfers',
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
    path: 'governance',
    element: <GovernancePage />,
    name: 'Governance',
    children: [
      {
        path: 'status',
        element: <BridgeStatusTab />,
      },
      {
        path: 'proposals',
        element: <ProposalsTab />,
        children: [
          {
            path: ':id',
            element: <ProposalDetails />,
          },
        ],
      },
      {
        path: 'new-proposal',
        element: <NewProposalTab />,
      },
      {
        index: true,
        element: <Navigate to="status" replace />,
      },
    ],
  },
]
