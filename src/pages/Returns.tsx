import React from 'react';
import { CURRENT_RETURNS, FILING_HISTORY, OTHER_FORMS } from '../data/returns';
import { formatINR } from '../lib/utils';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  Clock,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const Returns: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink">Returns & Filings</h1>
          <p className="text-xs text-muted">
            Track statutory returns, download signed acknowledgements, and review historical filings.
          </p>
        </div>
        <Link
          to="/app/copilot"
          className="px-4 py-2 bg-brand text-white rounded-btn text-xs font-bold hover:bg-brand/90 transition-colors shadow-soft inline-flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Prepare October 3B</span>
        </Link>
      </div>

      {/* Active Returns for Current Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CURRENT_RETURNS.map((ret) => {
          const isFiled = ret.status === 'Filed';
          return (
            <div
              key={ret.form}
              className="bg-surface rounded-card p-5 border border-line shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-lg text-ink">
                      {ret.form}
                    </span>
                    <span className="text-xs text-muted font-medium">{ret.title}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-chip text-[11px] font-bold inline-flex items-center gap-1 ${
                      isFiled
                        ? 'bg-ok/10 text-ok border border-ok/30'
                        : 'bg-warn/20 text-amber-900 border border-warn/40'
                    }`}
                  >
                    {isFiled ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{ret.status}</span>
                  </span>
                </div>

                <div className="py-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Return Period</span>
                    <span className="font-bold text-ink">{ret.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Statutory Due Date</span>
                    <span className="font-medium text-ink">{ret.dueDate}</span>
                  </div>
                  {ret.arn && (
                    <div className="flex justify-between">
                      <span className="text-muted">Govt ARN</span>
                      <span className="font-mono font-bold text-brand">{ret.arn}</span>
                    </div>
                  )}
                  {ret.taxLiability !== undefined && (
                    <div className="flex justify-between pt-1 border-t border-line/50">
                      <span className="text-muted">Net Tax Amount</span>
                      <span className="font-mono font-bold text-ink">{formatINR(ret.taxLiability)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                {isFiled ? (
                  <button
                    onClick={() => alert(`Downloaded receipt for ${ret.form} (${ret.arn})`)}
                    className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Ack (PDF)
                  </button>
                ) : (
                  <Link
                    to="/app/copilot"
                    className="w-full py-2 bg-brand text-white rounded-btn text-xs font-bold text-center hover:bg-brand/90 transition-colors shadow-soft"
                  >
                    File Return via Copilot →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Other Returns Applicability Chips */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft space-y-2">
        <p className="text-xs font-bold text-muted uppercase tracking-wider">
          Other GST Forms & Applicability
        </p>
        <div className="flex flex-wrap gap-2">
          {OTHER_FORMS.map((form) => (
            <div
              key={form.code}
              className="p-2.5 rounded-btn bg-bg border border-line flex items-center gap-2 text-xs"
            >
              <span className="font-mono font-bold text-ink">{form.code}</span>
              <span className="text-muted">{form.label}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-chip ${
                  form.applicable
                    ? 'bg-brand-soft text-brand'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {form.applicable ? 'Applies to You' : 'Not Applicable'}
              </span>
              {form.note && <span className="text-[10px] text-amber-800 font-semibold">{form.note}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 6 Months Filing History Table */}
      <div className="bg-surface rounded-card p-5 border border-line shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-ink">Filing History (Last 6 Months)</h3>
            <p className="text-xs text-muted">All past GSTR-1 and GSTR-3B filings with official timestamps.</p>
          </div>
          <span className="text-xs font-semibold text-ok bg-ok/10 px-2.5 py-1 rounded-chip">
            100% On-Time Record
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line text-muted font-semibold bg-bg/50">
                <th className="py-2.5 px-3">Tax Period</th>
                <th className="py-2.5 px-3">Return Type</th>
                <th className="py-2.5 px-3">Filing Date</th>
                <th className="py-2.5 px-3 font-mono">ARN</th>
                <th className="py-2.5 px-3 text-right">Tax Paid</th>
                <th className="py-2.5 px-3 text-right">ITC Claimed</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {FILING_HISTORY.map((fh) => (
                <tr key={fh.id} className="hover:bg-bg transition-colors">
                  <td className="py-3 px-3 font-medium text-ink">{fh.period}</td>
                  <td className="py-3 px-3 font-bold text-ink">{fh.returnType}</td>
                  <td className="py-3 px-3 text-muted">{fh.filedDate}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-brand">{fh.arn}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-ink tabular-nums">
                    {fh.taxPaid > 0 ? formatINR(fh.taxPaid) : '—'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-ink tabular-nums">
                    {fh.itcClaimed > 0 ? formatINR(fh.itcClaimed) : '—'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[10px] font-bold text-ok bg-ok/10 px-2 py-0.5 rounded-chip">
                      {fh.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

