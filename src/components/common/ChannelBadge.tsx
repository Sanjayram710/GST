import React from 'react';
import { cn } from '../../lib/utils';
import { Smartphone, Monitor, ShieldCheck, MessageSquare, LayoutGrid } from 'lucide-react';

export type ChannelType = 'mobile' | 'web' | 'kiosk' | 'whatsapp' | 'ca';

interface ChannelBadgeProps {
  channel: ChannelType;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ChannelBadge: React.FC<ChannelBadgeProps> = ({
  channel,
  isActive = false,
  onClick,
  className,
}) => {
  const configs = {
    web: { label: 'Web Portal', icon: Monitor },
    mobile: { label: 'Mobile App', icon: Smartphone },
    kiosk: { label: 'Kiosk Operator', icon: LayoutGrid },
    whatsapp: { label: 'WhatsApp Voice', icon: MessageSquare },
    ca: { label: 'CA Dashboard', icon: ShieldCheck },
  };

  const current = configs[channel];
  const Icon = current.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-chip text-xs font-medium transition-all duration-150',
        isActive
          ? 'bg-brand text-white shadow-soft font-semibold'
          : 'bg-white hover:bg-brand-soft text-ink border border-line hover:border-brand/30',
        className
      )}
    >
      <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-white' : 'text-brand')} />
      <span>{current.label}</span>
    </button>
  );
};

