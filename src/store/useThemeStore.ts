import { create } from 'zustand'

interface ThemeStore {
  isDark: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: true, // starts as dark since your app loads in dark
  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark
      if (next) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDark: next }
    }),
}))