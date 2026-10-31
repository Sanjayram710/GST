import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENT_BUSINESS, COMPLIANCE_RAG_ITEMS, TAX_TREND_DATA } from '../data/business';
import { ComplianceScoreRing } from '../components/common/ComplianceScoreRing';
import { StatusDot } from '../components/common/StatusDot';
import { MoneyStat } from '../components/common/MoneyStat';
import { DeadlineChip } from '../components/common/DeadlineChip';
import { ReferralBanner } from '../components/common/ReferralBanner';
import { formatINR } from '../lib/utils';
import {
  Sparkles,
  ArrowRight,
  Upload,
  Bot,
  Users2,
  Gift,
  FileCheck2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Banner for Hero Copilot */}
      <div className="p-4 sm:p-5 rounded-card bg-gradient-to-r from-brand to-[#0C2A20] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lift border border-brand/30">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-ink px-2 py-0.5 rounded-chip">
                October 2026 Ready
              </span>
              <span className="text-xs text-white/75 hidden sm:inline">Automated by GST Rules Engine</span>
            </div>
            <h2 className="text-base sm:text-lg font-heading font-extrabold text-white mt-0.5">
              Your GST for October is ready to file
            </h2>
            <p className="text-xs text-white/80 max-w-xl">
              Sales, purchases & 2B invoices are reconciled. Estimated net payable is <strong>{formatINR(104800)}</strong>.
            </p>
          </div>
        </div>

        <Link
          to="/app/copilot"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-ink rounded-btn text-xs font-heading font-extrabold shadow-lift transition-transform active:scale-95 shrink-0"
        >
          <span>Launch GST Copilot</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Grid: Compliance Score Card & Next Deadline Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Score Hero Card (7 cols) */}
        <div className="lg:col-span-7 bg-[#0C2A20] text-white rounded-card p-6 border border-brand/30 shadow-lift flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-xs text-white/70 font-medium">Compliance Health</p>
                <h3 className="font-heading font-bold text-lg text-white">
                  Compliance Score
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-chip bg-ok/20 border border-ok/40 text-ok text-xs font-bold">
                Audit Ready
              </span>
            </div>

            {/* Score Ring + Summary */}
            <div className="py-5 flex flex-col sm:flex-row items-center gap-6">
              <ComplianceScoreRing score={CURRENT_BUSINESS.complianceScore} size={118} />

              <div className="space-y-1.5 text-center sm:text-left">
                <p className="text-base font-bold text-white">
                  Excellent Standing (92/100)
                </p>
                <p className="text-xs text-white/75 leading-relaxed max-w-sm">
                  All past returns filed on time. 1 temporary ITC mismatch held to protect against tax authority notice.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-chip text-white/90">
                    No Late Fees
                  </span>
                  <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-chip text-white/90">
                    GSTR-1 Filed
                  </span>
                  <span className="text-[11px] bg-accent/20 text-accent font-semibold px-2.5 py-1 rounded-chip">
                    Payment in 4d
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RAG Status Items List */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5">
            <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
              Real-time Status Checks
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {COMPLIANCE_RAG_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 p-2 rounded-btn bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <StatusDot status={item.status} size="md" pulse={item.status === 'risk'} />
                  <span className="truncate text-white/90 font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Next Deadline & Key Money Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Next Deadline Card */}
          <div className="bg-surface rounded-card p-5 border border-line shadow-soft flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Upcoming Deadline
                </span>
                <DeadlineChip
                  daysRemaining={CURRENT_BUSINESS.daysRemaining}
                  dueDate={CURRENT_BUSINESS.nextFilingDeadline}
                />
              </div>

              <div className="mt-4">
                <p className="text-2xl font-heading font-extrabold text-ink">
                  GSTR-3B Summary Return
                </p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Due on <strong>4 November 2026</strong>. Auto-calculated net tax liability:
                </p>
              </div>

              <div className="mt-4 p-4 rounded-btn bg-bg border border-line flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted block">Estimated Tax Payable</span>
                  <span className="text-2xl font-heading font-extrabold text-brand tabular-nums">
                    {formatINR(104800)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-ok bg-ok/10 px-2 py-0.5 rounded-chip uppercase">
                    ITC Offset: {formatINR(118400)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-3">
              <Link
                to="/app/reconcile"
                className="text-xs font-semibold text-muted hover:text-ink flex items-center gap-1"
              >
                <span>Check 2 mismatches</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/app/copilot"
                className="px-4 py-2 bg-brand text-white rounded-btn text-xs font-bold hover:bg-brand/90 transition-colors shadow-soft"
              >
                Review & File →
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <MoneyStat
              label="October Sales"
              amount={1240000}
              subtext="48 B2B invoices"
              trend="+4.2%"
            />
            <MoneyStat
              label="Eligible ITC"
              amount={118400}
              subtext="29 matched bills"
              highlight={true}
            />
          </div>
        </div>
      </div>

      {/* Tax Trend Chart (6 Months History) */}
      <div className="bg-surface rounded-card p-6 border border-line shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
          <div>
            <h3 className="font-heading font-bold text-base text-ink">
              Tax Trend & Cash Outflow (Last 6 Months)
            </h3>
            <p className="text-xs text-muted">
              Monthly GST payable vs ITC claimed for Malabar Spice Traders
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-brand">
              <span className="w-2.5 h-2.5 rounded-full bg-brand" /> Net Tax Paid
            </span>
            <span className="flex items-center gap-1.5 font-medium text-accent">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" /> ITC Claimed
            </span>
          </div>
        </div>

        <div className="h-60 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TAX_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B6B4F" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0B6B4F" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F2A33A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F2A33A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#5B6B62" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#5B6B62"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [formatINR(value), '']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E3E7E1',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Area
                type="monotone"
                dataKey="taxPayable"
                name="Net Tax Payable"
                stroke="#0B6B4F"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#brandGrad)"
              />
              <Area
                type="monotone"
                dataKey="itcClaimed"
                name="ITC Claimed"
                stroke="#F2A33A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#accentGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/app/invoices')}
          className="p-4 rounded-card bg-surface hover:bg-brand-soft/40 border border-line hover:border-brand/30 text-left transition-all shadow-soft group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload className="w-4 h-4" />
          </div>
          <p className="mt-2 text-xs font-bold text-ink">Upload Invoices</p>
          <p className="text-[11px] text-muted">Excel, Tally, Zoho</p>
        </button>

        <button
          onClick={() => navigate('/app/assistant')}
          className="p-4 rounded-card bg-surface hover:bg-brand-soft/40 border border-line hover:border-brand/30 text-left transition-all shadow-soft group"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
            <Bot className="w-4 h-4 text-amber-700" />
          </div>
          <p className="mt-2 text-xs font-bold text-ink">Ask AI Assistant</p>
          <p className="text-[11px] text-muted">Instant tax answers</p>
        </button>

        <button
          onClick={() => navigate('/ca')}
          className="p-4 rounded-card bg-surface hover:bg-brand-soft/40 border border-line hover:border-brand/30 text-left transition-all shadow-soft group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users2 className="w-4 h-4" />
          </div>
          <p className="mt-2 text-xs font-bold text-ink">CA Dashboard</p>
          <p className="text-[11px] text-muted">Review 12 clients</p>
        </button>

        <button
          onClick={() => navigate('/app/referral')}
          className="p-4 rounded-card bg-surface hover:bg-brand-soft/40 border border-line hover:border-brand/30 text-left transition-all shadow-soft group"
        >
          <div className="w-9 h-9 rounded-xl bg-accent/20 text-ink flex items-center justify-center group-hover:scale-105 transition-transform">
            <Gift className="w-4 h-4 text-ink" />
          </div>
          <p className="mt-2 text-xs font-bold text-ink">Refer a Business</p>
          <p className="text-[11px] text-muted">Earn ₹1,000 credit</p>
        </button>
      </div>

      {/* Referral Banner */}
      <ReferralBanner />
    </div>
  );
};

