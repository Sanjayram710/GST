import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-surface border border-dashed border-line rounded-card',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-brand-soft flex items-center justify-center text-brand mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-heading text-base font-bold text-ink">{title}</h3>
      <p className="text-xs text-muted max-w-sm mt-1 leading-relaxed">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-brand text-white rounded-btn text-xs font-semibold hover:bg-brand/90 transition-colors shadow-soft"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

