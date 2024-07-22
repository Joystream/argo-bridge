import { FC } from 'react'
import { ProposeAdminAction } from './new-proposal/ProposeAdminAction'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BridgeStatusTab } from './BridgeStatusTab'
import { useEvmProposalsQuery } from '@/lib/hooks'
import { ProposalsTab } from './proposals/ProposalsTab'
import { Outlet } from 'react-router-dom'

export const GovernancePage: FC = () => {
  // preload proposals
  useEvmProposalsQuery()

  return (
    <>
      <Tabs defaultValue="status" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="status">Bridge status</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="new-proposal">Submit proposal</TabsTrigger>
        </TabsList>
        <TabsContent value="status">
          <BridgeStatusTab />
        </TabsContent>
        <TabsContent value="proposals">
          <ProposalsTab />
        </TabsContent>
        <TabsContent value="new-proposal">
          <ProposeAdminAction />
        </TabsContent>
      </Tabs>
      <Outlet />
    </>
  )
}
