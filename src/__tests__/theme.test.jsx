import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { THEME_STORAGE_KEY } from '../ThemeContext.jsx'

function renderApp(initialRoute = '/settings') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  )
}

function currentTheme() {
  return document.documentElement.getAttribute('data-theme')
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Theme toggle', () => {
  it('defaults to light for a new user', () => {
    renderApp()
    expect(screen.getByLabelText('Light').checked).toBe(true)
    expect(screen.getByLabelText('Dark').checked).toBe(false)
    expect(currentTheme()).toBe('light')
  })

  it('switches to dark and applies it to the document', () => {
    renderApp()
    fireEvent.click(screen.getByLabelText('Dark'))

    expect(screen.getByLabelText('Dark').checked).toBe(true)
    expect(currentTheme()).toBe('dark')
  })

  it('switches back to light again', () => {
    renderApp()
    fireEvent.click(screen.getByLabelText('Dark'))
    fireEvent.click(screen.getByLabelText('Light'))

    expect(screen.getByLabelText('Light').checked).toBe(true)
    expect(currentTheme()).toBe('light')
  })

  it('marks the selected option so it reads as active', () => {
    renderApp()
    expect(screen.getByLabelText('Light').closest('label').className).toContain('selected')

    fireEvent.click(screen.getByLabelText('Dark'))

    expect(screen.getByLabelText('Dark').closest('label').className).toContain('selected')
    expect(screen.getByLabelText('Light').closest('label').className).not.toContain('selected')
  })
})

describe('Theme persistence', () => {
  it('records nothing until the user actually chooses', () => {
    renderApp()

    // Visiting must not pre-commit a visitor to light, or a future
    // "follow the OS setting" default could never apply to them.
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(null)
  })

  it('saves the choice to localStorage', () => {
    renderApp()
    fireEvent.click(screen.getByLabelText('Dark'))

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('restores the saved theme after a reload', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    renderApp()

    expect(screen.getByLabelText('Dark').checked).toBe(true)
    expect(currentTheme()).toBe('dark')
  })

  it('falls back to light when the stored value is not a known theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'solarized')

    renderApp()

    expect(screen.getByLabelText('Light').checked).toBe(true)
    expect(currentTheme()).toBe('light')
  })

  it('still applies the theme when localStorage is unavailable', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('storage blocked')
    })

    renderApp()
    expect(currentTheme()).toBe('light')

    fireEvent.click(screen.getByLabelText('Dark'))
    expect(currentTheme()).toBe('dark')
  })
})

describe('Theme scope', () => {
  it('applies to every page, not just Settings', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    // The theme lives on <html>, so it covers whatever route is mounted.
    renderApp('/')
    expect(currentTheme()).toBe('dark')
    expect(screen.getByText('Active Projects')).toBeTruthy()

    cleanup()

    renderApp('/team')
    expect(currentTheme()).toBe('dark')
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
  })
})
