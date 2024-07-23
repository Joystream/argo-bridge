import { FC, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEvmProposalsQuery } from '@/lib/hooks'

export const GovernancePage: FC = () => {
  // preload proposals
  useEvmProposalsQuery()

  const [tab, setTab] = useState('status')
  const location = useLocation()

  // sync selected tab with location changes
  useEffect(() => {
    const targetTab = location.pathname.split('/')[2]
    if (targetTab !== tab) setTab(targetTab)
  }, [location.pathname, tab])

  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger asChild value="status">
            <NavLink to="status">Bridge status</NavLink>
          </TabsTrigger>
          <TabsTrigger asChild value="proposals">
            <NavLink to="proposals">Proposals</NavLink>
          </TabsTrigger>
          <TabsTrigger asChild value="new-proposal">
            <NavLink to="new-proposal">Submit proposal</NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
    </>
  )
}
