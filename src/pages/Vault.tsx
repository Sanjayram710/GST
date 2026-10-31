import React, { useState } from 'react';
import { VAULT_DOCUMENTS, VaultDocument } from '../data/documents';
import {
  FolderArchive,
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';

export const Vault: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Certificate', 'Return', 'Challan', 'Acknowledgment', 'Audit'];

  const filteredDocs = VAULT_DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-ink">Document Vault</h1>
          <p className="text-xs text-muted">
            Bank-grade encrypted digital locker for certificates, returns, challans and acknowledgements.
          </p>
        </div>

        <button
          onClick={() => alert('Demo action: Uploaded custom document into encrypted vault.')}
          className="px-4 py-2 bg-brand text-white rounded-btn text-xs font-bold hover:bg-brand/90 transition-colors shadow-soft"
        >
          + Upload Document
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-card p-4 border border-line shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-chip text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand text-white shadow-soft'
                    : 'bg-bg text-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search filename..."
              className="pl-8 pr-3 py-1.5 bg-bg border border-line rounded-btn text-xs text-ink focus:outline-none focus:ring-1 focus:ring-brand w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-card bg-surface border border-line hover:border-brand/30 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-brand-soft text-brand">
                  {doc.format}
                </span>
                <span className="text-[10px] text-muted">{doc.size}</span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-brand mb-3">
                <FileText className="w-5 h-5 text-brand" />
              </div>

              <h3 className="font-heading font-bold text-xs text-ink line-clamp-2 leading-tight">
                {doc.name}
              </h3>
              <p className="text-[11px] text-muted mt-1">{doc.date}</p>
              {doc.arn && (
                <p className="text-[10px] font-mono text-brand truncate mt-0.5">
                  ARN: {doc.arn}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
              <span className="text-[10px] font-semibold text-muted bg-bg px-2 py-0.5 rounded-chip">
                {doc.category}
              </span>
              <button
                onClick={() => alert(`Downloading verified copy of ${doc.name}`)}
                className="p-1.5 hover:bg-brand-soft text-brand rounded-md transition-colors"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

