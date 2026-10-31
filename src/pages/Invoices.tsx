import React, { useState } from 'react';
import { SALES_INVOICES } from '../data/salesInvoices';
import { PURCHASE_INVOICES } from '../data/purchaseInvoices';
import { Invoice } from '../lib/gst';
import { formatINR } from '../lib/utils';
import {
  Search,
  Upload,
  FileSpreadsheet,
  FileText,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  Calendar,
  Building,
  CreditCard,
  Download,
} from 'lucide-react';

export const Invoices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sales' | 'purchases'>('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'matched' | 'hold' | 'mismatch'>('all');

  const currentList = activeTab === 'sales' ? SALES_INVOICES : PURCHASE_INVOICES;

  const filteredInvoices = currentList.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.partyGstin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'matched'
        ? inv.status === 'matched'
        : inv.status === 'hold' || inv.status === 'mismatch';

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink">Invoices Register</h1>
          <p className="text-xs text-muted">
            Manage your B2B sales bills and supplier tax vouchers for October 2026.
          </p>
        </div>

        {/* Import Sources Row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Demo action: Parsed Excel sales sheet (48 records uploaded).')}
            className="px-3.5 py-2 bg-brand text-white rounded-btn text-xs font-bold hover:bg-brand/90 transition-colors shadow-soft flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-accent" />
            <span>Import Excel</span>
          </button>
          <button
            onClick={() => alert('Demo notice: Tally connector requires TallyPrime running on port 9000.')}
            className="px-3 py-2 bg-surface hover:bg-bg border border-line text-ink rounded-btn text-xs font-medium"
          >
            Tally
          </button>
          <button
            onClick={() => alert('Demo notice: Zoho Books OAuth sync available in full edition.')}
            className="px-3 py-2 bg-surface hover:bg-bg border border-line text-ink rounded-btn text-xs font-medium"
          >
            Zoho
          </button>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
          {/* Sales vs Purchases Tabs */}
          <div className="flex items-center gap-2 p-1 bg-bg rounded-btn border border-line w-fit">
            <button
              onClick={() => {
                setActiveTab('sales');
                setSearchQuery('');
              }}
              className={`px-4 py-1.5 rounded-btn text-xs font-bold transition-all ${
                activeTab === 'sales'
                  ? 'bg-brand text-white shadow-soft'
                  : 'text-muted hover:text-ink'
              }`}
            >
              Sales ({SALES_INVOICES.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('purchases');
                setSearchQuery('');
              }}
              className={`px-4 py-1.5 rounded-btn text-xs font-bold transition-all ${
                activeTab === 'purchases'
                  ? 'bg-brand text-white shadow-soft'
                  : 'text-muted hover:text-ink'
              }`}
            >
              Purchases ({PURCHASE_INVOICES.length})
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search party or invoice #..."
                className="pl-8 pr-3 py-1.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand w-48 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="matched">Verified / OK</option>
              <option value="hold">On Hold / Exception</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line text-muted font-semibold bg-bg/50">
                <th className="py-2.5 px-3">Invoice #</th>
                <th className="py-2.5 px-3">Party Name</th>
                <th className="py-2.5 px-3 font-mono">GSTIN</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Taxable Value</th>
                <th className="py-2.5 px-3 text-right">Tax Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filteredInvoices.map((inv) => {
                const isHold = inv.status === 'hold' || inv.status === 'mismatch';
                return (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className="hover:bg-brand-soft/20 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-ink">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-3 font-medium text-ink max-w-[200px] truncate">
                      {inv.partyName}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-muted">
                      {inv.partyGstin}
                    </td>
                    <td className="py-3 px-3 text-muted">{inv.date}</td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-ink tabular-nums">
                      {formatINR(inv.taxableAmount)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-brand tabular-nums">
                      {formatINR(inv.totalTax)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-chip text-[10px] font-bold ${
                          isHold
                            ? 'bg-warn/20 text-amber-900 border border-warn/30'
                            : 'bg-ok/10 text-ok border border-ok/20'
                        }`}
                      >
                        {isHold ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        <span>{isHold ? 'Exception' : 'Matched'}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Slide-over Drawer */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex justify-end"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="w-full max-w-md bg-surface h-full p-6 shadow-2xl overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Invoice Details
                </span>
                <h3 className="font-heading font-bold text-lg text-ink font-mono">
                  {selectedInvoice.invoiceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-full hover:bg-bg text-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-card bg-bg border border-line space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted">Party Name</span>
                  <span className="font-bold text-ink">{selectedInvoice.partyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Party GSTIN</span>
                  <span className="font-mono font-bold text-ink">{selectedInvoice.partyGstin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Invoice Date</span>
                  <span className="font-medium text-ink">{selectedInvoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Supply Type</span>
                  <span className="font-medium text-ink">{selectedInvoice.type}</span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div className="p-3 rounded-btn bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <p className="font-bold">Compliance Note:</p>
                  <p className="mt-0.5">{selectedInvoice.notes}</p>
                </div>
              )}

              <div className="p-4 rounded-card bg-surface border border-line space-y-2 shadow-soft">
                <div className="flex justify-between text-muted">
                  <span>Taxable Value</span>
                  <span className="font-mono">{formatINR(selectedInvoice.taxableAmount)}</span>
                </div>
                {selectedInvoice.igst > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>Integrated Tax (IGST)</span>
                    <span className="font-mono">{formatINR(selectedInvoice.igst)}</span>
                  </div>
                )}
                {selectedInvoice.cgst > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>Central Tax (CGST)</span>
                    <span className="font-mono">{formatINR(selectedInvoice.cgst)}</span>
                  </div>
                )}
                {selectedInvoice.sgst > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>State Tax (SGST)</span>
                    <span className="font-mono">{formatINR(selectedInvoice.sgst)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-line flex justify-between font-bold text-ink text-sm">
                  <span>Total Amount</span>
                  <span className="font-mono text-brand">{formatINR(selectedInvoice.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => alert(`Downloaded copy of ${selectedInvoice.invoiceNumber}`)}
                className="flex-1 py-2.5 bg-brand text-white rounded-btn text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
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

