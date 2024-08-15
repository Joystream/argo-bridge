import { FAQPage } from '@/pages/FAQPage'
import { BridgeStatusTab } from '@/pages/Governance/BridgeStatusTab'
import { GovernancePage } from '@/pages/Governance/GovernancePage'
import { NewProposalTab } from '@/pages/Governance/new-proposal/NewProposalTab'
import { ProposalDetails } from '@/pages/Governance/proposals/ProposalDetails'
import { ProposalsTab } from '@/pages/Governance/proposals/ProposalsTab'
import { NewTransferPage } from '@/pages/NewTransfer'
import { TransfersPage } from '@/pages/Transfers'
import { TransferDetails } from '@/pages/Transfers/TransferDetails'
import { RouteObject } from 'react-router-dom'
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
  {
    path: 'faq',
    element: <FAQPage />,
    name: 'FAQ',
  },
]
