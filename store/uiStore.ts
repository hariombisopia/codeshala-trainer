import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Settings
  trainerName: string
  instituteName: string
  theme: 'dark' | 'light' | 'system'
  projectorFontSize: 'large' | 'xlarge' | 'massive'
  timerAlertsEnabled: boolean
  soundEnabled: boolean

  // UI state
  sidebarOpen: boolean
  dontForgetModalOpen: boolean

  // Actions
  setTrainerName: (name: string) => void
  setInstituteName: (name: string) => void
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  setProjectorFontSize: (size: 'large' | 'xlarge' | 'massive') => void
  setTimerAlertsEnabled: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setSidebarOpen: (open: boolean) => void
  setDontForgetModalOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      trainerName: 'Coach',
      instituteName: 'CodeShala',
      theme: 'dark',
      projectorFontSize: 'large',
      timerAlertsEnabled: true,
      soundEnabled: false,
      sidebarOpen: false,
      dontForgetModalOpen: false,

      setTrainerName: (name) => set({ trainerName: name }),
      setInstituteName: (name) => set({ instituteName: name }),
      setTheme: (theme) => set({ theme }),
      setProjectorFontSize: (projectorFontSize) => set({ projectorFontSize }),
      setTimerAlertsEnabled: (timerAlertsEnabled) => set({ timerAlertsEnabled }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setDontForgetModalOpen: (dontForgetModalOpen) => set({ dontForgetModalOpen }),
    }),
    {
      name: 'codeshala-ui-settings',
      partialize: (state) => ({
        trainerName: state.trainerName,
        instituteName: state.instituteName,
        theme: state.theme,
        projectorFontSize: state.projectorFontSize,
        timerAlertsEnabled: state.timerAlertsEnabled,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
)
