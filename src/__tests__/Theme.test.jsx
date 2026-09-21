import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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

const currentTheme = () => document.documentElement.getAttribute('data-theme')

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('Theme toggle', () => {
  it('defaults to light when nothing is stored', () => {
    renderApp()
    expect(currentTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Light' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: 'Dark' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('switches to dark and back to light when the control is used', () => {
    renderApp()

    fireEvent.click(screen.getByRole('button', { name: 'Dark' }))
    expect(currentTheme()).toBe('dark')
    expect(screen.getByRole('button', { name: 'Dark' }).getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(screen.getByRole('button', { name: 'Light' }))
    expect(currentTheme()).toBe('light')
    expect(screen.getByRole('button', { name: 'Light' }).getAttribute('aria-pressed')).toBe('true')
  })
})

describe('Theme persistence', () => {
  it('stores the chosen theme', () => {
    renderApp()

    fireEvent.click(screen.getByRole('button', { name: 'Dark' }))
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('restores the stored theme on a fresh load', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    renderApp()
    expect(currentTheme()).toBe('dark')
    expect(screen.getByRole('button', { name: 'Dark' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('ignores an unrecognised stored value', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'neon')
    renderApp()
    expect(currentTheme()).toBe('light')
  })

  it('applies the theme on every page, not just settings', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    renderApp('/team')
    expect(currentTheme()).toBe('dark')
  })
})
