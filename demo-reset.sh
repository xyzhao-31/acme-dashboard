#!/bin/bash
set -e
echo "Resetting acme-dashboard for demo..."

# Close any open PRs from previous runs
gh pr list --state open --json number --jq '.[].number' | while read pr; do
  echo "Closing PR #$pr"
  gh pr close "$pr" 2>/dev/null || true
done

# Switch to main and reset
git checkout main
git reset --hard origin/main
git clean -fd

# Delete local feature branches from previous runs
git branch | grep -v 'main' | xargs git branch -D 2>/dev/null || true

# Make sure the pre-staged branch is current
git fetch origin feature/dark-mode

echo ""
echo "Ready. Main is clean (light-only)."
echo "Now run /reset-all-agents in Slack, then post your message."
