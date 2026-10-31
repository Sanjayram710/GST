import React from 'react';
import { Link } from 'react-router-dom';
import { ComplianceScoreRing } from '../components/common/ComplianceScoreRing';
import { StatusDot } from '../components/common/StatusDot';
import { formatINR } from '../lib/utils';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Monitor,
  Users2,
  MessageSquare,
  LayoutGrid,
  Zap,
  Repeat,
  Store,
  ChevronRight,
  FileCheck2,
  Lock,
} from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col selection:bg-brand-soft selection:text-brand">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-line px-4 sm:px-8 py-3.5 flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-heading font-black text-base shadow-soft">
            GST
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-ink tracking-tight block leading-tight">
              SimpleGST
            </span>
            <span className="text-[10px] text-muted font-medium tracking-wide">
              Compliance Digital Assistant
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-ink/80">
          <a href="#how-it-works" className="hover:text-brand transition-colors">How it Works</a>
          <a href="#modules" className="hover:text-brand transition-colors">Modules</a>
          <a href="#channels" className="hover:text-brand transition-colors">Channels</a>
          <a href="#pricing" className="hover:text-brand transition-colors">Pricing</a>
          <a href="#referral" className="hover:text-brand transition-colors">Referral Loop</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="px-3.5 py-2 text-xs font-semibold text-ink hover:text-brand transition-colors hidden sm:inline-block"
          >
            Live Demo
          </Link>
          <Link
            to="/start"
            className="px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-heading font-bold shadow-soft transition-transform active:scale-95 inline-flex items-center gap-1.5"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-chip bg-brand-soft border border-brand/20 text-brand text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Unified MSME GST Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-ink tracking-tight leading-[1.08]">
              GST made simple. <br />
              <span className="text-brand">Business made easy.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From business registration to automated return filing — one digital assistant for traders, shop owners and MSMEs. No tax jargon, zero calculation errors.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/start"
                className="w-full sm:w-auto px-6 py-3.5 bg-brand hover:bg-brand/90 text-white rounded-btn text-sm font-heading font-extrabold shadow-lift transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Start Free Registration</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/app"
                className="w-full sm:w-auto px-6 py-3.5 bg-surface hover:bg-brand-soft/40 border border-line text-ink rounded-btn text-sm font-heading font-bold shadow-soft transition-colors flex items-center justify-center gap-2"
              >
                <span>Watch Demo (Instant)</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-ok" /> Deterministic Rules Engine
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-ok" /> Instant EVC / OTP Filing
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-ok" /> WhatsApp & Kiosk Ready
              </span>
            </div>
          </div>

          {/* Right Column: Live-looking Phone Mockup with Score Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] rounded-[36px] bg-[#0C2A20] border-[7px] border-slate-800 shadow-2xl p-5 text-white flex flex-col justify-between">
              {/* Speaker Notch */}
              <div className="w-24 h-4 bg-black rounded-b-xl mx-auto -mt-5 mb-4" />

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center text-xs font-bold">
                      MS
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-white">Malabar Spice Traders</p>
                      <p className="text-[9px] text-white/60 font-mono">32ABCDE1234F1Z5</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-accent bg-accent/20 px-2 py-0.5 rounded-chip">
                    Oct 2026
                  </span>
                </div>

                {/* Score Ring inside Phone */}
                <div className="py-4 flex flex-col items-center text-center">
                  <ComplianceScoreRing score={92} size={100} />
                  <p className="font-heading font-bold text-sm text-white mt-2">Compliance Score 92/100</p>
                  <p className="text-[11px] text-white/70">Audit-ready status · On-time track record</p>
                </div>

                {/* RAG list inside phone */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex items-center gap-2 p-1.5 rounded-md bg-white/5">
                    <StatusDot status="ok" size="sm" />
                    <span className="text-white/90">GST Registration Active</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-md bg-white/5">
                    <StatusDot status="ok" size="sm" />
                    <span className="text-white/90">GSTR-1 Filed</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-md bg-white/5">
                    <StatusDot status="warn" size="sm" />
                    <span className="text-white/90">2 ITC Mismatches Held</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-md bg-white/5">
                    <StatusDot status="risk" size="sm" pulse={true} />
                    <span className="text-white/90">Due in 4 days: {formatINR(104800)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/app/copilot"
                className="mt-4 w-full py-2.5 bg-accent hover:bg-accent/90 text-ink rounded-btn text-xs font-heading font-extrabold text-center shadow-soft"
              >
                Launch Copilot →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (5 COPILOT STEPS) */}
      <section id="how-it-works" className="py-16 bg-surface border-y border-line px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-soft px-3 py-1 rounded-chip">
              The GST Copilot Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink tracking-tight">
              From sales invoice to Government ARN in 5 steps
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              No GSTR jargon. Plain English questions, deterministic math, and 1-click filing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Sales', desc: 'Drag & drop Excel, Tally or billing records. Output tax calculated.' },
              { num: '02', title: 'Purchases', desc: 'Purchase bills auto-matched against vendor GST numbers.' },
              { num: '03', title: 'ITC Recon', desc: 'GSTR-2B compared. Exceptions held to stop tax audit notices.' },
              { num: '04', title: 'Rules Math', desc: 'Section 49 offset order executed deterministically.' },
              { num: '05', title: '1-Click File', desc: 'Instant OTP authorization with official ARN delivery.' },
            ].map((step) => (
              <div key={step.num} className="p-5 rounded-card bg-bg border border-line space-y-2">
                <span className="font-heading font-black text-2xl text-brand">{step.num}</span>
                <h3 className="font-heading font-bold text-sm text-ink">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section id="modules" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-soft px-3 py-1 rounded-chip">
            Comprehensive Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink tracking-tight">
            Every GST service under one roof
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Engineered for traders, micro-enterprises and their consulting Chartered Accountants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { title: 'Startup Express', desc: '6-step guided wizard for PAN, MCA, GST registration, bank account and first invoice.', link: '/start' },
            { title: 'GST Copilot', desc: 'Automated 5-step return preparation with deterministic rules engine verification.', link: '/app/copilot' },
            { title: 'Smart Reconciliation', desc: 'Instant 2B vs books matching. Flags missing invoices and supplier delays.', link: '/app/reconcile' },
            { title: 'AI Assistant', desc: 'Plain-language answers for complex questions: "Why is my ITC different?".', link: '/app/assistant' },
            { title: 'Document Vault', desc: 'Encrypted cloud storage for certificates, return JSONs, challans and acknowledgments.', link: '/app/vault' },
            { title: 'CA Dashboard', desc: 'Multi-client oversight with RAG health monitoring and bulk filing controls.', link: '/ca' },
          ].map((mod, i) => (
            <Link
              key={i}
              to={mod.link}
              className="p-6 rounded-card bg-surface border border-line hover:border-brand/40 shadow-soft hover:shadow-lift transition-all group"
            >
              <h3 className="font-heading font-bold text-base text-ink group-hover:text-brand flex items-center justify-between">
                <span>{mod.title}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand" />
              </h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">{mod.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CHANNELS STRIP */}
      <section id="channels" className="py-12 bg-[#0C2A20] text-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              One Engine · Five Channels
            </h2>
            <p className="text-xs text-white/70 mt-1">
              Access GST compliance wherever your business operates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[
              { icon: Smartphone, label: 'Mobile App', desc: 'Snap bills & file on the go' },
              { icon: Monitor, label: 'Web Portal', desc: 'Full accountant workspace' },
              { icon: MessageSquare, label: 'WhatsApp Bot', desc: 'Due date alerts & 1-reply pay' },
              { icon: LayoutGrid, label: 'Kiosk Terminal', desc: 'Assisted small-town operators' },
              { icon: Users2, label: 'CA Suite', desc: 'Collaborative client portal' },
            ].map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <div key={idx} className="p-4 rounded-card bg-white/5 border border-white/10 text-center">
                  <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-bold text-xs text-white">{ch.label}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{ch.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REFERRAL LOOP DIAGRAM */}
      <section id="referral" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-chip text-amber-900">
            Viral MSME Growth
          </span>
          <h2 className="text-3xl font-heading font-extrabold text-ink tracking-tight">
            Every filing becomes an acquisition event
          </h2>
          <p className="text-xs text-muted">
            Traders recommend fellow businesses to offset their own filing subscription costs.
          </p>
        </div>

        <div className="p-8 rounded-card bg-surface border border-line shadow-soft max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <div className="p-3 bg-brand-soft rounded-btn border border-brand/20 w-full sm:w-auto">
              <p className="font-bold text-xs text-brand">1. Return Filed</p>
              <p className="text-[10px] text-muted">GSTR-3B success</p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand rotate-90 sm:rotate-0" />
            <div className="p-3 bg-accent-soft rounded-btn border border-accent/40 w-full sm:w-auto">
              <p className="font-bold text-xs text-ink">2. Referral Prompt</p>
              <p className="text-[10px] text-muted">Earn ₹1,000 credit</p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand rotate-90 sm:rotate-0" />
            <div className="p-3 bg-brand-soft rounded-btn border border-brand/20 w-full sm:w-auto">
              <p className="font-bold text-xs text-brand">3. Peer Trader Joins</p>
              <p className="text-[10px] text-muted">Startup Express setup</p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand rotate-90 sm:rotate-0" />
            <div className="p-3 bg-ok/10 rounded-btn border border-ok/30 w-full sm:w-auto">
              <p className="font-bold text-xs text-ok">4. Zero-Cost Filing</p>
              <p className="text-[10px] text-muted">Both earn rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING WITH EDITABLE TOKEN ₹X */}
      <section id="pricing" className="py-16 bg-surface border-t border-line px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand-soft px-3 py-1 rounded-chip">
              Transparent Pricing
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-ink tracking-tight">
              Pay as you grow
            </h2>
            <p className="text-xs text-muted">
              Tokens formatted with Indian business flexibility. Zero hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {[
              { plan: 'Free Tier', price: '₹0', period: 'forever', desc: 'Basic invoicing & compliance score monitor' },
              { plan: 'Per Filing', price: '₹X', period: 'per return', desc: 'Pay only when you submit GSTR-1 or 3B', popular: true },
              { plan: 'Monthly MSME', price: '₹X', period: 'per month', desc: 'Unlimited AI Copilot, 2B recon & WhatsApp alerts' },
              { plan: 'CA Practice', price: '₹X', period: 'per client / mo', desc: 'Multi-client portal, bulk filing & audit ledger' },
            ].map((p, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-card border flex flex-col justify-between ${
                  p.popular
                    ? 'bg-[#0C2A20] text-white border-brand shadow-lift'
                    : 'bg-bg text-ink border-line'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm">{p.plan}</span>
                    {p.popular && (
                      <span className="text-[10px] font-bold bg-accent text-ink px-2 py-0.5 rounded-chip">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-heading font-black tabular-nums">{p.price}</span>
                    <span className={`text-xs ${p.popular ? 'text-white/70' : 'text-muted'}`}>/{p.period}</span>
                  </div>
                  <p className={`text-xs mt-3 leading-relaxed ${p.popular ? 'text-white/80' : 'text-muted'}`}>
                    {p.desc}
                  </p>
                </div>

                <Link
                  to="/start"
                  className={`mt-6 w-full py-2.5 rounded-btn text-xs font-bold text-center transition-colors ${
                    p.popular
                      ? 'bg-accent text-ink hover:bg-accent/90'
                      : 'bg-brand text-white hover:bg-brand/90'
                  }`}
                >
                  Choose {p.plan}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-10 bg-surface border-t border-line px-4 sm:px-8 text-xs text-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand text-white flex items-center justify-center font-bold text-xs">
              GST
            </div>
            <span className="font-heading font-bold text-ink">SimpleGST Assistant</span>
            <span>· Built for Indian MSMEs & Traders</span>
          </div>

          <div className="flex items-center gap-4 text-ink font-medium">
            <Link to="/app" className="hover:text-brand">Dashboard</Link>
            <Link to="/app/copilot" className="hover:text-brand">Copilot</Link>
            <Link to="/kiosk" className="hover:text-brand">Kiosk View</Link>
            <Link to="/ca" className="hover:text-brand">CA Suite</Link>
            <Link to="/admin/api-health" className="hover:text-brand">API Health</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
