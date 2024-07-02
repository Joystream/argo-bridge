import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import { create } from 'zustand'

type SafeStoreState = {
  safeApiKit: SafeApiKit | null
  adminSafe: Safe | null
  operatorSafe: Safe | null
}

type SafeStoreAction = {
  setSafeApiKit: (safeApiKit: SafeApiKit) => void
  setAdminSafe: (adminSafe: Safe) => void
  setOperatorSafe: (operatorSafe: Safe) => void
}

export const useSafeStore = create<SafeStoreState & SafeStoreAction>((set) => ({
  safeApiKit: null,
  adminSafe: null,
  operatorSafe: null,
  setSafeApiKit: (safeApiKit) => set({ safeApiKit }),
  setAdminSafe: (adminSafe) => set({ adminSafe }),
  setOperatorSafe: (operatorSafe) => set({ operatorSafe }),
}))
