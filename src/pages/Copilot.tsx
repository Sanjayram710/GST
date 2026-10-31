import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SALES_INVOICES } from '../data/salesInvoices';
import { PURCHASE_INVOICES } from '../data/purchaseInvoices';
import { INITIAL_ITC_EXCEPTIONS } from '../data/reconcile';
import { calculateGstSummary, ItcException, Invoice } from '../lib/gst';
import { formatINR } from '../lib/utils';
import { parseInvoiceFile, downloadSampleTemplate } from '../lib/importer';
import { ReferralBanner } from '../components/common/ReferralBanner';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  UploadCloud,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Calculator,
  Lock,
  X,
  FileText,
  RotateCcw,
  Check,
  ChevronDown,
  Info,
} from 'lucide-react';

export const Copilot: React.FC = () => {
  const navigate = useNavigate();

  // Current step 1 to 5 (or 6 for success screen)
  const [currentStep, setCurrentStep] = useState(1);

  // Sales invoices state (supports live Excel / CSV upload)
  const [salesInvoices, setSalesInvoices] = useState<Invoice[]>(SALES_INVOICES);
  const [uploadedFileName, setUploadedFileName] = useState('Malabar_Sales_Oct2026.xlsx');
  const [isParsingFile, setIsParsingFile] = useState(false);
  const copilotFileInputRef = useRef<HTMLInputElement>(null);

  // Exceptions state (allows user to toggle Hold vs Accept, instantly updating the rules engine calculation)
  const [exceptions, setExceptions] = useState<ItcException[]>(INITIAL_ITC_EXCEPTIONS);

  // Statutory consent checkbox for step 5
  const [hasConsented, setHasConsented] = useState(false);

  // OTP Modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState(['4', '8', '2', '9', '1', '0']);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // "How we calculated" drawer state
  const [showCalcDrawer, setShowCalcDrawer] = useState(false);

  // Generated fake ARN after filing
  const [arnNumber, setArnNumber] = useState('AA3210260028192');

  // Real-time calculation through pure deterministic rules engine
  const gstResult = calculateGstSummary(salesInvoices, PURCHASE_INVOICES, exceptions);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    const result = await parseInvoiceFile(file, 'B2B');
    setIsParsingFile(false);

    if (result.success && result.invoices.length > 0) {
      setSalesInvoices(result.invoices);
      setUploadedFileName(result.fileName);
    } else {
      alert(result.error || 'Could not parse spreadsheet file.');
    }

    if (copilotFileInputRef.current) copilotFileInputRef.current.value = '';
  };

  // Handle toggling exception status between hold and accepted
  const toggleException = (id: string) => {
    setExceptions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'hold' ? 'accepted' : 'hold';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  const handleAuthorizeFiling = () => {
    setShowOtpModal(true);
  };

  const handleVerifyOtp = () => {
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setShowOtpModal(false);
      setCurrentStep(6); // Success screen

      // Trigger celebration confetti (honours prefers-reduced-motion)
      try {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0B6B4F', '#F2A33A', '#1E9E5A', '#0C2A20'],
          });
        }
      } catch (e) {
        // Safe fallback
      }
    }, 900);
  };

  const steps = [
    { num: 1, title: 'Sales', short: '48 Invoices' },
    { num: 2, title: 'Purchases', short: '31 Invoices' },
    { num: 3, title: 'ITC & Exceptions', short: '2 Actions' },
    { num: 4, title: 'Tax Liability', short: 'Rules Engine' },
    { num: 5, title: 'Authorise & File', short: '1-Click OTP' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Stepper Indicator */}
      {currentStep <= 5 && (
        <div className="bg-surface p-4 sm:p-5 rounded-card border border-line shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold font-mono">
                {currentStep}
              </span>
              <span className="font-heading font-bold text-sm text-ink">
                GST Copilot — October 2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Calculator className="w-3.5 h-3.5 text-brand" />
              <span className="font-medium text-brand">Calculated by rules engine</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {steps.map((s) => {
              const isPast = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => s.num < currentStep && setCurrentStep(s.num)}
                  className={`text-left p-2 rounded-btn transition-colors border ${
                    isCurrent
                      ? 'bg-brand-soft border-brand/40 text-brand'
                      : isPast
                      ? 'bg-surface border-line text-ink hover:bg-bg cursor-pointer'
                      : 'bg-bg border-transparent text-muted/60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-ok shrink-0" />
                    ) : (
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? 'bg-brand text-white' : 'bg-line text-muted'
                        }`}
                      >
                        {s.num}
                      </span>
                    )}
                    <span className="font-bold text-xs truncate hidden sm:inline">
                      {s.title}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted truncate hidden sm:block">{s.short}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: SALES INVOICES */}
      {currentStep === 1 && (
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={copilotFileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 1 of 5 · Sales
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
                Upload your sales invoices
              </h2>
              <p className="text-sm text-muted">
                Import sales bills or daybook from Excel (.xlsx) or CSV (.csv).
              </p>
            </div>

            {/* Template Download Shortcuts */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadSampleTemplate('xlsx')}
                className="px-2.5 py-1.5 bg-bg hover:bg-slate-200 border border-line text-ink rounded-btn text-xs font-semibold flex items-center gap-1"
                title="Download formatted sample Excel sheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-ok" />
                <span>Sample .xlsx</span>
              </button>
              <button
                type="button"
                onClick={() => downloadSampleTemplate('csv')}
                className="px-2.5 py-1.5 bg-bg hover:bg-slate-200 border border-line text-ink rounded-btn text-xs font-semibold flex items-center gap-1"
                title="Download formatted sample CSV file"
              >
                <FileText className="w-3.5 h-3.5 text-brand" />
                <span>Sample .csv</span>
              </button>
            </div>
          </div>

          {/* Upload Drop Zone */}
          <div
            onClick={() => copilotFileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) {
                setIsParsingFile(true);
                const res = await parseInvoiceFile(file, 'B2B');
                setIsParsingFile(false);
                if (res.success && res.invoices.length > 0) {
                  setSalesInvoices(res.invoices);
                  setUploadedFileName(res.fileName);
                } else {
                  alert(res.error || 'Failed to read spreadsheet file.');
                }
              }
            }}
            className="border-2 border-dashed border-brand/30 hover:border-brand bg-brand-soft/20 hover:bg-brand-soft/40 transition-colors rounded-card p-8 text-center cursor-pointer flex flex-col items-center justify-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center shadow-soft mb-3 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="font-heading font-bold text-base text-ink">
              Drag & drop Excel (.xlsx) / CSV file, or click to browse
            </p>
            <p className="text-xs text-muted mt-1">
              Instant in-browser spreadsheet parser · No cloud upload required
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-semibold bg-white border border-line px-3 py-1 rounded-chip text-ink flex items-center gap-1.5 shadow-sm">
                <FileSpreadsheet className="w-3.5 h-3.5 text-ok" /> {uploadedFileName}
              </span>
              <span className="text-xs text-ok font-bold">
                ✓ Parsed {salesInvoices.length} records
              </span>
            </div>
          </div>

          {/* Extracted Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-card bg-bg border border-line">
              <span className="text-xs font-semibold text-muted">Total Taxable Sales</span>
              <p className="font-heading font-black text-2xl sm:text-3xl text-ink mt-1 tabular-nums">
                {formatINR(gstResult.taxableSales)}
              </p>
              <p className="text-xs text-muted mt-1">{salesInvoices.length} B2B & wholesale invoices parsed</p>
            </div>
            <div className="p-4 rounded-card bg-brand-soft/60 border border-brand/20">
              <span className="text-xs font-semibold text-brand">Total Output Tax (18%)</span>
              <p className="font-heading font-black text-2xl sm:text-3xl text-brand mt-1 tabular-nums">
                {formatINR(gstResult.outputTax.total)}
              </p>
              <p className="text-xs text-brand/80 mt-1">
                IGST: {formatINR(gstResult.outputTax.igst)} · CGST+SGST: {formatINR(gstResult.outputTax.cgst + gstResult.outputTax.sgst)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/app')}
              className="text-xs font-semibold text-muted hover:text-ink px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Continue to Purchases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PURCHASES */}
      {currentStep === 2 && (
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
              Step 2 of 5 · Purchases
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
              We found ₹7,85,000 of purchase invoices
            </h2>
            <p className="text-sm text-muted">
              Auto-fetched from your purchase register and verified with supplier GSTINs.
            </p>
          </div>

          <div className="p-6 rounded-card bg-bg border border-line space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-line">
              <div>
                <p className="text-xs text-muted font-medium">31 Purchase Invoices Uploaded</p>
                <p className="text-2xl sm:text-3xl font-heading font-extrabold text-ink mt-0.5 tabular-nums">
                  {formatINR(gstResult.taxablePurchases)}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-muted font-medium">Gross Tax Paid to Suppliers</p>
                <p className="text-xl sm:text-2xl font-heading font-extrabold text-brand mt-0.5 tabular-nums">
                  {formatINR(gstResult.grossItc)}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 text-ink">
                <span>Inter-state Purchases (IGST invoices)</span>
                <span className="font-mono font-semibold">2 bills · {formatINR(268333)}</span>
              </div>
              <div className="flex items-center justify-between py-1 text-ink">
                <span>Intra-state Kerala Purchases (CGST + SGST)</span>
                <span className="font-mono font-semibold">29 bills · {formatINR(516667)}</span>
              </div>
              <div className="flex items-center justify-between py-1 text-ink">
                <span>Direct Supplier Matches with GSTN 2B</span>
                <span className="font-mono font-semibold text-ok">29 Invoices Auto-reconciled</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-muted hover:text-ink px-4 py-2 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Review Input Tax Credit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ITC & EXCEPTIONS */}
      {currentStep === 3 && (
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
              Step 3 of 5 · ITC Reconciliation
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
              Your available input tax credit appears to be {formatINR(gstResult.eligibleItc.total)}
            </h2>
            <p className="text-sm text-muted">
              We compared your purchase records against GSTR-2B. Review the 2 exceptions below.
            </p>
          </div>

          {/* Exceptions List */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted uppercase tracking-wider">
              Exceptions Requiring Your Decision
            </p>

            {exceptions.map((exc) => {
              const isHeld = exc.status === 'hold';
              return (
                <div
                  key={exc.id}
                  className={`p-4 rounded-card border transition-all ${
                    isHeld
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-ink">
                          {exc.supplierName}
                        </span>
                        <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-chip border border-line">
                          {exc.invoiceNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-chip uppercase ${
                            isHeld
                              ? 'bg-warn/20 text-amber-900'
                              : 'bg-ok/20 text-ok'
                          }`}
                        >
                          {isHeld ? 'Held on Advice' : 'Credit Claimed'}
                        </span>
                      </div>
                      <p className="text-xs text-muted">{exc.reason}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs text-muted block">Tax Amount</span>
                        <span className="font-heading font-bold text-base text-ink tabular-nums">
                          {formatINR(exc.taxAmount)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleException(exc.id)}
                        className={`px-3 py-1.5 rounded-btn text-xs font-bold transition-all ${
                          isHeld
                            ? 'bg-white hover:bg-slate-100 text-ink border border-line shadow-soft'
                            : 'bg-warn text-white hover:bg-warn/90'
                        }`}
                      >
                        {isHeld ? 'Accept Risk & Claim' : 'Hold Credit (Recommended)'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Summary Footnote */}
          <div className="p-3.5 rounded-btn bg-bg border border-line flex items-center justify-between text-xs">
            <span className="text-muted">
              Gross ITC: <strong>{formatINR(gstResult.grossItc)}</strong> minus Held Exceptions: <strong>{formatINR(gstResult.heldItc)}</strong>
            </span>
            <span className="font-bold text-brand text-sm">
              Eligible ITC: {formatINR(gstResult.eligibleItc.total)}
            </span>
          </div>

          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-muted hover:text-ink px-4 py-2 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Calculate Tax Payable</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TAX CALCULATION */}
      {currentStep === 4 && (
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 4 of 5 · Net Liability
              </span>
              <span className="text-[11px] font-bold text-white bg-brand px-2 py-0.5 rounded-chip flex items-center gap-1 shadow-soft">
                <Calculator className="w-3 h-3" /> Calculated by rules engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
              Estimated GST payable: {formatINR(gstResult.netPayable.total)}
            </h2>
            <p className="text-sm text-muted">
              Computed strictly via deterministic statutory rules (Section 49 CGST Act).
            </p>
          </div>

          {/* Tax Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-card bg-bg border border-line">
              <span className="text-xs font-medium text-muted">Integrated Tax (IGST)</span>
              <p className="font-heading font-black text-xl text-ink mt-1 tabular-nums">
                {formatINR(gstResult.netPayable.igst)}
              </p>
              <p className="text-[11px] text-muted mt-0.5">Inter-state supplies liability</p>
            </div>
            <div className="p-4 rounded-card bg-bg border border-line">
              <span className="text-xs font-medium text-muted">Central Tax (CGST)</span>
              <p className="font-heading font-black text-xl text-ink mt-1 tabular-nums">
                {formatINR(gstResult.netPayable.cgst)}
              </p>
              <p className="text-[11px] text-muted mt-0.5">Kerala intra-state 9%</p>
            </div>
            <div className="p-4 rounded-card bg-bg border border-line">
              <span className="text-xs font-medium text-muted">State Tax (SGST)</span>
              <p className="font-heading font-black text-xl text-ink mt-1 tabular-nums">
                {formatINR(gstResult.netPayable.sgst)}
              </p>
              <p className="text-[11px] text-muted mt-0.5">Kerala intra-state 9%</p>
            </div>
          </div>

          {/* How we calculated button */}
          <div className="flex items-center justify-between p-4 bg-brand-soft/40 border border-brand/20 rounded-card">
            <div className="flex items-center gap-2.5">
              <Info className="w-5 h-5 text-brand shrink-0" />
              <div>
                <p className="text-xs font-bold text-ink">Statutory calculation audit trail</p>
                <p className="text-[11px] text-muted">View exact ITC offset order and law provisions</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCalcDrawer(true)}
              className="text-xs font-bold text-brand hover:underline px-3 py-1.5"
            >
              How we calculated →
            </button>
          </div>

          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="text-xs font-semibold text-muted hover:text-ink px-4 py-2 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Review and Authorise Filing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: FILE & CONSENT */}
      {currentStep === 5 && (
        <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
              Step 5 of 5 · Final Authorisation
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink tracking-tight">
              Ready to submit GSTR-3B for October 2026
            </h2>
            <p className="text-sm text-muted">
              One final step: Review the summary and sign with government EVC / OTP.
            </p>
          </div>

          {/* Filing Summary Card */}
          <div className="p-5 rounded-card bg-[#0C2A20] text-white border border-brand/40 shadow-lift space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-heading font-bold text-sm text-white">Filing Summary</span>
              <span className="text-xs font-mono text-accent">32ABCDE1234F1Z5</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-white/60 block">Taxable Sales</span>
                <span className="font-mono font-bold text-sm sm:text-base text-white">
                  {formatINR(gstResult.taxableSales)}
                </span>
              </div>
              <div>
                <span className="text-white/60 block">Output Tax</span>
                <span className="font-mono font-bold text-sm sm:text-base text-white">
                  {formatINR(gstResult.outputTax.total)}
                </span>
              </div>
              <div>
                <span className="text-white/60 block">Eligible ITC</span>
                <span className="font-mono font-bold text-sm sm:text-base text-accent">
                  {formatINR(gstResult.eligibleItc.total)}
                </span>
              </div>
              <div>
                <span className="text-white/60 block">Net Payable</span>
                <span className="font-mono font-bold text-base sm:text-lg text-ok">
                  {formatINR(gstResult.netPayable.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-card bg-bg border border-line cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="mt-1 w-4 h-4 text-brand rounded border-line focus:ring-brand accent-brand cursor-pointer"
            />
            <div className="text-xs text-ink leading-relaxed">
              <p className="font-bold text-ink">Statutory Declaration</p>
              <p className="text-muted mt-0.5">
                I hereby solemnly affirm that the information given above is true and correct to the best of my knowledge and belief, and nothing has been concealed therefrom.
              </p>
            </div>
          </label>

          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-xs font-semibold text-muted hover:text-ink px-4 py-2 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="button"
              disabled={!hasConsented}
              onClick={handleAuthorizeFiling}
              className={`px-6 py-3 rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-all ${
                hasConsented
                  ? 'bg-brand hover:bg-brand/90 text-white cursor-pointer active:scale-95'
                  : 'bg-line text-muted cursor-not-allowed'
              }`}
            >
              <Lock className="w-4 h-4 text-accent" />
              <span>Review and Authorise Filing (OTP)</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUCCESS & CONFETTI SCREEN */}
      {currentStep === 6 && (
        <div className="bg-surface rounded-card p-6 sm:p-10 border border-line shadow-lift text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-ok text-white mx-auto flex items-center justify-center shadow-lift">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <span className="text-xs font-bold text-ok uppercase tracking-wider bg-ok/10 px-3 py-1 rounded-chip">
              Government Filing Complete
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-heading font-black text-ink tracking-tight">
              GSTR-3B Filed Successfully!
            </h2>
            <p className="text-sm text-muted mt-1 max-w-md mx-auto">
              Your return for October 2026 has been submitted and acknowledged by the GST Portal.
            </p>
          </div>

          {/* Acknowledgement Details Card */}
          <div className="max-w-md mx-auto p-5 rounded-card bg-bg border border-line text-left space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-line text-xs">
              <span className="text-muted">Acknowledgement No. (ARN)</span>
              <span className="font-mono font-bold text-brand">{arnNumber}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-line text-xs">
              <span className="text-muted">Filing Date & Timestamp</span>
              <span className="font-medium text-ink">31 Oct 2026, 20:30 IST</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-line text-xs">
              <span className="text-muted">Net Tax Amount Paid</span>
              <span className="font-bold text-ink tabular-nums">{formatINR(gstResult.netPayable.total)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">Compliance Score Updated</span>
              <span className="font-bold text-ok">92 → 95 / 100</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2.5 bg-brand text-white rounded-btn text-xs font-bold hover:bg-brand/90 transition-colors shadow-soft"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => navigate('/app/vault')}
              className="px-5 py-2.5 bg-surface border border-line text-ink rounded-btn text-xs font-semibold hover:bg-bg transition-colors"
            >
              Download Ack Receipt (PDF)
            </button>
          </div>

          {/* Mandatory Referral Banner */}
          <div className="pt-4 text-left">
            <ReferralBanner />
          </div>
        </div>
      )}

      {/* OTP / EVC MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface rounded-card max-w-sm w-full p-6 border border-line shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <h3 className="font-heading font-bold text-base text-ink">Government EVC Verification</h3>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-muted hover:text-ink p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              A 6-digit electronic verification code (EVC) has been sent to the Aadhaar-linked mobile of authorized signatory <strong>Anil Kumar (***-***-2819)</strong>.
            </p>

            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2">
              {otpValue.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOtpValue((prev) => {
                      const next = [...prev];
                      next[i] = val;
                      return next;
                    });
                  }}
                  className="w-10 h-12 text-center text-lg font-bold font-mono rounded-btn bg-bg border border-line focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted">
              <span>Demo code auto-filled</span>
              <button
                type="button"
                onClick={() => setOtpValue(['4', '8', '2', '9', '1', '0'])}
                className="text-brand font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Resend
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
                className="w-full py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isVerifyingOtp ? (
                  <span>Signing with GSTN Portal...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Submit & File GSTR-3B</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOW WE CALCULATED DRAWER */}
      {showCalcDrawer && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex justify-end"
          onClick={() => setShowCalcDrawer(false)}
        >
          <div
            className="w-full max-w-md bg-surface h-full p-6 shadow-2xl overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand" />
                <h3 className="font-heading font-bold text-base text-ink">Rules Engine Calculation</h3>
              </div>
              <button onClick={() => setShowCalcDrawer(false)} className="p-1 text-muted hover:text-ink">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-muted leading-relaxed space-y-3">
              <p>
                All calculations are executed in deterministic TypeScript functions in <code className="bg-bg px-1.5 py-0.5 rounded text-ink font-mono">src/lib/gst.ts</code>. No tax computation is ever generated by a probabilistic LLM.
              </p>

              <div className="p-3 bg-bg rounded-btn border border-line space-y-1.5">
                <p className="font-bold text-ink">1. Total Output Tax</p>
                <p>Taxable Sales = ₹12,40,000</p>
                <p>IGST (Inter-state) = ₹79,200</p>
                <p>CGST (Intra-state 9%) = ₹72,000</p>
                <p>SGST (Intra-state 9%) = ₹72,000</p>
                <p className="font-bold text-ink">Total Output = ₹2,23,200</p>
              </div>

              <div className="p-3 bg-bg rounded-btn border border-line space-y-1.5">
                <p className="font-bold text-ink">2. Input Tax Credit (ITC)</p>
                <p>Gross Purchase Tax = ₹1,41,300</p>
                <p>Held Exception #1 (KCW-902) = -₹18,000</p>
                <p>Held Exception #2 (CP-331) = -₹4,900</p>
                <p className="font-bold text-ok">Total Eligible ITC = ₹1,18,400</p>
              </div>

              <div className="p-3 bg-brand-soft/60 rounded-btn border border-brand/20 space-y-1.5">
                <p className="font-bold text-brand">3. Net Cash Payable</p>
                <p>Net = Output Tax (₹2,23,200) - Eligible ITC (₹1,18,400)</p>
                <p className="text-base font-heading font-extrabold text-brand">Net Payable = ₹1,04,800</p>
              </div>
            </div>

            <button
              onClick={() => setShowCalcDrawer(false)}
              className="w-full py-2.5 bg-brand text-white rounded-btn text-xs font-bold"
            >
              Close Audit Trail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
