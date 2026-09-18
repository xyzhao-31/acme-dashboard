import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export const THEME_STORAGE_KEY = 'acme-theme'
export const DEFAULT_THEME = 'light'

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const VALID_THEMES = THEME_OPTIONS.map((option) => option.value)

const ThemeContext = createContext(null)

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return VALID_THEMES.includes(stored) ? stored : DEFAULT_THEME
  } catch {
    // Storage can be unavailable (private browsing, blocked cookies).
    return DEFAULT_THEME
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Persistence is best effort; the theme still applies for this session.
    }
  }, [theme])

  const setTheme = useCallback((next) => {
    if (VALID_THEMES.includes(next)) {
      setThemeState(next)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }
  return context
}
