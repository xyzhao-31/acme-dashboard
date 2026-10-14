#!/bin/bash
set -e
echo "Resetting acme-dashboard for demo..."

# Close any open PRs from previous runs
gh pr list --state open --json number --jq '.[].number' | while read pr; do
  echo "Closing PR #$pr"
  gh pr close "$pr" 2>/dev/null || true
done

# Find the clean baseline commit (before any dark mode merges)
CLEAN_COMMIT=$(git log --oneline --all --grep="Reset main to clean state" --format="%H" | head -1)
if [ -z "$CLEAN_COMMIT" ]; then
  CLEAN_COMMIT=$(git log --oneline --all --grep="Initial dashboard app" --format="%H" | head -1)
fi

if [ -z "$CLEAN_COMMIT" ]; then
  echo "ERROR: Could not find the clean baseline commit."
  exit 1
fi

echo "Rolling back origin/main to clean baseline ($CLEAN_COMMIT)..."
git push --force origin "$CLEAN_COMMIT":main

# Switch to main and reset local to match
git checkout main
git fetch origin
git reset --hard origin/main
git clean -fd -e .claude/ -e .switchdash/ -e .switch/

# Delete local feature branches from previous runs
git branch | grep -v 'main' | xargs git branch -D 2>/dev/null || true

# Make sure the pre-staged branch is current
git fetch origin feature/dark-mode

echo ""
echo "Ready. Main is clean (light-only)."
echo "Now run /reset-all-agents in Slack, then post your message."
