import React, { useState } from 'react';
import { RECONCILE_SUMMARY, MISMATCH_ITEMS, MismatchItem } from '../data/reconcile';
import { formatINR } from '../lib/utils';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileQuestion,
  Bot,
  X,
  MessageSquare,
  Check,
  PauseCircle,
} from 'lucide-react';

export const Reconciliation: React.FC = () => {
  const [mismatches, setMismatches] = useState<MismatchItem[]>(MISMATCH_ITEMS);
  const [selectedAiMismatch, setSelectedAiMismatch] = useState<MismatchItem | null>(null);

  const handleUpdateStatus = (id: string, newStatus: 'hold' | 'accepted' | 'rejected') => {
    setMismatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-ink">ITC & Reconciliation</h1>
        <p className="text-xs text-muted">
          Compare your purchase ledger against government auto-drafted GSTR-2B to maximize legal tax credits.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Matched in 2B</span>
            <CheckCircle2 className="w-4 h-4 text-ok" />
          </div>
          <p className="mt-2 text-2xl font-heading font-extrabold text-ink tabular-nums">
            {formatINR(RECONCILE_SUMMARY.matchedAmount)}
          </p>
          <p className="text-[11px] text-ok font-medium mt-0.5">{RECONCILE_SUMMARY.matchedCount} invoices verified</p>
        </div>

        <div className="p-4 rounded-card bg-amber-50/60 border border-amber-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Mismatches / Held</span>
            <AlertTriangle className="w-4 h-4 text-warn" />
          </div>
          <p className="mt-2 text-2xl font-heading font-extrabold text-amber-950 tabular-nums">
            {formatINR(RECONCILE_SUMMARY.mismatchAmount)}
          </p>
          <p className="text-[11px] text-amber-800 font-medium mt-0.5">2 invoices held</p>
        </div>

        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Missing in 2B</span>
            <FileQuestion className="w-4 h-4 text-risk" />
          </div>
          <p className="mt-2 text-2xl font-heading font-extrabold text-ink tabular-nums">
            {formatINR(RECONCILE_SUMMARY.missingIn2bAmount)}
          </p>
          <p className="text-[11px] text-risk font-medium mt-0.5">1 supplier not filed</p>
        </div>

        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Extra in 2B</span>
            <HelpCircle className="w-4 h-4 text-muted" />
          </div>
          <p className="mt-2 text-2xl font-heading font-extrabold text-ink tabular-nums">
            {formatINR(RECONCILE_SUMMARY.extraIn2bAmount)}
          </p>
          <p className="text-[11px] text-muted font-medium mt-0.5">0 unclaimed credits</p>
        </div>
      </div>

      {/* Mismatches Table */}
      <div className="bg-surface rounded-card p-5 border border-line shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-ink">
              Mismatched Invoices Requiring Resolution
            </h3>
            <p className="text-xs text-muted">
              Decide whether to hold credit, request supplier upload, or claim under indemnity.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-chip">
            2 Items Actionable
          </span>
        </div>

        <div className="space-y-3">
          {mismatches.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-card bg-bg border border-line flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-ink">{item.supplier}</span>
                  <span className="font-mono text-[11px] text-muted bg-surface px-2 py-0.5 rounded border border-line">
                    {item.invoiceNo}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{item.gstin}</span>
                </div>
                <p className="text-xs text-risk font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.reason}</span>
                </p>
                <div className="flex items-center gap-4 text-xs text-muted pt-1">
                  <span>In Books: <strong className="text-ink">{formatINR(item.bookTax)}</strong></span>
                  <span>In Portal 2B: <strong className="text-ink">{formatINR(item.portalTax)}</strong></span>
                  <span>Difference: <strong className="text-risk">{formatINR(item.difference)}</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedAiMismatch(item)}
                  className="px-3 py-1.5 rounded-btn bg-accent/15 hover:bg-accent/25 text-amber-900 text-xs font-bold border border-accent/30 flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-accent" />
                  <span>Explain with AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`WhatsApp reminder sent to ${item.supplier} to file GSTR-1 for invoice ${item.invoiceNo}.`)}
                  className="px-3 py-1.5 rounded-btn bg-white hover:bg-slate-100 border border-line text-ink text-xs font-semibold flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand" />
                  <span>Request Supplier</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(item.id, item.status === 'hold' ? 'accepted' : 'hold')}
                  className={`px-3 py-1.5 rounded-btn text-xs font-bold flex items-center gap-1 ${
                    item.status === 'hold'
                      ? 'bg-brand text-white hover:bg-brand/90'
                      : 'bg-warn/20 text-amber-900 hover:bg-warn/30'
                  }`}
                >
                  {item.status === 'hold' ? (
                    <>
                      <PauseCircle className="w-3.5 h-3.5" /> Held (Click to Claim)
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" /> Claimed
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Slide-out Panel */}
      {selectedAiMismatch && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex justify-end"
          onClick={() => setSelectedAiMismatch(null)}
        >
          <div
            className="w-full max-w-md bg-surface h-full p-6 shadow-2xl overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-brand" />
                <h3 className="font-heading font-bold text-base text-ink">AI Mismatch Analysis</h3>
              </div>
              <button
                onClick={() => setSelectedAiMismatch(null)}
                className="p-1 rounded-full hover:bg-bg text-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-card bg-bg border border-line space-y-1">
              <p className="font-heading font-bold text-sm text-ink">{selectedAiMismatch.supplier}</p>
              <p className="text-xs text-muted">Invoice #{selectedAiMismatch.invoiceNo} · Tax {formatINR(selectedAiMismatch.bookTax)}</p>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-ink">
              <div className="p-4 rounded-card bg-brand-soft/50 border border-brand/20">
                <p className="font-bold text-brand uppercase tracking-wider text-[10px] mb-1">
                  Plain-Language Assessment
                </p>
                <p className="text-ink">{selectedAiMismatch.aiExplanation}</p>
              </div>

              <div className="p-3 bg-surface border border-line rounded-btn text-muted space-y-1">
                <p className="font-bold text-ink">Legal Reference:</p>
                <p>Section 16(2)(aa) & Rule 36(4) of Central Goods and Services Tax Rules.</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAiMismatch(null)}
              className="w-full py-2.5 bg-brand text-white rounded-btn text-xs font-bold"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

