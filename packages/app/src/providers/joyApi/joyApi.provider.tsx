import * as types from '@joystream/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { JOY_NETWORK } from '@/config'

type JoyApiContextType = {
  api: ApiPromise | null
  apiAt: (
    blockNumber: number
  ) => Promise<Awaited<ReturnType<ApiPromise['at']>> | null>
}
export const JoyApiContext = createContext<JoyApiContextType>({
  api: null,
  apiAt: async () => null,
})

export const JoyApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, setApi] = useState<ApiPromise | null>(null)

  useEffect(() => {
    const setupApi = async () => {
      const provider = new WsProvider(JOY_NETWORK.rpc.url)
      const api = await ApiPromise.create({ provider })

      setApi(api)
    }

    setupApi()
  }, [])

  const apiAt = useCallback(
    async (blockNumber: number) => {
      if (!api) return null
      const hash = await api.rpc.chain.getBlockHash(blockNumber)
      return await api.at(hash)
    },
    [api]
  )

  return (
    <JoyApiContext.Provider value={{ api, apiAt }}>
      {children}
    </JoyApiContext.Provider>
  )
}

export const useJoyApiContext = () => {
  const apiContext = useContext(JoyApiContext)

  if (apiContext === null) {
    throw new Error('useApiContext must be used within a ApiProvider')
  }

  return apiContext
}
