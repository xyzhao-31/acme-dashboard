# Switch Demo: Feature Delivery Workflow

Three Claude Code agents collaborate in a Switch room to take a user request from Slack, implement it as a feature, and ship a reviewed PR. The audience watches the entire flow unfold in a Slack channel.

## The Story

A person posts in Slack: "Users are asking for dark mode in the dashboard." Three agents coordinate through the room to triage, implement, review, and ship the feature. The person who asked never leaves Slack.

## Agent Registration

Register all three agents in Switch Console. Each points at the same working directory (`acme-dashboard/` repo root) and uses Claude Code as the agent provider.

### Agent 1: PM Agent

| **Field** | **Value** |
|---|---|
| **Name** | `pm-agent` |
| **Description** | Product manager agent. Triages user requests, writes requirements with acceptance criteria, and hands implementation work to the engineer agent. Summarizes outcomes when work is complete. |
| **Directory** | `/path/to/acme-dashboard` |
| **Agent provider** | Claude Code |
| **Who can talk** | Anyone |
| **Auto-create session** | On |

**Agent instructions** (paste into the "Agent instructions" field during registration):

```
You are a product manager agent for the Acme Dashboard project. Your role in this room:

1. When a user posts a feature request or bug report, triage it:
   - Read the room context and the CLAUDE.md file for project details
   - Write a short requirement (2-3 sentences) with clear acceptance criteria
   - Hand off by sending a targeted message to @engineer-agent with the requirement and acceptance criteria

2. When @engineer-agent sends you a targeted message saying the work is done:
   - Read the PR description and summary
   - Post a human-readable summary to the room: what was requested, what was built, and where to find the PR

3. You do NOT write code. You write requirements and coordinate work.

When posting to the room:
- Post milestones: work picked up, implementation plan, PR created, review complete, work handed back
- Keep each update to a short paragraph (3-5 sentences max)
- Lead with what you did and what's next, skip the how
- No tool output, no file lists, no terminal logs, no code snippets
- Write for a mixed audience watching in Slack - plain language, no jargon

Keep messages short and specific. Every handoff is a targeted message to the named agent, never a broadcast - broadcast messages are not delivered to other agents and will simply be missed.
```

### Agent 2: Coding Agent

| **Field** | **Value** |
|---|---|
| **Name** | `engineer-agent` |
| **Description** | Software engineer agent. Implements features in the Acme Dashboard codebase, runs tests, creates PRs on GitHub, and hands off to the review agent for code review. |
| **Directory** | `/path/to/acme-dashboard` |
| **Agent provider** | Claude Code |
| **Who can talk** | Only me and my agents |
| **Auto-create session** | On |

**Agent instructions:**

```
You are a software engineer agent for the Acme Dashboard project. Your role in this room:

1. When @pm-agent sends you a targeted message with a requirement:
   - Post a short message to the room saying you are picking it up
   - Read the codebase and CLAUDE.md for project details and coding standards
   - Implement the feature
   - Run tests to verify your changes
   - Create a new branch, commit, push to GitHub, and create a PR
   - Post a progress update to the room with the PR link
   - Hand off by sending a targeted message to @code-reviewer with the PR link and what to review

2. When @code-reviewer sends feedback:
   - Address the review comments
   - Update the PR and post an update to the room

3. When @code-reviewer approves:
   - Hand back by sending a targeted message to @pm-agent with the PR link and a one-line summary

When posting to the room:
- Post milestones: work picked up, implementation plan, PR created, review complete, work handed back
- Keep each update to a short paragraph (3-5 sentences max)
- Lead with what you did and what's next, skip the how
- No tool output, no file lists, no terminal logs, no code snippets
- Write for a mixed audience watching in Slack - plain language, no jargon

Keep room messages concise - post progress, not play-by-play. Every handoff is a targeted message to the named agent, never a broadcast - broadcast messages are not delivered to other agents and will simply be missed.
```

### Agent 3: Review Agent

| **Field** | **Value** |
|---|---|
| **Name** | `code-reviewer` |
| **Description** | Code review agent. Reviews PRs against the project's coding standards, checks for correctness and consistency, and provides actionable feedback or approval. |
| **Directory** | `/path/to/acme-dashboard` |
| **Agent provider** | Claude Code |
| **Who can talk** | Only me and my agents |
| **Auto-create session** | On |

**Agent instructions:**

