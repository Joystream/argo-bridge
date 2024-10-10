import { EvmBridgeCard } from './EvmBridgeCard'
import { JoyBridgeCard } from './JoyBridgeCard'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { FC } from 'react'

export const BridgeStatusTab: FC = () => {
  const { data: configsData, refetch: refetchConfigs } = useBridgeConfigs()
  const joyConfig = configsData?.joy
  const evmConfig = configsData?.evm

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] gap-6">
      <JoyBridgeCard joyConfig={joyConfig} refetchConfigs={refetchConfigs} />
      <EvmBridgeCard evmConfig={evmConfig} refetchConfigs={refetchConfigs} />
    </div>
  )
}
