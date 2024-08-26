import { useSafeStore } from './safe.store'
import { EVM_NETWORK } from '@/config'
import { useUser } from '@/providers/user/user.hooks'
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { FC, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'

export const SafeManager: FC = () => {
  const { adminMulti, opMulti } = EVM_NETWORK
  const { userEvmAdmin, userEvmOperator } = useUser()
  const { connector } = useAccount()

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
    if (adminMulti && !adminSafePromise.current && userEvmAdmin && connector) {
      const setup = async () => {
        const safe = await Safe.init({
          provider: (await connector.getProvider()) as any,
          signer: userEvmAdmin,
          safeAddress: adminMulti.address,
        })
        setAdminSafe(safe)
        return safe
      }

      adminSafePromise.current = setup()
    }
  }, [adminMulti, userEvmAdmin])

  useEffect(() => {
    if (
      opMulti &&
      !operatorSafePromise.current &&
      userEvmOperator &&
      connector
    ) {
      const setup = async () => {
        const safe = await Safe.init({
          provider: (await connector.getProvider()) as any,
          signer: userEvmOperator,
          safeAddress: opMulti.address,
        })
        setOperatorSafe(safe)
        return safe
      }
      operatorSafePromise.current = setup()
    }
  }, [opMulti, userEvmOperator])

  return null
}
