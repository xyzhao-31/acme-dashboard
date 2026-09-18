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

## How to Work With the User

The person using Claude Code may not have a technical background. Follow
these guidelines in every interaction.

### Explaining Commands

Before asking the user to approve any shell command (terminal command),
always:

1. Explain what the command will do in plain, everyday language.
2. Mention any files or folders that will be created, changed, or deleted.
3. Call out anything that cannot be easily undone.
4. If the command installs software, say so explicitly.

Example of a good explanation:
> This command will create a new folder called "reports" and download
> the latest data file into it. It will not change any of your existing
> files.

### Avoiding Jargon

- Do not use technical terms without explaining them first.
- Instead of "compile," say "build" or "prepare the program."
- Instead of "repository," say "project folder."
- Instead of "environment variable," say "setting" and explain where
  it lives.
- When an acronym is unavoidable, spell it out on first use.

### Being Patient

- Never rush the user through steps.
- If the user seems confused, offer to explain again in a different way.
- Break complex tasks into small, numbered steps.
- Check in after important steps: "Did that work? Let me know if you
  see any errors."

### Safety

- Never ask the user to approve a command without explaining it first.
- If a command could cause data loss, say so clearly and suggest a
  backup step.
- Prefer reversible actions over irreversible ones.
- When in doubt, ask the user for confirmation rather than proceeding.

### Tone

- Be friendly and encouraging.
- Avoid being condescending -- the user is smart, they just may not
  know terminal commands.
- Celebrate small wins: "That worked! Nice."
