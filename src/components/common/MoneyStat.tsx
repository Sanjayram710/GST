import React from 'react';
import { cn, formatINR } from '../../lib/utils';

interface MoneyStatProps {
  label: string;
  amount: number;
  subtext?: string;
  trend?: string;
  highlight?: boolean;
  className?: string;
}

export const MoneyStat: React.FC<MoneyStatProps> = ({
  label,
  amount,
  subtext,
  trend,
  highlight = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-4 rounded-card border transition-all duration-150',
        highlight
          ? 'bg-brand-soft/60 border-brand/20 shadow-soft'
          : 'bg-surface border-line shadow-soft',
        className
      )}
    >
      <p className="text-xs font-medium text-muted tracking-wide uppercase">{label}</p>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-heading font-extrabold text-2xl lg:text-3xl tracking-tight text-ink tabular-nums">
          {formatINR(amount)}
        </span>
        {trend && (
          <span className="text-xs font-semibold text-ok bg-ok/10 px-2 py-0.5 rounded-chip">
            {trend}
          </span>
        )}
      </div>
      {subtext && <p className="mt-1 text-xs text-muted">{subtext}</p>}
    </div>
  );
};

