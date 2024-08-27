import { useSafeStore } from './safe.store'
import { EVM_NETWORK } from '@/config'
import { useUser } from '@/providers/user/user.hooks'
import SafeApiKit from '@safe-global/api-kit'
import Safe, { Eip1193Provider } from '@safe-global/protocol-kit'
import { FC, useEffect, useRef } from 'react'
import { useConnectorClient } from 'wagmi'

export const SafeManager: FC = () => {
  const { adminMulti, opMulti } = EVM_NETWORK
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

  useEffect(() => {
    if (
      adminMulti &&
      !adminSafePromise.current &&
      userEvmAdmin &&
      opConnector.data
    ) {
      const setup = async () => {
        const safe = await Safe.init({
          provider: opConnector.data as Eip1193Provider,
          signer: userEvmAdmin,
          safeAddress: adminMulti.address,
        })
        setAdminSafe(safe)
        return safe
      }

      adminSafePromise.current = setup()
    }
  }, [adminMulti, userEvmAdmin, opConnector])

  useEffect(() => {
    if (
      opMulti &&
      !operatorSafePromise.current &&
      userEvmOperator &&
      adminConnector.data
    ) {
      const setup = async () => {
        const safe = await Safe.init({
          provider: adminConnector.data as Eip1193Provider,
          signer: userEvmOperator,
          safeAddress: opMulti.address,
        })
        setOperatorSafe(safe)
        return safe
      }
      operatorSafePromise.current = setup()
    }
  }, [opMulti, userEvmOperator, adminConnector])

  return null
}
