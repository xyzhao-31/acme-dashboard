# Acme Dashboard

A React + Vite internal metrics dashboard for a fictional company called Acme. Used as a demo app for Switch multi-agent collaboration workflows.

## Tech Stack
- React 18 + Vite
- Plain CSS with CSS custom properties for theming
- React Router for navigation
- Vitest + React Testing Library for tests

## Project Structure
- `src/App.jsx` - main app with sidebar navigation and routing
- `src/App.css` - all styles, using CSS custom properties (`:root` variables)
- `src/pages/Dashboard.jsx` - metrics overview page
- `src/pages/Team.jsx` - team members page
- `src/pages/Settings.jsx` - settings page with appearance section
- `src/__tests__/` - test files

## Commands
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm test` - run tests

## Theme System
Colors are defined as CSS custom properties in `:root` in `App.css`. The app ships with a light theme only. To add dark mode, add a `[data-theme="dark"]` selector block overriding the custom properties, and a toggle mechanism in Settings.

## Coding Standards
- Use functional React components
- Keep components in `src/pages/` for page-level components
- CSS custom properties for all colors - never hardcode hex values in component styles
- Test files go in `src/__tests__/`
