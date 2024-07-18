import { TimelockOperation } from './TimelockOperation'
import { EvmTimelockOperationOrderByInput } from '@/gql/graphql'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { FC } from 'react'
import { ARGO_INDEXER_URL } from '@/config'
import { getTimelockOperationsQueryDocument } from '@/queries/timelockOperations'
import { PendingAdminSafeTransactions } from './PendingAdminSafeTransactions'
import { ProposeAdminAction } from './proposals/ProposeAdminAction'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BridgeStatusTab } from '@/pages/Governance/BridgeStatusTab'

export const GovernancePage: FC = () => {
  const { data } = useQuery({
    queryKey: ['timelockCalls'],
    queryFn: async () =>
      request(ARGO_INDEXER_URL, getTimelockOperationsQueryDocument, {
        orderBy: EvmTimelockOperationOrderByInput.CreatedAtBlockDesc,
      }),
  })

  return (
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
        <PendingAdminSafeTransactions />
        {(data ? data.evmTimelockOperations : []).map((operation) => (
          <TimelockOperation key={operation.id} operation={operation} />
        ))}
      </TabsContent>
      <TabsContent value="new-proposal">
        <ProposeAdminAction />
      </TabsContent>
    </Tabs>
  )
}
