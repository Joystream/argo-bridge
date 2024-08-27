import { useSafeStore } from './safe.store'
import { EVM_NETWORK } from '@/config'
import { useUser } from '@/providers/user/user.hooks'
import SafeApiKit from '@safe-global/api-kit'
import Safe, { Eip1193Provider } from '@safe-global/protocol-kit'
import { FC, useEffect, useRef } from 'react'
import { useConnectorClient } from 'wagmi'

export const SafeManager: FC = () => {
  const { adminMulti: adminMultiConfig, opMulti: opMultiConfig } = EVM_NETWORK
  const { userEvmAdmin, userEvmOperator } = useUser()
  const opConnector = useConnectorClient({
    account: userEvmOperator || undefined,
    query: {
      enabled: !!userEvmOperator,
    },
  })
  const adminConnector = useConnectorClient({
    account: userEvmAdmin || undefined,
    query: {
      enabled: !!userEvmAdmin,
    },
  })

  const { safeApiKit, setOperatorSafe, setAdminSafe, setSafeApiKit } =
    useSafeStore()

  const operatorSafePromise = useRef<Promise<Safe> | null>(null)
  const adminSafePromise = useRef<Promise<Safe> | null>(null)

  useEffect(() => {
    if (safeApiKit) return

    const apiKit = new SafeApiKit({
      chainId: BigInt(EVM_NETWORK.chainId),
    })
    setSafeApiKit(apiKit)
  }, [safeApiKit])

  // setup admin safe
  useEffect(() => {
    if (
      !adminMultiConfig ||
      adminSafePromise.current ||
      !userEvmAdmin ||
      !adminConnector.data
    ) {
      console.log('cant init admin safe', {
        adminMultiConfig,
        adminSafePromise: adminSafePromise.current,
        userEvmAdmin,
        adminConnector: adminConnector.data,
      })
      return
    }

    const setup = async () => {
      const safe = await Safe.init({
        provider: adminConnector.data as Eip1193Provider,
        signer: userEvmAdmin,
        safeAddress: adminMultiConfig.address,
      })
      setAdminSafe(safe)
      console.log('admin safe inited', safe)
      return safe
    }

    adminSafePromise.current = setup()
  }, [adminMultiConfig, userEvmAdmin, adminConnector.data])

  // setup operator safe
  useEffect(() => {
    if (
      !opMultiConfig ||
      operatorSafePromise.current ||
      !userEvmOperator ||
      !opConnector.data
    ) {
      console.log('cant init operator safe', {
        opMultiConfig,
        operatorSafePromise: operatorSafePromise.current,
        userEvmOperator,
        opConnector: opConnector.data,
      })
      return
    }

    const setup = async () => {
      const safe = await Safe.init({
        provider: opConnector.data as Eip1193Provider,
        signer: userEvmOperator,
        safeAddress: opMultiConfig.address,
      })
      setOperatorSafe(safe)
      console.log('operator safe inited', safe)
      return safe
    }
    operatorSafePromise.current = setup()
  }, [opMultiConfig, userEvmOperator, opConnector.data])

  return null
}
