import React from 'react';
import { cn } from '../../lib/utils';
import { StatusDot } from './StatusDot';
import { CheckCircle2, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';

export interface ApiStatusItem {
  id: number;
  api: string;
  group: string;
  status: 'working' | 'not_working' | 'not_tested' | 'partial';
}

interface ApiHealthRowProps {
  item: ApiStatusItem;
  className?: string;
}

export const ApiHealthRow: React.FC<ApiHealthRowProps> = ({ item, className }) => {
  const statusConfig = {
    working: {
      label: 'Operational',
      dot: 'ok' as const,
      icon: CheckCircle2,
      badgeClass: 'bg-ok/10 text-ok border-ok/30',
    },
    not_working: {
      label: 'Failing',
      dot: 'risk' as const,
      icon: XCircle,
      badgeClass: 'bg-risk/10 text-risk border-risk/30 font-semibold',
    },
    partial: {
      label: 'Partial',
      dot: 'warn' as const,
      icon: AlertTriangle,
      badgeClass: 'bg-warn/10 text-warn border-warn/30',
    },
    not_tested: {
      label: 'Not Tested',
      dot: 'warn' as const,
      icon: HelpCircle,
      badgeClass: 'bg-slate-100 text-muted border-slate-200',
    },
  };

  const current = statusConfig[item.status] || statusConfig.not_tested;
  const Icon = current.icon;

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 bg-surface hover:bg-brand-soft/20 border border-line rounded-btn transition-colors text-xs gap-3',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <StatusDot status={current.dot} size="sm" />
        <div className="min-w-0 truncate">
          <p className="font-medium text-ink truncate">{item.api}</p>
          <p className="text-[11px] text-muted truncate">Category: {item.group}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-chip border text-[11px] font-medium',
            current.badgeClass
          )}
        >
          <Icon className="w-3 h-3" />
          <span>{current.label}</span>
        </span>
      </div>
    </div>
  );
};

