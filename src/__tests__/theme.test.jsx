import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { THEME_STORAGE_KEY, THEMES } from '../theme.jsx'

function renderSettings() {
  return render(
    <MemoryRouter initialEntries={['/settings']}>
      <App />
    </MemoryRouter>
  )
}

const lightOption = () => screen.getByRole('button', { name: 'Light' })
const darkOption = () => screen.getByRole('button', { name: 'Dark' })
const activeTheme = () => document.documentElement.getAttribute('data-theme')

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('Theme toggle', () => {
  it('replaces the static label with a light/dark control, light selected by default', () => {
    renderSettings()
    expect(lightOption().getAttribute('aria-pressed')).toBe('true')
    expect(darkOption().getAttribute('aria-pressed')).toBe('false')
    expect(activeTheme()).toBe('light')
  })

  it('switches the app to dark mode when dark is picked', () => {
    renderSettings()

    fireEvent.click(darkOption())

    expect(activeTheme()).toBe('dark')
    expect(darkOption().getAttribute('aria-pressed')).toBe('true')
    expect(lightOption().getAttribute('aria-pressed')).toBe('false')
  })

  it('switches back to light mode', () => {
    renderSettings()

    fireEvent.click(darkOption())
    fireEvent.click(lightOption())

    expect(activeTheme()).toBe('light')
    expect(lightOption().getAttribute('aria-pressed')).toBe('true')
  })

  it('does not submit the settings form when a theme is picked', () => {
    renderSettings()

    fireEvent.click(darkOption())

    expect(screen.getByText('Save Changes')).toBeTruthy()
  })
})

describe('Theme persistence', () => {
  it('saves the chosen theme', () => {
    renderSettings()

    fireEvent.click(darkOption())

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('restores the saved theme on a fresh load', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')

    renderSettings()

    expect(activeTheme()).toBe('dark')
    expect(darkOption().getAttribute('aria-pressed')).toBe('true')
  })

  it('falls back to light when nothing valid is saved', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'neon')

    renderSettings()

    expect(activeTheme()).toBe('light')
    expect(lightOption().getAttribute('aria-pressed')).toBe('true')
  })
})

describe('Theme definitions', () => {
  const readFile = (path) => readFileSync(resolve(process.cwd(), path), 'utf8')

  const varsIn = (block) => new Set(block.match(/--[\w-]+(?=\s*:)/g) ?? [])

  it('overrides every light custom property in a [data-theme="dark"] block', () => {
    const css = readFile('src/App.css')
    const lightMatch = css.match(/:root\s*\{([^}]*)\}/)
    const darkMatch = css.match(/\[data-theme="dark"\]\s*\{([^}]*)\}/)

    expect(lightMatch).toBeTruthy()
    expect(darkMatch).toBeTruthy()

    const darkVars = varsIn(darkMatch[1])
    const missing = [...varsIn(lightMatch[1])].filter((name) => !darkVars.has(name))
    expect(missing).toEqual([])
  })

  it('applies the saved theme before first paint, using the same key and values', () => {
    const html = readFile('index.html')
    const inlineScript = html.slice(0, html.indexOf('<body'))

    expect(inlineScript).toContain(THEME_STORAGE_KEY)
    expect(inlineScript).toContain('data-theme')
    for (const theme of THEMES) {
      expect(inlineScript).toContain(`'${theme}'`)
    }
  })
})
