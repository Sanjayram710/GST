import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChannelBadge, ChannelType } from '../common/ChannelBadge';
import { CURRENT_BUSINESS } from '../../data/business';
import { WhatsAppModal } from './WhatsAppModal';
import { Activity, Bell, Sparkles, Shield, ChevronDown } from 'lucide-react';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const isKiosk = location.pathname.startsWith('/kiosk');
  const isCa = location.pathname.startsWith('/ca');
  const isApi = location.pathname.startsWith('/admin/api-health');

  const getActiveChannel = (): ChannelType => {
    if (isCa) return 'ca';
    if (isKiosk) return 'kiosk';
    return 'web';
  };

  const handleChannelClick = (channel: ChannelType) => {
    if (channel === 'kiosk') {
      navigate('/kiosk');
    } else if (channel === 'ca') {
      navigate('/ca');
    } else if (channel === 'whatsapp') {
      setShowWhatsApp(true);
    } else if (channel === 'web') {
      navigate('/app');
    } else if (channel === 'mobile') {
      navigate('/app');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-line px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Business Context & Period */}
        <div className="flex items-center gap-3">
          <Link to="/app" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-heading font-black text-sm shadow-soft">
              MS
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-sm text-ink">
                  {CURRENT_BUSINESS.tradeName}
                </span>
                <span className="text-[10px] font-mono bg-brand-soft text-brand font-semibold px-1.5 py-0.5 rounded-chip">
                  DEMO GSTIN
                </span>
              </div>
              <p className="text-[11px] text-muted font-mono">{CURRENT_BUSINESS.gstin}</p>
            </div>
          </Link>

          {/* Period selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-bg hover:bg-slate-200/60 rounded-btn text-ink border border-line transition-colors"
            >
              <span>{CURRENT_BUSINESS.currentPeriod}</span>
              <ChevronDown className="w-3 h-3 text-muted" />
            </button>
            {showPeriodDropdown && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-surface border border-line rounded-btn shadow-lift py-1 z-40 text-xs">
                <div className="px-3 py-1 text-[10px] font-bold text-muted uppercase">Select Period</div>
                <button
                  onClick={() => setShowPeriodDropdown(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-brand-soft text-brand font-bold flex items-center justify-between"
                >
                  <span>October 2026 (Current)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                </button>
                <button
                  onClick={() => setShowPeriodDropdown(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-bg text-ink"
                >
                  September 2026 (Filed)
                </button>
                <button
                  onClick={() => setShowPeriodDropdown(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-bg text-ink"
                >
                  August 2026 (Filed)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Channel Switcher Chips */}
        <div className="hidden lg:flex items-center gap-1.5 bg-bg/80 p-1 rounded-full border border-line/60">
          <ChannelBadge
            channel="web"
            isActive={getActiveChannel() === 'web'}
            onClick={() => handleChannelClick('web')}
          />
          <ChannelBadge
            channel="whatsapp"
            isActive={false}
            onClick={() => handleChannelClick('whatsapp')}
          />
          <ChannelBadge
            channel="kiosk"
            isActive={getActiveChannel() === 'kiosk'}
            onClick={() => handleChannelClick('kiosk')}
          />
          <ChannelBadge
            channel="ca"
            isActive={getActiveChannel() === 'ca'}
            onClick={() => handleChannelClick('ca')}
          />
        </div>

        {/* Right: Quick shortcuts & API Health */}
        <div className="flex items-center gap-2">
          {/* Quick WhatsApp button for mobile/tablet */}
          <button
            onClick={() => setShowWhatsApp(true)}
            className="lg:hidden p-2 rounded-btn bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1"
          >
            <span>WhatsApp</span>
          </button>

          <Link
            to="/admin/api-health"
            className={`p-2 rounded-btn border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isApi
                ? 'bg-brand text-white border-brand'
                : 'bg-white hover:bg-bg border-line text-ink'
            }`}
            title="182 GSP APIs Status"
          >
            <Activity className="w-3.5 h-3.5 text-ok" />
            <span className="hidden sm:inline">API Health</span>
          </Link>

          <Link
            to="/app/copilot"
            className="px-3 py-1.5 rounded-btn bg-brand hover:bg-brand/90 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-soft transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Copilot</span>
          </Link>
        </div>
      </header>

      {/* WhatsApp Modal */}
      <WhatsAppModal isOpen={showWhatsApp} onClose={() => setShowWhatsApp(false)} />
    </>
  );
};

