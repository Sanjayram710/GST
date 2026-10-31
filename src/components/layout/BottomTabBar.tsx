import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Sparkles,
  Receipt,
  Bot,
  Menu,
  Scale,
  FileCheck2,
  FolderArchive,
  Gift,
  Compass,
  Users2,
  MonitorCheck,
  Activity,
  X,
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { label: 'Home', to: '/app', icon: LayoutDashboard },
    { label: 'Copilot', to: '/app/copilot', icon: Sparkles, hero: true },
    { label: 'Invoices', to: '/app/invoices', icon: Receipt },
    { label: 'Assistant', to: '/app/assistant', icon: Bot },
  ];

  const moreLinks = [
    { label: 'ITC & Reconcile', to: '/app/reconcile', icon: Scale },
    { label: 'Returns History', to: '/app/returns', icon: FileCheck2 },
    { label: 'Document Vault', to: '/app/vault', icon: FolderArchive },
    { label: 'Referral Rewards', to: '/app/referral', icon: Gift },
    { label: 'Startup Express', to: '/start', icon: Compass },
    { label: 'CA Dashboard', to: '/ca', icon: Users2 },
    { label: 'Kiosk Operator', to: '/kiosk', icon: MonitorCheck },
    { label: 'API Health', to: '/admin/api-health', icon: Activity },
  ];

  return (
    <>
      {/* Slide-up "More" menu sheet */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm md:hidden flex flex-col justify-end"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="bg-surface rounded-t-[24px] p-5 border-t border-line shadow-2xl max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-line mb-3">
              <span className="font-heading font-bold text-sm text-ink">More Services</span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moreLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMoreMenu(false)}
                    className="flex items-center gap-2.5 p-3 rounded-card bg-bg hover:bg-brand-soft/40 border border-line text-xs font-semibold text-ink"
                  >
                    <Icon className="w-4 h-4 text-brand" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-line md:hidden px-2 py-1 shadow-lift">
        <div className="flex items-center justify-around h-14">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.to === '/app'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center flex-1 h-full min-w-[56px] text-[10px] font-medium transition-colors select-none',
                    isActive ? 'text-brand font-bold' : 'text-muted hover:text-ink',
                    tab.hero && 'relative'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {tab.hero ? (
                      <div className="w-10 h-10 -mt-5 rounded-full bg-brand text-white flex items-center justify-center shadow-lift border-2 border-surface">
                        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                      </div>
                    ) : (
                      <Icon className={cn('w-5 h-5 mb-0.5', isActive && 'text-brand')} />
                    )}
                    <span className={cn(tab.hero && 'mt-0.5 font-bold text-brand')}>
                      {tab.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More trigger */}
          <button
            type="button"
            onClick={() => setShowMoreMenu(true)}
            className="flex flex-col items-center justify-center flex-1 h-full min-w-[56px] text-[10px] font-medium text-muted hover:text-ink select-none"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
};

