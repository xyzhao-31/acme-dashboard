import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const THEME_STORAGE_KEY = 'acme-dashboard-theme'
export const THEMES = ['light', 'dark']

const DEFAULT_THEME = 'light'

/** Read the persisted theme, falling back to light when unset or unusable. */
export function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEMES.includes(stored) ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable (private mode, blocked cookies) - theme still applies for this visit.
    }
  }, [theme])

  const setTheme = useCallback((next) => {
    if (THEMES.includes(next)) setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside a ThemeProvider')
  return context
}
