import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Sparkles,
  Receipt,
  Scale,
  FileCheck2,
  Bot,
  FolderArchive,
  Gift,
  Compass,
  Users2,
  MonitorCheck,
  Activity,
  LogOut,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const mainNav = [
    { label: 'Dashboard', to: '/app', icon: LayoutDashboard },
    { label: 'GST Copilot', to: '/app/copilot', icon: Sparkles, badge: 'Hero' },
    { label: 'Invoices', to: '/app/invoices', icon: Receipt },
    { label: 'ITC & Reconcile', to: '/app/reconcile', icon: Scale, badge: '2' },
    { label: 'Returns', to: '/app/returns', icon: FileCheck2 },
    { label: 'AI Assistant', to: '/app/assistant', icon: Bot },
    { label: 'Document Vault', to: '/app/vault', icon: FolderArchive },
    { label: 'Referral Rewards', to: '/app/referral', icon: Gift },
  ];

  const secondaryNav = [
    { label: 'Startup Express', to: '/start', icon: Compass },
    { label: 'CA Dashboard', to: '/ca', icon: Users2 },
    { label: 'Kiosk Mode', to: '/kiosk', icon: MonitorCheck },
    { label: 'API Health', to: '/admin/api-health', icon: Activity },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-line h-screen sticky top-0 flex flex-col justify-between hidden md:flex shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-line flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center font-heading font-black text-base shadow-soft">
              GST
            </div>
            <div>
              <span className="font-heading font-black text-base text-ink tracking-tight block leading-tight">
                SimpleGST
              </span>
              <span className="text-[10px] text-muted font-medium tracking-wide">
                Digital Assistant
              </span>
            </div>
          </Link>
          <span className="text-[10px] font-mono font-semibold bg-brand-soft text-brand px-2 py-0.5 rounded-chip">
            v1.0 Demo
          </span>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">
            Core Workflow
          </div>
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-btn text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-brand text-white shadow-soft font-semibold'
                      : 'text-ink/80 hover:bg-bg hover:text-ink'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-white' : 'text-muted group-hover:text-brand'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          'text-[10px] font-bold px-1.5 py-0.5 rounded-chip',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-accent/20 text-amber-900'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Secondary / Channel Views */}
        <div className="px-3 pt-2 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-muted uppercase tracking-wider">
            Channels & Tools
          </div>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-all group',
                    isActive
                      ? 'bg-bg text-brand font-semibold border border-line'
                      : 'text-muted hover:bg-bg hover:text-ink'
                  )
                }
              >
                <Icon className="w-4 h-4 text-muted group-hover:text-brand" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Profile / Trust Badge */}
      <div className="p-4 border-t border-line">
        <div className="p-3 bg-bg rounded-btn border border-line flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-ink truncate">Malabar Spice Traders</p>
            <p className="text-[10px] text-ok font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ok" /> Score: 92/100 · Good Standing
            </p>
          </div>
          <Link to="/" title="Back to Landing" className="p-1.5 hover:bg-slate-200 rounded-md text-muted hover:text-ink">
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

