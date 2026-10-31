# PAGES_SPEC.md — screens, routes, mock data

Demo business: **"Malabar Spice Traders"**, Kochi, Kerala. Fake GSTIN `32ABCDE1234F1Z5` (demo). Owner: "Anil". Period: October 2026. Today: 31 Oct 2026.

## Routes
| Route | Screen | Notes |
|---|---|---|
| `/` | Landing | Marketing page, hero + modules + pricing + referral + kiosk |
| `/start` | Startup Express | "START MY BUSINESS" guided wizard |
| `/app` | Dashboard | Compliance score, RAG list, next deadline, quick actions |
| `/app/copilot` | GST Copilot | 5-step flow (the hero feature) |
| `/app/invoices` | Invoices | Upload (drag-drop mock), table, sales/purchase tabs |
| `/app/reconcile` | ITC & Reconciliation | 2B vs books, mismatches list, accept/reject |
| `/app/returns` | Returns | GSTR-1, GSTR-3B status cards, filing history |
| `/app/assistant` | AI Assistant | Chat with suggested questions, canned answers |
| `/app/vault` | Document Vault | Certificates, returns, challans, acknowledgements |
| `/app/referral` | Referral | Credit balance, share link, funnel |
| `/kiosk` | Kiosk Mode | Big-button, high-contrast, operator view, service tiles |
| `/ca` | CA Dashboard | Client list with RAG, bulk actions, filing queue |
| `/admin/api-health` | API Health | Reads `data/api-status.json` (182 GSP APIs) |

## 1. Landing (`/`)
Hero: "GST made simple. Business made easy." Sub: "From registration to filing — one digital platform." CTAs: Start free / Watch demo. Right side: a live-looking phone mockup of the dashboard score card. Sections: How it works (5 Copilot steps), Modules grid (from the module list), Channels strip (Mobile, Web, Kiosk, WhatsApp, CA), Pricing (Free / Per filing / Monthly / Business), Referral loop diagram, Kiosk for small towns, Footer. Pricing uses placeholder "₹X" styled as editable tokens, do not invent prices.

## 2. Startup Express (`/start`)
Wizard, 6 steps with progress bar: Structure (Proprietorship / Partnership-LLP / Private Limited / Other) → PAN → Business registration (MCA step shown only for LLP/Pvt Ltd) → GST registration → Bank & accounting setup → Invoicing & first compliance. Each step: short explanation, what documents are needed, "Mark done" button. Ends with a summary and "Go to dashboard".

## 3. Dashboard (`/app`)
- Greeting + business name + GSTIN chip + period switcher
- ComplianceScoreRing: 92/100
- RAG list exactly: 🟢 GST Registration Active · 🟢 GSTR-1 Filed · 🟢 GSTR-3B Filed · 🟡 ITC Reconciliation — 2 mismatches · 🔴 Next payment due in 4 days (render with StatusDot, not emoji)
- Banner: "Your GST for November is ready to start" → button to Copilot
- Next deadline card with countdown
- Mini chart: tax payable last 6 months (Recharts)
- Quick actions: Upload invoices, Ask assistant, Invite CA, Refer a business

## 4. GST Copilot (`/app/copilot`) — spend the most time here
Full-screen stepper, one big question per step, big numbers, minimal text.
1. Sales: drop zone, "Upload your sales invoices". Mock: after click, shows 48 invoices, ₹12,40,000 taxable, ₹2,23,200 output tax.
2. Purchases: "We found ₹7,85,000 of purchase invoices" (31 invoices).
3. ITC: "Your available input tax credit appears to be ₹1,18,400. Review exceptions." Two exceptions with Accept/Hold buttons (supplier not filed; invoice date mismatch).
4. Tax: "Estimated GST payable: ₹1,04,800" with a breakdown (IGST/CGST/SGST), tag "Calculated by rules engine" and a small "How we calculated" drawer.
5. File: summary, consent checkbox, "Review and authorise filing" → OTP/EVC modal (mock 6 digits, any code works) → success screen with confetti, ARN number (fake), then ReferralBanner "Refer another business and receive ₹X credit".
Numbers must come from `src/lib/gst.ts` using mock invoices, so changing data changes totals.

## 5. Invoices (`/app/invoices`)
Tabs Sales / Purchases. Table with invoice no., party, GSTIN, date, taxable value, tax, status chip (OK / Error / Duplicate). Import sources row: Excel, Tally, Zoho, API (only Excel works in demo). Filters and search. Row click opens a side drawer. ~30 mock rows.

## 6. Reconciliation (`/app/reconcile`)
Summary cards: Matched, Mismatch, Missing in 2B, Extra in 2B. Mismatch table with reason ("Supplier filed late", "Amount differs ₹4,200", "GSTIN typo"). Row actions: Accept, Request supplier, Hold. AI "Explain this mismatch" button opens plain-language explanation panel.

## 7. Returns (`/app/returns`)
Cards for GSTR-1 and GSTR-3B (Filed / Draft / Not started), due date, ARN, download buttons. Filing history table for the last 6 months. Other returns shown as "Applies to you? Check" chips (CMP-08, GSTR-9...).

## 8. AI Assistant (`/app/assistant`)
Chat UI. Suggested chips: "Do I need to file this month?", "What is my next GST deadline?", "Why is my ITC different?", "What documents do I need?", "Why do I have this mismatch?", "How much tax do I approximately owe?", "My return is ready, what next?". Canned answers (write them in `src/data/assistant.ts`), typing animation. Footer note: "AI explains. Numbers come from the rules engine and GST systems." Free text falls back to a polite "In the full product I'd answer this; try one of these."

## 9. Vault, Referral
Vault: grid with file-type icon, name, date, tags, filter chips. Referral: credit ₹X balance, copy-link button, loop diagram (Filing → Referral → New business → Registration → Monthly filing), list of 3 referred businesses with status.

## 10. Kiosk (`/kiosk`)
Fullscreen, larger type (min 20px), high contrast, 6 large tiles: GST Registration, GST Return Filing, PAN Services, Business Registration, Invoice Services, Compliance Check. Operator banner: "Assisted by Operator: Suresh, Ernakulam". Language toggle EN / മലയാളം / हिन्दी (translate only the tiles and headings). Tapping a tile opens a 3-step assisted flow mock. Idle reset indicator.

## 11. CA Dashboard (`/ca`)
Desktop table of 12 clients: name, GSTIN, score, RAG, next due, status, owner. Filters by RAG. Top stats: clients, filings due this week, mismatches. "File all ready returns" bulk button (mock). Click a client → read-only view of their Copilot state.

## 12. API Health (`/admin/api-health`)
Read `data/api-status.json` (fields: id, api, group, status = working | not_working | not_tested | partial). Show: donut of statuses, group filter chips (GSTR1, GSTR2A, GSTR2B, GSTR3B, IMS, GSTR6, etc.), searchable list with ApiHealthRow. Highlight the 6 not-working APIs in a "Needs attention" panel. This screen is honest about readiness: Core flow (GSTR-1, 2A, 2B, 3B, IMS) mostly working; GSTR-1A, 4, 8, 9, ITC forms largely not tested.

## Global shell
Desktop: left sidebar. Mobile: bottom tab bar (Home, Copilot, Invoices, Assistant, More). Top bar has channel switcher chips (Mobile / Web / Kiosk / WhatsApp / CA) that navigate to the right view; "WhatsApp" opens a phone-frame mock chat showing the reminder message "Your GSTR-3B is due in 4 days. Reply PAY to continue."
