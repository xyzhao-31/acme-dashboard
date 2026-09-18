# Acme Dashboard

A React + Vite internal metrics dashboard for a fictional company called Acme. Used as a demo app for Switch multi-agent collaboration workflows.

## Tech Stack
- React 18 + Vite
- Plain CSS with CSS custom properties for theming
- React Router for navigation
- Vitest + React Testing Library for tests

## Project Structure
- `src/App.jsx` - main app with sidebar navigation and routing
- `src/index.css` - global styles and the theme color variables (`:root` and `:root[data-theme='dark']`)
- `src/App.css` - component and layout styles, referencing the theme variables
- `src/ThemeContext.jsx` - theme state, persistence, and the `useTheme` hook
- `src/pages/Dashboard.jsx` - metrics overview page
- `src/pages/Team.jsx` - team members page
- `src/pages/Settings.jsx` - settings page with appearance section
- `src/__tests__/` - test files

## Commands
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm test` - run tests

## Theme System
Colors are defined as CSS custom properties in `src/index.css`: the light values in `:root`, the dark values in the `:root[data-theme='dark']` block directly beneath it. Keep the two blocks together and in sync — a new color must be added to both.

`src/ThemeContext.jsx` owns the active theme. It sets `data-theme` on `<html>` and persists the user's choice to `localStorage` (key `acme-theme`); nothing is written until the user actually picks a theme, so visitors stay unset. Light is the default. The Light/Dark control lives in Settings → Appearance, and an inline script in `index.html` applies the saved theme before first paint to avoid a flash of light — it hardcodes the same storage key, so update it alongside.

To add a theme, add a `:root[data-theme='<name>']` block, extend `THEME_OPTIONS` in `ThemeContext.jsx`, and widen the check in the `index.html` script.

## Coding Standards
- Use functional React components
- Keep components in `src/pages/` for page-level components
- CSS custom properties for all colors - never hardcode hex values in component styles
- Test files go in `src/__tests__/`
