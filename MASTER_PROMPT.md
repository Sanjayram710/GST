# MASTER PROMPT — paste this into Antigravity as the first message

You are a senior product designer and frontend engineer. We are building a **frontend-only demo** of the "GST Compliance Digital Assistant", a platform that lets MSMEs, traders and small businesses do GST registration, invoicing, return preparation, filing, reminders and compliance in one simple workflow. It works across mobile, web, kiosk, WhatsApp/voice and a CA dashboard. **The demo must be shown in under 100 minutes**, so be fast, decisive and keep the quality bar high on the main flow.

## Read first
1. `AGENTS.md` (workspace rules)
2. `DESIGN.md` (design system, follow strictly)
3. `PAGES_SPEC.md` (every route and its content)
4. `data/api-status.json` (real GSP API test results, 182 entries; use on the API Health page)

If skills from `ui-ux-pro-max-skill`, `taste-skill` or `design-motion-principles` are installed, use them: ui-ux-pro-max and taste-skill from Phase 1, design-motion-principles only in Phase 4.

## Product principle (shape every screen with this)
Users should never need to understand GST terminology. Replace jargon with plain sentences ("Your GST for October is ready."). The flagship is the **GST Copilot**: Sales → Purchases → ITC → Tax → File. AI explains and assists; **tax numbers and eligibility come from deterministic rules in `src/lib/gst.ts`, not from an LLM**. Show that distinction visibly in the UI.

## Stack
Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, React Router, Framer Motion, Recharts, lucide-react. No backend, no auth. Mock data only. Deploy-ready with `npm run dev` and `npm run build`.

## Phases (do them in order; after each, run `npm run build`, fix errors, then give me a 3-line status and continue without waiting unless blocked)

### Phase 0 — Plan (max 5 minutes)
Produce a short plan: folder structure, component list, mock data files. Do not ask me questions. Make reasonable assumptions and state them in one line.

### Phase 1 — Foundation
- Scaffold the project in the current folder.
- Implement design tokens from `DESIGN.md` in Tailwind config + CSS variables; load Plus Jakarta Sans, Inter.
- Build the app shell: desktop sidebar, mobile bottom tab bar, top bar with channel switcher, routes for everything in `PAGES_SPEC.md` (stub pages are fine at this point).
- Create mock data in `src/data/`: business, 48 sales invoices, 31 purchase invoices, 2B entries with 2 deliberate mismatches, filing history (6 months), documents, clients (12 for CA view), assistant answers, referral data.
- Write `src/lib/gst.ts`: pure functions for output tax, eligible ITC, net payable, due-date calculation, compliance score. Add a few unit-style sanity checks in a comment or a small test file. Make Copilot totals match the spec (≈₹2,23,200 output tax, ≈₹1,18,400 ITC, ≈₹1,04,800 payable); tune the mock invoices so the functions produce these.
- Build shared components listed in `DESIGN.md`.

### Phase 2 — Hero flows (highest priority, polish these most)
1. `/app` Dashboard with animated score ring (92), RAG list, deadline countdown, chart.
2. `/app/copilot` full 5-step flow with OTP modal, success screen, confetti and referral banner.
3. `/` Landing page.

### Phase 3 — Remaining screens
`/start`, `/app/invoices`, `/app/reconcile`, `/app/returns`, `/app/assistant`, `/app/vault`, `/app/referral`, `/kiosk`, `/ca`, `/admin/api-health`, WhatsApp phone-frame mock.

### Phase 4 — Polish (use design-motion-principles if installed)
- Page transitions, step transitions, score ring, success moment; honour `prefers-reduced-motion`.
- Empty/loading/error states on every data screen (skeletons, 400ms fake latency).
- Responsive pass at 390px, 768px, 1280px. Fix overflow and tap targets.
- Contrast and focus-ring pass.
- Remove console errors and warnings.
- Add `README.md` with run steps and a route list.

## Quality bar
- Looks like a funded fintech product, not a template. No lorem ipsum, no placeholder boxes, no emoji as icons.
- Indian formatting for currency and numbers, Indian business names, Kerala context.
- Every button does something (navigate, open modal, toggle, or show a toast saying "Demo action").
- Keep files small and components reusable. No giant 800-line pages.
- Never fabricate real identifiers. Mark demo identifiers as demo.

## Final deliverable
A running app at `http://localhost:5173` where I can demo this path in 3 minutes: Landing → Dashboard (score 92, one red item) → GST Copilot through all 5 steps to filing success → Assistant answering "Why is my ITC different?" → Kiosk view → CA dashboard → API Health page.

Begin with Phase 0 now.
