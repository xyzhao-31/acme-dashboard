#!/bin/bash
set -e
echo "Resetting demo..."

cd /data/acme-dashboard

# Preserve agent credentials
cp -r .switchdash /tmp/switchdash-backup 2>/dev/null || true

# Close open PRs
gh pr list --state open --json number --jq '.[].number' 2>/dev/null | while read pr; do
  echo "Closing PR #$pr"
  gh pr close "$pr" 2>/dev/null || true
done

# Reset repo to clean main
git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd

# Restore agent credentials
cp -r /tmp/switchdash-backup .switchdash 2>/dev/null || true
rm -rf /tmp/switchdash-backup

echo "Done. Repo is clean, agent credentials preserved."
