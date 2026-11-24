import { describe, it, expect, beforeEach } from 'vitest'
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

const root = () => document.documentElement

describe('Theme switch', () => {
  beforeEach(() => {
    cleanup()
    window.localStorage.clear()
    root().removeAttribute('data-theme')
  })

  it('shows a Light/Dark switch under Appearance, defaulting to light', () => {
    renderApp()
    const group = screen.getByRole('radiogroup', { name: 'Theme' })
    expect(group).toBeTruthy()
    expect(screen.getByRole('radio', { name: 'Light' }).getAttribute('aria-checked')).toBe('true')
    expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('false')
    expect(root().getAttribute('data-theme')).toBe('light')
  })

  it('does not save anything until the user picks a theme', () => {
    renderApp()
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })

  it('switches the whole app to dark right away and remembers it', () => {
    renderApp()
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))
    expect(root().getAttribute('data-theme')).toBe('dark')
    expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('true')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('switches back to light', () => {
    renderApp()
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))
    fireEvent.click(screen.getByRole('radio', { name: 'Light' }))
    expect(root().getAttribute('data-theme')).toBe('light')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('restores the saved choice after a reload', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    renderApp('/')
    expect(root().getAttribute('data-theme')).toBe('dark')
  })

  it('ignores an unknown saved value', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'purple')
    renderApp()
    expect(root().getAttribute('data-theme')).toBe('light')
    expect(screen.getByRole('radio', { name: 'Light' }).getAttribute('aria-checked')).toBe('true')
  })

  it('does not submit the settings form when toggling', () => {
    renderApp()
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))
    expect(screen.getByText('Save Changes')).toBeTruthy()
  })
})
