import React, { useState } from 'react';
import { REFERRAL_DATA } from '../data/referral';
import { formatINR } from '../lib/utils';
import {
  Gift,
  Copy,
  Check,
  Share2,
  Users,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

export const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_DATA.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Hero Banner */}
      <div className="bg-[#0C2A20] text-white rounded-card p-6 sm:p-8 border border-brand/40 shadow-lift flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-ink px-2.5 py-0.5 rounded-chip">
              MSME Referral Program
            </span>
            <span className="text-xs text-white/70">Filing Credits</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
            Refer fellow traders. File GST at zero cost.
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1 leading-relaxed">
            Give ₹1,000 credit to any business that registers or files their first GSTR return. You earn ₹1,000 credits for each successful referral.
          </p>
        </div>

        {/* Credit Balance Card */}
        <div className="p-5 rounded-card bg-white/10 border border-white/20 text-center shrink-0">
          <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">Available Credit Balance</span>
          <p className="text-3xl sm:text-4xl font-heading font-black text-accent mt-0.5 tabular-nums">
            {formatINR(REFERRAL_DATA.creditBalance)}
          </p>
          <span className="text-[11px] text-white/80 block mt-1">Applied automatically to next filing</span>
        </div>
      </div>

      {/* Share Link Card */}
      <div className="bg-surface rounded-card p-5 border border-line shadow-soft space-y-3">
        <h3 className="font-heading font-bold text-sm text-ink">Your Unique Referral Invite Link</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 p-3 rounded-btn bg-bg border border-line text-xs font-mono font-semibold text-ink flex items-center justify-between">
            <span className="truncate">{REFERRAL_DATA.referralLink}</span>
            <span className="text-[10px] font-bold text-brand bg-brand-soft px-2 py-0.5 rounded">
              Code: {REFERRAL_DATA.referralCode}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="px-5 py-3 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center justify-center gap-1.5 transition-transform active:scale-95 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
          <button
            onClick={() => {
              const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Hey! File your GST easily with SimpleGST Assistant. Use my invite link to get ₹1,000 credit: ${REFERRAL_DATA.referralLink}`
              )}`;
              window.open(waUrl, '_blank');
            }}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-btn text-xs font-bold flex items-center justify-center gap-1.5 shrink-0"
          >
            <Share2 className="w-4 h-4" /> Share on WhatsApp
          </button>
        </div>
      </div>

      {/* The Referral Loop Diagram */}
      <div className="bg-surface rounded-card p-6 border border-line shadow-soft space-y-4">
        <div>
          <h3 className="font-heading font-bold text-base text-ink">How the MSME Referral Loop Works</h3>
          <p className="text-xs text-muted">A closed-loop growth cycle ensuring zero customer acquisition friction.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {[
            { step: '1', title: 'Filing Complete', desc: 'Shop owner completes GSTR-3B in 5 steps' },
            { step: '2', title: 'Referral Prompt', desc: 'Copilot offers ₹1,000 reward link' },
            { step: '3', title: 'New Business Joins', desc: 'Peer business registers on Startup Express' },
            { step: '4', title: 'Registration Verified', desc: 'Entity PAN & GSTIN verified' },
            { step: '5', title: 'Credits Awarded', desc: 'Both accounts receive ₹1,000 filing credit' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-card bg-bg border border-line flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-full bg-brand text-white mx-auto flex items-center justify-center text-xs font-bold mb-2">
                  {item.step}
                </span>
                <p className="font-heading font-bold text-xs text-ink">{item.title}</p>
                <p className="text-[11px] text-muted mt-1 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referred Businesses Table */}
      <div className="bg-surface rounded-card p-5 border border-line shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-ink">Businesses You Referred</h3>
            <p className="text-xs text-muted">Track the onboarding and reward status of your peer invites.</p>
          </div>
          <span className="text-xs font-semibold text-brand bg-brand-soft px-3 py-1 rounded-chip">
            {REFERRAL_DATA.referredList.length} Businesses
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line text-muted font-semibold bg-bg/50">
                <th className="py-2.5 px-3">Business Name</th>
                <th className="py-2.5 px-3">Owner & Location</th>
                <th className="py-2.5 px-3">Date Joined</th>
                <th className="py-2.5 px-3 text-center">Filing Status</th>
                <th className="py-2.5 px-3 text-right">Credit Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {REFERRAL_DATA.referredList.map((ref) => (
                <tr key={ref.id} className="hover:bg-bg transition-colors">
                  <td className="py-3 px-3 font-heading font-bold text-ink">{ref.businessName}</td>
                  <td className="py-3 px-3 text-muted">{ref.ownerName} · {ref.city}</td>
                  <td className="py-3 px-3 text-muted">{ref.date}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-chip ${
                        ref.status === 'Registered & Active'
                          ? 'bg-ok/10 text-ok'
                          : ref.status === 'Filing In Progress'
                          ? 'bg-brand-soft text-brand'
                          : 'bg-slate-200 text-muted'
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-brand tabular-nums">
                    +{formatINR(ref.creditEarned)}
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

