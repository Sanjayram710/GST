# RUNBOOK — 8:10 PM → 10:00 PM (110 minutes)

| Time | Task | Prompt to paste |
|---|---|---|
| 8:10–8:25 | Create project folder, drop these files in, install skills from your starred repos | (setup below) |
| 8:25–8:35 | Scaffold + design system + mock data | `MASTER_PROMPT.md` (Phase 0–1) |
| 8:35–9:20 | Build all screens | Phase 2–3 inside the same file |
| 9:20–9:40 | Motion + polish + responsive check | Phase 4 |
| 9:40–9:55 | Fix bugs, rehearse the demo | `DEMO_SCRIPT.md` |
| 9:55 | STOP CODING. Run `npm run dev`, demo. | |

## Setup (15 min)
1. `mkdir gst-assistant && cd gst-assistant`
2. Copy into the folder: `MASTER_PROMPT.md`, `DESIGN.md`, `PAGES_SPEC.md`, `AGENTS.md`, `data/api-status.json`
3. Skills from your starred repos (install commands change, so check each README before running):
   - `nextlevelbuilder/ui-ux-pro-max-skill` — design intelligence. Its README has a CLI install with an Antigravity option.
   - `Leonxlnx/taste-skill` — stops generic "AI-looking" pages.
   - `kylezantos/design-motion-principles` — use in Phase 4 only.
   - `VoltAgent/awesome-design-md` / `awesome-claude-design` — open one, copy a fintech DESIGN.md (Stripe, Razorpay-like, Linear) and paste its tokens at the bottom of my `DESIGN.md` under "Reference override". Optional.
   - `bergside/design-md-chrome` — optional, extracts styles from any site you like.
4. Open the folder in Antigravity. Put `AGENTS.md` at the project root (Antigravity reads it as workspace rules; you can also copy it into `.agent/rules/`).
5. Set the agent to Planning mode for Phase 0, then Fast mode for the rest.
6. Paste `MASTER_PROMPT.md` as the first message.

## Rules for the next 110 minutes
- Frontend only. No real backend. Mock everything.
- If something breaks for more than 10 minutes, mock it and move on.
- One agent, one phase at a time. Don't run parallel agents on the same files.
