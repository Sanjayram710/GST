# SimpleGST — GST Compliance Digital Assistant

A frontend-only fintech demo built for MSMEs, traders, and small business owners in India (Kerala context — **Malabar Spice Traders**, GSTIN: `32ABCDE1234F1Z5` demo).

The platform replaces complex GSTR terminology with simple, plain-language sentences and deterministic math.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Vite local development server
npm run dev
```

App runs locally at: `http://localhost:5173`

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🧭 Routes & Screen Architecture

| Route | Screen | Purpose |
|---|---|---|
| `/` | **Landing Page** | Marketing page with live score card phone mockup, 5-step Copilot strip, modules grid, channels strip, pricing with ₹X tokens, and referral cycle. |
| `/start` | **Startup Express** | 6-step guided wizard (Structure → PAN → MCA → GST → Bank → Invoicing) for launching a business. |
| `/app` | **Dashboard** | Compliance score ring (92/100 animated), RAG list, 4-day deadline countdown, 6-month tax payable chart (Recharts), and quick action tiles. |
| `/app/copilot` | **GST Copilot (Flagship Hero)** | 5-step return preparation workflow: Sales (48 invoices) → Purchases (31 invoices) → ITC (2 exceptions held) → Tax Payable (₹1,04,800 rules engine) → 1-Click EVC/OTP Filing with celebration confetti and fake ARN receipt. |
| `/app/invoices` | **Invoices Register** | Sales and Purchases tables (~80 mock records), search, filters, Excel import simulation, and detail drawer. |
| `/app/reconcile` | **ITC & Reconciliation** | GSTR-2B vs Books comparison, mismatch resolution actions (Hold / Accept / Request), and AI plain-language explanation drawer. |
| `/app/returns` | **Returns & History** | Current status cards for GSTR-1 and GSTR-3B, 6-month filing history table with ARNs, and applicability chips. |
| `/app/assistant` | **AI Assistant** | Interactive chat with clickable questions (e.g. *"Why is my ITC different?"*, *"What is my next GST deadline?"*) with deterministic engine citations. |
| `/app/vault` | **Document Vault** | Bank-grade encrypted storage for REG-06 certificates, return acknowledgments, and payment challans. |
| `/app/referral` | **Referral Rewards** | Balance display (₹3,500), invite link copy, WhatsApp sharing, and 5-step viral referral loop. |
| `/kiosk` | **Kiosk Mode** | Fullscreen, high-contrast, large-type assisted commerce terminal with Suresh (Operator #12) and English / മലയാളം / हिन्दी language toggles. |
| `/ca` | **CA Dashboard** | Multi-client portfolio table of 12 businesses with RAG status filtering, bulk filing, and inspection drawer. |
| `/admin/api-health` | **API Health Monitor** | Interactive dashboard reading 182 GSP API test endpoints (`data/api-status.json`), status donut chart, and a dedicated "Needs attention" panel for the 6 failing endpoints. |

---

## 🎯 3-Minute Executive Demo Script

1. **Landing (`/`)** (20s): Show value proposition *"GST made simple. Business made easy."* and live phone score card widget.
2. **Dashboard (`/app`)** (25s): Point out score **92/100**, the 5 RAG indicators, 4-day payment countdown, and 6-month cash outflow trend chart.
3. **Copilot (`/app/copilot`)** (75s): 
   - Step 1: Upload sales (48 invoices, ₹12,40,000 taxable, ₹2,23,200 tax).
   - Step 2: Purchases found (31 invoices, ₹7,85,000 taxable).
   - Step 3: ITC exceptions held (Kochi Coir Works ₹18,000 + Calicut Packaging ₹4,900 = ₹22,900 held; ₹1,18,400 eligible ITC).
   - Step 4: Tax liability = **₹1,04,800** (show *"Calculated by rules engine"*, open *"How we calculated"* audit trail).
   - Step 5: Statutory consent → 6-digit EVC/OTP modal → Success screen with confetti burst, government ARN `AA3210260028192`, and referral prompt.
4. **AI Assistant (`/app/assistant`)** (20s): Click *"Why is my ITC different?"* to show AI explanation backed by deterministic rules.
5. **Kiosk Mode (`/kiosk`)** (15s): Showcase Malayalam toggle (മലയാളം) and operator Suresh's 3-step assisted terminal.
6. **CA Suite (`/ca`)** (15s): Filter by Red/Amber clients and show bulk filing trigger.
7. **API Health (`/admin/api-health`)** (10s): Demonstrate 182 monitored endpoints showing core flow is 100% operational with 6 secondary endpoints flagged for attention.

---

## 🛡️ Core Product Architecture Principles

- **Deterministic Rules Engine (`src/lib/gst.ts`)**: All tax calculations, ITC offsets (IGST → CGST → SGST), and liability computations are executed via pure TypeScript functions, never by a probabilistic LLM.
- **Zero Real PII**: Uses demo business *"Malabar Spice Traders"* with mock GSTIN `32ABCDE1234F1Z5`.
- **Design System**: Colors and typography strictly adhere to `DESIGN.md` tokens: `#F7F8F5` (bg), `#0F1B14` (ink), `#0B6B4F` (brand), `#F2A33A` (accent), and `#0C2A20` (dark cards).

