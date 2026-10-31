import React from 'react';
import { cn } from '../../lib/utils';

export type StatusVariant = 'ok' | 'warn' | 'risk';

interface StatusDotProps {
  status: StatusVariant;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  size = 'md',
  pulse = false,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  };

  const bgColors = {
    ok: 'bg-ok',
    warn: 'bg-warn',
    risk: 'bg-risk',
  };

  const pulseColors = {
    ok: 'bg-ok/40',
    warn: 'bg-warn/40',
    risk: 'bg-risk/40',
  };

  return (
    <span className={cn('relative inline-flex items-center justify-center shrink-0', className)}>
      {pulse && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full animate-ping opacity-75',
            pulseColors[status]
          )}
        />
      )}
      <span className={cn('rounded-full', sizeClasses[size], bgColors[status])} />
    </span>
  );
};

