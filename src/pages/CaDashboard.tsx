import React, { useState } from 'react';
import { CA_CLIENTS, ClientAccount } from '../data/clients';
import { StatusDot } from '../components/common/StatusDot';
import { formatINR } from '../lib/utils';
import {
  Users2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  FileCheck2,
  X,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CaDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ragFilter, setRagFilter] = useState<'all' | 'ok' | 'warn' | 'risk'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientAccount | null>(null);

  const filteredClients = CA_CLIENTS.filter((c) => {
    const matchesRag = ragFilter === 'all' || c.ragStatus === ragFilter;
    const matchesSearch =
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRag && matchesSearch;
  });

  const dueThisWeekCount = CA_CLIENTS.filter((c) => c.daysRemaining <= 7).length;
  const mismatchClientsCount = CA_CLIENTS.filter((c) => c.itcMismatch > 0).length;

  const handleBulkFile = () => {
    alert('Bulk Filing Triggered: 5 ready client returns (including Malabar Spice Traders) submitted to GSTN queue.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-ink">Chartered Accountant Suite</h1>
            <span className="text-[10px] font-bold bg-brand text-white px-2 py-0.5 rounded-chip">
              Practice Pro
            </span>
          </div>
          <p className="text-xs text-muted">
            Managing 12 client portfolios across Kerala & South India commercial circles.
          </p>
        </div>

        <button
          onClick={handleBulkFile}
          className="px-5 py-2.5 bg-brand hover:bg-brand/90 text-white rounded-btn text-xs font-bold shadow-soft flex items-center gap-2 transition-transform active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span>File All Ready Returns (5)</span>
        </button>
      </div>

      {/* Top KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <span className="text-xs font-medium text-muted">Total Active Clients</span>
          <p className="text-3xl font-heading font-extrabold text-ink mt-1">12</p>
          <p className="text-[11px] text-ok font-semibold mt-0.5">All GSTIN registrations active</p>
        </div>
        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <span className="text-xs font-medium text-muted">Filings Due This Week</span>
          <p className="text-3xl font-heading font-extrabold text-risk mt-1">{dueThisWeekCount}</p>
          <p className="text-[11px] text-risk font-semibold mt-0.5">Due on or before 07 Nov 2026</p>
        </div>
        <div className="p-4 rounded-card bg-surface border border-line shadow-soft">
          <span className="text-xs font-medium text-muted">Clients With ITC Mismatches</span>
          <p className="text-3xl font-heading font-extrabold text-warn mt-1">{mismatchClientsCount}</p>
          <p className="text-[11px] text-amber-800 font-semibold mt-0.5">Require supplier follow-up</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* RAG Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setRagFilter('all')}
            className={`px-3 py-1.5 rounded-chip text-xs font-bold transition-all ${
              ragFilter === 'all' ? 'bg-brand text-white shadow-soft' : 'bg-bg text-muted hover:text-ink'
            }`}
          >
            All Clients (12)
          </button>
          <button
            onClick={() => setRagFilter('ok')}
            className={`px-3 py-1.5 rounded-chip text-xs font-bold flex items-center gap-1.5 transition-all ${
              ragFilter === 'ok' ? 'bg-ok text-white shadow-soft' : 'bg-ok/10 text-ok hover:bg-ok/20'
            }`}
          >
            <StatusDot status="ok" size="sm" /> Green (6)
          </button>
          <button
            onClick={() => setRagFilter('warn')}
            className={`px-3 py-1.5 rounded-chip text-xs font-bold flex items-center gap-1.5 transition-all ${
              ragFilter === 'warn' ? 'bg-warn text-white shadow-soft' : 'bg-warn/15 text-amber-900 hover:bg-warn/25'
            }`}
          >
            <StatusDot status="warn" size="sm" /> Amber (4)
          </button>
          <button
            onClick={() => setRagFilter('risk')}
            className={`px-3 py-1.5 rounded-chip text-xs font-bold flex items-center gap-1.5 transition-all ${
              ragFilter === 'risk' ? 'bg-risk text-white shadow-soft' : 'bg-risk/10 text-risk hover:bg-risk/20'
            }`}
          >
            <StatusDot status="risk" size="sm" /> Red (2)
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client or GSTIN..."
            className="pl-8 pr-3 py-1.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand w-full sm:w-60"
          />
        </div>
      </div>

      {/* Clients Desktop Table */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line text-muted font-semibold bg-bg/50">
              <th className="py-2.5 px-3">Client Business</th>
              <th className="py-2.5 px-3 font-mono">GSTIN</th>
              <th className="py-2.5 px-3 text-center">Score</th>
              <th className="py-2.5 px-3 text-center">Health</th>
              <th className="py-2.5 px-3">Next Due</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Manager</th>
              <th className="py-2.5 px-3 text-right">Est. Tax</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {filteredClients.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelectedClient(c)}
                className="hover:bg-brand-soft/20 cursor-pointer transition-colors"
              >
                <td className="py-3 px-3 font-heading font-bold text-ink">
                  <div>
                    {c.businessName}
                    <span className="block text-[10px] text-muted font-normal">{c.tradeType}</span>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-[11px] text-muted">{c.gstin}</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-ink">
                  {c.complianceScore}
                </td>
                <td className="py-3 px-3 text-center">
                  <StatusDot status={c.ragStatus} size="md" pulse={c.ragStatus === 'risk'} />
                </td>
                <td className="py-3 px-3">
                  <span className={c.daysRemaining <= 5 ? 'text-risk font-bold' : 'text-ink'}>
                    {c.nextDue} ({c.daysRemaining}d)
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-chip text-[10px] font-bold ${
                      c.status === 'Ready to file'
                        ? 'bg-brand-soft text-brand'
                        : c.status === 'Filed'
                        ? 'bg-ok/10 text-ok'
                        : c.status === 'Action required'
                        ? 'bg-risk/10 text-risk'
                        : 'bg-warn/20 text-amber-900'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-muted">{c.assignedManager}</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-ink tabular-nums">
                  {formatINR(c.estimatedTax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client Inspection Drawer */}
      {selectedClient && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex justify-end"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="w-full max-w-md bg-surface h-full p-6 shadow-2xl overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Client Profile & Return State
                </span>
                <h3 className="font-heading font-bold text-lg text-ink">
                  {selectedClient.businessName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded-full hover:bg-bg text-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-card bg-bg border border-line space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted">GSTIN</span>
                  <span className="font-mono font-bold text-ink">{selectedClient.gstin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Compliance Score</span>
                  <span className="font-bold text-ok">{selectedClient.complianceScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Assigned CA Manager</span>
                  <span className="font-bold text-ink">{selectedClient.assignedManager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Next Filing Deadline</span>
                  <span className="font-bold text-risk">{selectedClient.nextDue}</span>
                </div>
              </div>

              <div className="p-4 rounded-card bg-[#0C2A20] text-white space-y-3">
                <p className="font-heading font-bold text-sm text-white">Copilot Prepared Figures</p>
                <div className="flex justify-between">
                  <span className="text-white/70">Estimated Tax Payable:</span>
                  <span className="font-mono font-bold text-accent text-sm">
                    {formatINR(selectedClient.estimatedTax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Unresolved 2B Mismatches:</span>
                  <span className="font-mono font-bold text-risk text-sm">
                    {formatINR(selectedClient.itcMismatch)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedClient(null);
                  navigate('/app/copilot');
                }}
                className="flex-1 py-2.5 bg-brand text-white rounded-btn text-xs font-bold shadow-soft flex items-center justify-center gap-1.5"
              >
                <span>Open Copilot View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2.5 bg-surface border border-line text-ink rounded-btn text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

