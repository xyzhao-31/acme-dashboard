import { useState } from 'react'
import { THEME_OPTIONS, useTheme } from '../ThemeContext.jsx'

function Settings() {
  const { theme, setTheme } = useTheme()
  const [companyName, setCompanyName] = useState('Acme Corporation')
  const [timezone, setTimezone] = useState('America/New_York')
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Settings</h1>
        <p className="page-subtitle">Manage your workspace preferences</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="settings-section">
          <h2>General</h2>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              <option value="Europe/Berlin">Central European Time (CET)</option>
              <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>
          <fieldset className="theme-fieldset">
            <legend className="theme-label">Theme</legend>
            <div className="theme-options">
              {THEME_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={option.value === theme ? 'theme-option selected' : 'theme-option'}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={option.value === theme}
                    onChange={() => setTheme(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <p className="theme-hint">Applies immediately and is remembered on this device.</p>
          </fieldset>
        </div>

        <button type="submit" className="save-button">
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default Settings