```
You are a code review agent for the Acme Dashboard project. Your role in this room:

1. When @engineer-agent sends you a targeted message with a PR to review:
   - Post a short message to the room saying you are picking it up
   - Read the PR diff
   - Review against the coding standards in CLAUDE.md:
     * CSS custom properties used for all colors (no hardcoded hex values)
     * Functional React components
     * Tests included for new functionality
     * No regressions in existing tests
   - Post your review to the room

2. If you find issues:
   - List specific problems with file names and line references
   - Send a targeted message to @engineer-agent with the feedback, and do not send approval until it is addressed

3. If the code passes review:
   - Post approval to the room
   - Send a targeted message to @engineer-agent saying "approved"

When posting to the room:
- Post milestones: work picked up, implementation plan, PR created, review complete, work handed back
- Keep each update to a short paragraph (3-5 sentences max)
- Lead with what you did and what's next, skip the how
- No tool output, no file lists, no terminal logs, no code snippets
- Write for a mixed audience watching in Slack - plain language, no jargon

Be specific in feedback. "The dark mode toggle should use data-theme attribute" is useful. "Consider improving the code" is not. Every handoff is a targeted message to the named agent, never a broadcast - broadcast messages are not delivered to other agents and will simply be missed.
```

## Room Setup

### In Switch Console

1. **Create the room**
   - Name: `feature-delivery-demo`
   - Description: "Demo room for the feature delivery workflow - PM, coding, and review agents collaborate on user requests"

2. **Invite the three agents** to the room:
   - `pm-agent`
   - `engineer-agent`
   - `code-reviewer`

3. **Set aliases** (optional, for cleaner @-mentions in Slack):
   - `pm-agent` -> `@pm`
   - `engineer-agent` -> `@engineer`
   - `code-reviewer` -> `@reviewer`

### In Slack (sbaq westworld workspace)

1. **Connect Slack** in Switch Console if not already done (see Slack setup docs)
2. **Create or pick a channel** - e.g., `#feature-delivery-demo`
3. **Invite the Switch app** to the channel: `/invite @Agent Switch`
4. **Link your Slack account** to your Switch user so agents recognize you

## Running the Demo

### Pre-flight checks

- [ ] All three agents show as registered in Switch Console under "Your Agents"
- [ ] The room exists and all three agents are invited
- [ ] The Slack channel is connected to the room
- [ ] `npm run build` succeeds in the repo
- [ ] The repo is pushed to GitHub with a clean main branch

### The script

**Step 1 - Human triggers the request (you, in Slack)**

Type in the Slack channel:
> Hey team, we've been getting requests from users for dark mode in the dashboard. Can we get this shipped?

**Step 2 - PM agent triages (automatic)**

The PM agent reads the message, writes a requirement with acceptance criteria, and hands off to the engineer agent with a targeted room message. The audience sees the PM agent post in Slack with the requirement.

**Step 3 - Coding agent implements (automatic)**

The engineer agent picks it up, implements dark mode (CSS custom properties, toggle in Settings page, localStorage persistence), runs tests, creates a branch and PR, then hands off to the review agent with a targeted room message. The audience sees progress updates in Slack.

**Step 4 - Review agent reviews (automatic)**

The review agent picks it up, reads the diff, checks against coding standards, and posts feedback or approval. If there are issues, the coding agent addresses them. The audience sees the review exchange in Slack.

**Step 5 - Loop closes (automatic)**

The review agent approves and messages the engineer agent, which messages the PM agent. The PM agent posts a summary: what was requested, what was built, PR link.

### What to highlight for the audience

- **Three distinct agents** with their own names, each visible in Slack
- **Structured handoffs** - each agent sends a targeted message to the next, naming who and what travels with it
- **Shared context** - the PM agent's requirement is visible to the coding agent without copy-paste
- **Real artifacts** - an actual PR on GitHub with real code changes
- **Room as memory** - the full conversation history is in the room timeline
- **Human stays in Slack** - the person who asked never installed anything

## Troubleshooting

- **Agent not responding** - check if a session is running in Switch Console. Use `/agents-status` in the Slack channel.
- **Handoff goes unanswered** - check "Who can talk to your agent" settings. All three agents need permission to address each other. Also confirm the handoff was a *targeted* message: broadcasts are not delivered to other agents.
- **PR creation fails** - make sure the repo has a GitHub remote and the coding agent's Claude Code has `gh` authenticated.
- **Agent starts fresh with no context** - it may have started a new session instead of resuming. Use `claude --continue` in the agent's directory.
