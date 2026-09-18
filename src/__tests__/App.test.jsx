import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  )
}

describe('Dashboard page', () => {
  it('renders metric cards', () => {
    renderApp('/')
    expect(screen.getByText('Active Projects')).toBeTruthy()
    expect(screen.getByText('12')).toBeTruthy()
    expect(screen.getByText('Open Issues')).toBeTruthy()
    expect(screen.getByText('47')).toBeTruthy()
    expect(screen.getByText('Team Members')).toBeTruthy()
    expect(screen.getByText('8')).toBeTruthy()
    expect(screen.getByText('Uptime')).toBeTruthy()
    expect(screen.getByText('99.9%')).toBeTruthy()
  })

  it('renders recent activity section', () => {
    renderApp('/')
    expect(screen.getByText('Recent Activity')).toBeTruthy()
  })
})

describe('Navigation', () => {
  it('renders sidebar navigation links', () => {
    renderApp('/')
    const navLinks = document.querySelectorAll('.nav-link')
    expect(navLinks.length).toBe(3)
    expect(navLinks[0].textContent).toContain('Dashboard')
    expect(navLinks[1].textContent).toContain('Team')
    expect(navLinks[2].textContent).toContain('Settings')
  })
})

describe('Team page', () => {
  it('renders team member cards', () => {
    renderApp('/team')
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Alex Rivera')).toBeTruthy()
    expect(screen.getByText('Engineering Lead')).toBeTruthy()
  })
})

describe('Settings page', () => {
  it('renders settings form', () => {
    renderApp('/settings')
    expect(screen.getByText('General')).toBeTruthy()
    expect(screen.getByText('Appearance')).toBeTruthy()
    expect(screen.getByLabelText('Company Name')).toBeTruthy()
    expect(screen.getByLabelText('Timezone')).toBeTruthy()
  })

  it('renders save button', () => {
    renderApp('/settings')
    expect(screen.getByText('Save Changes')).toBeTruthy()
  })

  it('shows light theme indicator', () => {
    renderApp('/settings')
    expect(screen.getByText('Light')).toBeTruthy()
  })
})
