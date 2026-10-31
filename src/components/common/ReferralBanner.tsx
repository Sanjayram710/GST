import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Gift, Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReferralBannerProps {
  className?: string;
  variant?: 'card' | 'compact';
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({
  className,
  variant = 'card',
}) => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://gstsimple.in/r/MALABAR92';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center justify-between gap-3 p-3.5 bg-accent/15 border border-accent/40 rounded-card',
          className
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/25 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4 text-ink" />
          </div>
          <div>
            <p className="text-xs font-bold text-ink">Earn ₹1,000 credit per referral</p>
            <p className="text-[11px] text-muted">Invite another trader or small business</p>
          </div>
        </div>
        <Link
          to="/app/referral"
          className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
        >
          Refer <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden p-5 rounded-card bg-[#0C2A20] text-white border border-brand/40 shadow-lift',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-accent text-ink flex items-center justify-center shrink-0 font-bold">
            <Gift className="w-5 h-5 text-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-chip bg-accent text-ink text-[11px] font-extrabold uppercase tracking-wider">
                Growth Rewards
              </span>
              <span className="text-xs text-white/70">Zero-cost filing</span>
            </div>
            <h4 className="mt-1 font-heading text-lg font-bold text-white tracking-tight">
              Refer a business and receive ₹1,000 credit
            </h4>
            <p className="text-xs text-white/80 max-w-lg mt-0.5 leading-relaxed">
              When a fellow trader signs up and completes their first return, both of you get ₹1,000 compliance credits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-btn text-xs font-medium border border-white/20 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied link!' : 'Copy invite link'}</span>
          </button>
          <Link
            to="/app/referral"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent/90 text-ink rounded-btn text-xs font-bold transition-transform active:scale-95"
          >
            <span>View rewards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

