import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type SettingsStoreState = {
  isSettingsOpen: boolean
  joyUsdRate: number
  termLength: number
}

type SettingsStoreActions = {
  setSettingsOpen: (isOpen: boolean) => void
  setJoyUsdRate: (rate: number) => void
  setTermLength: (term: number) => void
}

export const useSettingsStore = create<
  SettingsStoreState & SettingsStoreActions
>()(
  persist(
    immer((set) => ({
      isSettingsOpen: false,
      joyUsdRate: 0.022,
      termLength: 403200,
      setSettingsOpen: (isOpen: boolean) => {
        set((state) => {
          state.isSettingsOpen = isOpen
        })
      },
      setJoyUsdRate: (rate: number) => {
        set((state) => {
          state.joyUsdRate = rate
        })
      },
      setTermLength: (term: number) => {
        set((state) => {
          state.termLength = term
        })
      },
    })),
    {
      name: 'joyutils-settings',
      partialize: (s) => ({
        joyUsdRate: s.joyUsdRate,
        termLength: s.termLength,
      }),
    }
  )
)
