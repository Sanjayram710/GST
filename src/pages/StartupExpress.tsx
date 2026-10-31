import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Building2,
  CreditCard,
  FileText,
  Landmark,
  Receipt,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from 'lucide-react';

export const StartupExpress: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [structure, setStructure] = useState<'Proprietorship' | 'Partnership-LLP' | 'Private Limited' | 'Other'>('Partnership-LLP');
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const isMcaNeeded = structure === 'Partnership-LLP' || structure === 'Private Limited';

  const steps = [
    { num: 1, title: 'Business Structure', icon: Building2, desc: 'Choose your entity type' },
    { num: 2, title: 'PAN & Identity', icon: CreditCard, desc: 'Promoter & entity tax ID' },
    ...(isMcaNeeded ? [{ num: 3, title: 'MCA Registration', icon: FileText, desc: 'Ministry of Corporate Affairs incorporation' }] : []),
    { num: 4, title: 'GST Registration', icon: Sparkles, desc: 'State GSTIN & REG-06' },
    { num: 5, title: 'Bank & Accounting', icon: Landmark, desc: 'Current account & books' },
    { num: 6, title: 'Invoicing & First Return', icon: Receipt, desc: 'Billing setup & GSTR ready' },
  ];

  const handleMarkDone = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps((prev) => [...prev, stepNum]);
    }
    if (stepNum < 6) {
      setCurrentStep(stepNum + 1);
    }
  };

  const isStepComplete = (stepNum: number) => completedSteps.includes(stepNum);

  return (
    <div className="min-h-screen bg-bg text-ink p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-heading font-black text-sm shadow-soft">
            GST
          </Link>
          <div>
            <h1 className="font-heading font-extrabold text-xl text-ink">Startup Express</h1>
            <p className="text-xs text-muted">Guided launchpad for Indian MSMEs & Traders</p>
          </div>
        </div>
        <Link to="/app" className="text-xs font-semibold text-brand hover:underline">
          Skip to Dashboard →
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface p-4 rounded-card border border-line shadow-soft space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-ink">Progress: Step {currentStep} of {steps.length}</span>
          <span className="font-semibold text-brand">{Math.round((completedSteps.length / steps.length) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = isStepComplete(s.num);
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`p-2 rounded-btn text-left border text-xs transition-all ${
                  isCurrent
                    ? 'bg-brand text-white border-brand shadow-soft'
                    : isDone
                    ? 'bg-brand-soft border-brand/20 text-brand'
                    : 'bg-bg border-transparent text-muted'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-ok" /> : <Icon className="w-3.5 h-3.5" />}
                  <span className="font-bold">Step {s.num}</span>
                </div>
                <p className="text-[10px] truncate leading-tight">{s.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-surface rounded-card p-6 sm:p-8 border border-line shadow-soft space-y-6">
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 1: Entity Structure
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mt-1">
                Select your business legal structure
              </h2>
              <p className="text-xs text-muted mt-1">
                Your choice determines whether MCA registration is mandatory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: 'Proprietorship', desc: 'Single owner, simplest compliance, linked to personal PAN.' },
                { type: 'Partnership-LLP', desc: 'Limited liability, registered with MCA, ideal for trade firms.', tag: 'Popular for Traders' },
                { type: 'Private Limited', desc: 'Separate corporate identity, scalable, investor friendly.' },
                { type: 'Other', desc: 'Trust, Society, or Producer Company.' },
              ].map((opt) => (
                <div
                  key={opt.type}
                  onClick={() => setStructure(opt.type as any)}
                  className={`p-4 rounded-card border cursor-pointer transition-all ${
                    structure === opt.type
                      ? 'bg-brand-soft/60 border-brand shadow-soft'
                      : 'bg-bg border-line hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-ink">{opt.type}</span>
                    {structure === opt.type && <CheckCircle2 className="w-4 h-4 text-brand" />}
                  </div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{opt.desc}</p>
                  {opt.tag && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-chip">
                      {opt.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-btn bg-bg border border-line text-xs space-y-1">
              <span className="font-bold text-ink">Required Documents:</span>
              <p className="text-muted">Aadhaar card, PAN card of promoters, electricity bill / rent agreement for business address.</p>
            </div>

            <button
              onClick={() => handleMarkDone(1)}
              className="w-full sm:w-auto px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center justify-center gap-2"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 2: PAN & Identity
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mt-1">
                Permanent Account Number (PAN)
              </h2>
              <p className="text-xs text-muted mt-1">
                For {structure}, a dedicated entity PAN is auto-verified with NSDL/UTIITSL.
              </p>
            </div>

            <div className="space-y-3 max-w-md">
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Entity PAN Number</label>
                <input
                  type="text"
                  defaultValue="ABCDE1234F"
                  className="w-full p-2.5 rounded-btn bg-bg border border-line text-sm font-mono font-bold uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-ink block mb-1">Legal Name as per PAN</label>
                <input
                  type="text"
                  defaultValue="Malabar Spice Traders LLP"
                  className="w-full p-2.5 rounded-btn bg-bg border border-line text-sm font-bold"
                />
              </div>
            </div>

            <button
              onClick={() => handleMarkDone(2)}
              className="px-6 py-3 bg-brand text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 3 && isMcaNeeded && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 3: Ministry of Corporate Affairs (MCA)
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mt-1">
                Incorporation & Name Approval
              </h2>
              <p className="text-xs text-muted mt-1">
                Name reservation (RUN) and FiLLiP incorporation certificate generation.
              </p>
            </div>

            <div className="p-4 rounded-card bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold">✓ MCA Certificate of Incorporation Ready</p>
              <p>LLPIN: AAY-8821 · Registered at Registrar of Companies, Ernakulam, Kerala.</p>
            </div>

            <button
              onClick={() => handleMarkDone(3)}
              className="px-6 py-3 bg-brand text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2"
            >
              <span>Mark Done & Proceed to GST</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 4: GST Registration
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mt-1">
                GSTIN Issuance & Aadhaar Authentication
              </h2>
              <p className="text-xs text-muted mt-1">
                Form GST REG-01 submitted. ARN generated and certificate REG-06 issued.
              </p>
            </div>

            <div className="p-4 rounded-card bg-[#0C2A20] text-white border border-brand/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Allocated GSTIN</span>
                <span className="font-mono font-bold text-accent text-sm">32ABCDE1234F1Z5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Jurisdiction</span>
                <span>Ward 3, Commercial Tax Complex, Mattancherry, Kochi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Certificate</span>
                <span className="text-ok font-bold">REG-06 Issued</span>
              </div>
            </div>

            <button
              onClick={() => handleMarkDone(4)}
              className="px-6 py-3 bg-brand text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2"
            >
              <span>Activate GST & Proceed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-soft px-2.5 py-0.5 rounded-chip">
                Step 5: Bank & Accounting
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink mt-1">
                Bank Current Account & Accounting Link
              </h2>
              <p className="text-xs text-muted mt-1">
                Link your bank account for GST PMT-06 challan payments and sync with Tally/Zoho.
              </p>
            </div>

            <div className="p-4 rounded-card bg-bg border border-line text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted">Primary Bank</span>
                <span className="font-bold text-ink">State Bank of India (Mattancherry Branch)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">IFSC Code</span>
                <span className="font-mono font-bold text-ink">SBIN0001234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Bank Validation</span>
                <span className="text-ok font-bold">✓ Verified via Penny Drop</span>
              </div>
            </div>

            <button
              onClick={() => handleMarkDone(5)}
              className="px-6 py-3 bg-brand text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2"
            >
              <span>Confirm Bank Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-ok text-white mx-auto flex items-center justify-center shadow-lift">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-ink">
                Startup Express Completed!
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mt-1">
                <strong>Malabar Spice Traders</strong> is legally incorporated, GST-registered, and ready for invoicing and return filing.
              </p>
            </div>

            <div className="p-5 rounded-card bg-bg border border-line max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">GSTIN</span>
                <span className="font-mono font-bold text-brand">32ABCDE1234F1Z5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Initial Compliance Score</span>
                <span className="font-bold text-ok">92 / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">First Return Due</span>
                <span className="font-bold text-ink">GSTR-3B (October 2026)</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/app')}
              className="px-8 py-3.5 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-lift"
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

