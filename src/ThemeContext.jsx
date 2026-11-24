import { createContext, useContext, useEffect, useState } from 'react'

// Keep in sync with the inline script in index.html.
export const THEME_STORAGE_KEY = 'acme-theme'
export const THEME_OPTIONS = ['light', 'dark']
const DEFAULT_THEME = 'light'

const ThemeContext = createContext(null)

function readSavedTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEME_OPTIONS.includes(saved) ? saved : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readSavedTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Only an explicit choice is persisted, so visitors who never pick stay unset.
  function setTheme(next) {
    if (!THEME_OPTIONS.includes(next)) return
    setThemeState(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage unavailable (e.g. private mode): the choice lasts for this visit.
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside a ThemeProvider')
  return value
}
