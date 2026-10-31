import React from 'react';
import { cn } from '../../lib/utils';
import { Calendar, AlertCircle } from 'lucide-react';

interface DeadlineChipProps {
  daysRemaining: number;
  dueDate: string;
  className?: string;
}

export const DeadlineChip: React.FC<DeadlineChipProps> = ({
  daysRemaining,
  dueDate,
  className,
}) => {
  const isUrgent = daysRemaining <= 5;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-chip text-xs font-medium border',
        isUrgent
          ? 'bg-risk/10 border-risk/30 text-risk font-semibold'
          : 'bg-warn/10 border-warn/30 text-ink',
        className
      )}
    >
      {isUrgent ? (
        <AlertCircle className="w-3.5 h-3.5 text-risk shrink-0" />
      ) : (
        <Calendar className="w-3.5 h-3.5 text-muted shrink-0" />
      )}
      <span>
        Due in <strong className="font-bold">{daysRemaining} days</strong> ({dueDate})
      </span>
    </div>
  );
};

