import { useJoyWallets } from '@/providers/joyWallet'
import { useAccount } from 'wagmi'
import { useBridgeConfigs } from '@/lib/bridgeConfig'
import { EVM_NETWORK, JOY_NETWORK } from '@/config'
import { useMemo } from 'react'

export const useUser = () => {
  const { walletAccounts: joyAccounts } = useJoyWallets()
  const { addresses: evmAddresses } = useAccount()
  const joyAddresses = useMemo(
    () => joyAccounts?.map(({ address }) => address),
    [joyAccounts]
  )
  const joyLookup = joyAddresses?.reduce(
    (acc, address) => ({ ...acc, [address]: true }),
    {} as Record<string, boolean>
  )
  const evmLookup = evmAddresses?.reduce(
    // all evm addresses from indexer will be lowercase
    (acc, address) => ({
      ...acc,
      [address.toLowerCase()]: true,
      [address]: true,
    }),
    {} as Record<string, boolean>
  )

  const { data: configsData } = useBridgeConfigs()
  const evmConfig = configsData?.evm
  const joyConfig = configsData?.joy

  let userJoyOperator: string | false = false
  if (JOY_NETWORK.opMulti) {
    userJoyOperator =
      JOY_NETWORK.opMulti.signers.find((signer) => joyLookup[signer]) || false
  } else if (joyConfig) {
    userJoyOperator =
      joyAddresses.find((address) => address === joyConfig.operatorAccount) ||
      false
  }

  const userJoyPauser: string | false =
    joyConfig?.pauserAccounts.find((pauser) => joyLookup[pauser]) || false

  let userEvmAdmin: string | false = false
  if (EVM_NETWORK.adminMulti) {
    userEvmAdmin =
      EVM_NETWORK.adminMulti.signers.find((signer) => evmLookup?.[signer]) ||
      false
  } else if (evmConfig) {
    userEvmAdmin =
      evmConfig.timelockAdminAccounts.find((admin) => evmLookup?.[admin]) ||
      false
  }

  let userEvmOperator: string | false = false
  if (EVM_NETWORK.opMulti) {
    userEvmOperator =
      EVM_NETWORK.opMulti.signers.find((signer) => evmLookup?.[signer]) || false
  } else if (evmConfig) {
    userEvmOperator =
      evmConfig.bridgeOperatorAccounts.find(
        (operator) => evmLookup?.[operator]
      ) || false
  }

  const userEvmPauser =
    evmConfig?.pauserAccounts.find((pauser) => evmLookup?.[pauser]) || false

  return {
    userJoyOperator,
    userJoyPauser,
    userEvmAdmin,
    userEvmOperator,
    userEvmPauser,
    joyAddresses,
    evmAddresses,
  }
}
