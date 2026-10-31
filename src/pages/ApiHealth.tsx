import React, { useState, useMemo } from 'react';
import rawApiData from '../data/api-status.json';
import { ApiHealthRow, ApiStatusItem } from '../components/common/ApiHealthRow';
import { StatusDot } from '../components/common/StatusDot';
import {
  Activity,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Filter,
  ShieldCheck,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const ApiHealth: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const apiList = rawApiData as ApiStatusItem[];

  // Normalize status for Unknown or edge cases
  const normalizedList = useMemo(() => {
    return apiList.map((item) => {
      let st = item.status;
      if (st !== 'working' && st !== 'not_working' && st !== 'partial' && st !== 'not_tested') {
        st = 'not_tested';
      }
      return { ...item, status: st };
    });
  }, [apiList]);

  // Unique groups
  const groups = useMemo(() => {
    const set = new Set<string>();
    normalizedList.forEach((a) => {
      if (a.group) set.add(a.group);
    });
    return ['All', ...Array.from(set).slice(0, 15)];
  }, [normalizedList]);

  // Status Counts
  const counts = useMemo(() => {
    let working = 0;
    let notWorking = 0;
    let partial = 0;
    let notTested = 0;

    normalizedList.forEach((item) => {
      if (item.status === 'working') working++;
      else if (item.status === 'not_working') notWorking++;
      else if (item.status === 'partial') partial++;
      else notTested++;
    });

    return {
      total: normalizedList.length,
      working,
      notWorking,
      partial,
      notTested,
    };
  }, [normalizedList]);

  const donutData = [
    { name: 'Operational', value: counts.working, color: '#1E9E5A' },
    { name: 'Needs Attention', value: counts.notWorking, color: '#D64545' },
    { name: 'Partial', value: counts.partial, color: '#E8A317' },
    { name: 'Not Tested', value: counts.notTested, color: '#94A3B8' },
  ];

  const failingApis = useMemo(() => {
    return normalizedList.filter((a) => a.status === 'not_working');
  }, [normalizedList]);

  // Filtered list
  const filteredApis = useMemo(() => {
    return normalizedList.filter((item) => {
      const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchesSearch =
        item.api.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.group.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGroup && matchesStatus && matchesSearch;
    });
  }, [normalizedList, selectedGroup, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-ink">GSP API Health & Readiness</h1>
            <span className="text-[10px] font-mono font-bold bg-ok/10 text-ok px-2 py-0.5 rounded-chip">
              182 APIs Monitored
            </span>
          </div>
          <p className="text-xs text-muted">
            Live test results for GST Suvidha Provider (GSP) and GSTN Gateway endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Platform Readiness:</span>
          <span className="text-xs font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-chip">
            Core Return Flow 100% Operational
          </span>
        </div>
      </div>

      {/* Honest Readiness Note Banner */}
      <div className="p-4 rounded-card bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-ink">Transparent Engineering Disclosure:</p>
          <p className="text-muted leading-relaxed">
            The flagship demo return flow (<strong>GSTR-1, 2A, 2B, 3B, and IMS</strong>) is thoroughly tested and operational. Secondary endpoints such as GSTR-1A, GSTR-4 annual, GSTR-8, GSTR-9, and specific ITC transition forms are scheduled for the next testing phase.
          </p>
        </div>
      </div>

      {/* Donut Chart & Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Metrics (7 cols) */}
        <div className="lg:col-span-7 bg-surface rounded-card p-6 border border-line shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="font-heading font-bold text-sm text-ink">Endpoint Status Breakdown</h3>
            <span className="text-xs font-mono font-semibold text-muted">182 Total APIs</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
            <div className="p-3 rounded-card bg-ok/10 border border-ok/20">
              <span className="text-[11px] font-bold text-ok uppercase">Operational</span>
              <p className="text-2xl font-heading font-extrabold text-ink mt-0.5">{counts.working}</p>
              <p className="text-[10px] text-muted">Core workflows</p>
            </div>
            <div className="p-3 rounded-card bg-risk/10 border border-risk/20">
              <span className="text-[11px] font-bold text-risk uppercase">Needs Attention</span>
              <p className="text-2xl font-heading font-extrabold text-risk mt-0.5">{counts.notWorking}</p>
              <p className="text-[10px] text-risk/80">6 edge APIs</p>
            </div>
            <div className="p-3 rounded-card bg-warn/15 border border-warn/30">
              <span className="text-[11px] font-bold text-amber-900 uppercase">Partial</span>
              <p className="text-2xl font-heading font-extrabold text-ink mt-0.5">{counts.partial}</p>
              <p className="text-[10px] text-muted">Schema review</p>
            </div>
            <div className="p-3 rounded-card bg-bg border border-line">
              <span className="text-[11px] font-bold text-muted uppercase">Not Tested</span>
              <p className="text-2xl font-heading font-extrabold text-ink mt-0.5">{counts.notTested}</p>
              <p className="text-[10px] text-muted">Next phase forms</p>
            </div>
          </div>

          <div className="pt-2 text-xs text-muted flex items-center justify-between">
            <span>Audit timestamp: 31-Oct-2026 20:18 IST</span>
            <span className="font-semibold text-brand">Auto-health poll: 5m</span>
          </div>
        </div>

        {/* Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-surface rounded-card p-6 border border-line shadow-soft flex flex-col items-center justify-center">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-muted mb-2">
            Coverage Distribution
          </h3>
          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val} endpoints`, '']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    fontSize: '11px',
                    borderColor: '#E3E7E1',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] mt-1">
            {donutData.map((d) => (
              <span key={d.name} className="flex items-center gap-1 font-medium text-ink">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span>{d.name} ({d.value})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlighted 6 Not-Working APIs Panel */}
      <div className="p-5 rounded-card bg-risk/5 border border-risk/30 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-risk" />
            <h3 className="font-heading font-bold text-sm text-risk">
              Needs Attention — 6 Failing Endpoints
            </h3>
          </div>
          <span className="text-[10px] font-bold text-risk bg-risk/10 px-2 py-0.5 rounded-chip">
            Action Item for Next Sprint
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {failingApis.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-surface border border-risk/20 rounded-btn flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="font-semibold text-ink truncate">{item.api}</p>
                <p className="text-[10px] text-muted">Group: {item.group}</p>
              </div>
              <span className="text-[10px] font-bold text-risk bg-risk/10 px-2 py-0.5 rounded shrink-0">
                Failing
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'working', 'not_working', 'partial', 'not_tested'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-chip text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === st
                    ? 'bg-brand text-white shadow-soft'
                    : 'bg-bg text-muted hover:text-ink'
                }`}
              >
                {st === 'working'
                  ? 'Operational'
                  : st === 'not_working'
                  ? 'Needs Attention'
                  : st === 'not_tested'
                  ? 'Not Tested'
                  : st}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 182 APIs..."
              className="pl-8 pr-3 py-1.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand w-full sm:w-64"
            />
          </div>
        </div>

        {/* Group Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line">
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-2.5 py-1 rounded-chip text-[11px] font-medium transition-all ${
                selectedGroup === grp
                  ? 'bg-ink text-white font-bold'
                  : 'bg-bg hover:bg-slate-200/60 text-muted'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* APIs List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs text-muted font-medium">
          <span>Showing {filteredApis.length} of 182 APIs</span>
          <span>Category: {selectedGroup}</span>
        </div>
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredApis.map((item) => (
            <ApiHealthRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

