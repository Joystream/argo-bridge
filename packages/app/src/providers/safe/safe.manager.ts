import { FC, useEffect, useRef } from 'react'
import { EVM_NETWORK } from '@/config'
import { useSafeStore } from './safe.store'
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { useUser } from '@/providers/user/user.hooks'

export const SafeManager: FC = () => {
  const { adminMulti, opMulti } = EVM_NETWORK
  const { userEvmAdmin, userEvmOperator } = useUser()

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
    if (adminMulti && !adminSafePromise.current && userEvmAdmin) {
      adminSafePromise.current = Safe.init({
        provider: window.ethereum,
        signer: userEvmAdmin,
        safeAddress: adminMulti.address,
      })
      adminSafePromise.current.then((safe) => {
        setAdminSafe(safe)
      })
    }
  }, [adminMulti, userEvmAdmin])

  useEffect(() => {
    if (opMulti && !operatorSafePromise.current && userEvmOperator) {
      operatorSafePromise.current = Safe.init({
        provider: window.ethereum,
        signer: userEvmOperator,
        safeAddress: opMulti.address,
      })
      operatorSafePromise.current.then((safe) => {
        setOperatorSafe(safe)
      })
    }
  }, [opMulti, userEvmOperator])

  return null
}
