'use client';

import { useState } from 'react';
import { addToast } from '@/components/toast';
import { DocumentViewer } from '@/components/document-viewer';
import { clsx } from 'clsx';
import {
  FileText,
  FileSpreadsheet,
  Image,
  Search,
  Eye,
  Pencil,
  Download,
  Send,
} from 'lucide-react';

type DocType = 'all' | 'proposal' | 'invoice' | 'report' | 'post' | 'receipt';

const documents = [
  {
    id: '1', name: 'Proposal — Toyota/Aman Enterprise Mobile App', type: 'proposal',
    format: 'PDF', agent: 'Proposal Generator', date: '2026-03-20', size: '2.4 MB',
    status: 'draft', department: 'Sales', tag: '₪52K',
  },
  {
    id: '2', name: 'Invoice #2026-024 — Strauss Group', type: 'invoice',
    format: 'PDF', agent: 'Client Invoicing', date: '2026-02-28', size: '340 KB',
    status: 'sent', department: 'Finance', tag: '₪28,400',
  },
  {
    id: '3', name: 'Invoice #2026-025 — Gett', type: 'invoice',
    format: 'PDF', agent: 'Client Invoicing', date: '2026-02-28', size: '310 KB',
    status: 'sent', department: 'Finance', tag: '₪19,200',
  },
  {
    id: '4', name: 'Invoice #2026-026 — Wix Studios', type: 'invoice',
    format: 'PDF', agent: 'Client Invoicing', date: '2026-02-28', size: '380 KB',
    status: 'sent', department: 'Finance', tag: '₪36,000',
  },
  {
    id: '5', name: 'Daily Pipeline Brief — March 21', type: 'report',
    format: 'PDF', agent: 'Lead Pipeline', date: '2026-03-21', size: '180 KB',
    status: 'sent', department: 'Sales', tag: '47 leads',
  },
  {
    id: '6', name: 'Daily Pipeline Brief — March 20', type: 'report',
    format: 'PDF', agent: 'Lead Pipeline', date: '2026-03-20', size: '175 KB',
    status: 'sent', department: 'Sales', tag: '45 leads',
  },
  {
    id: '7', name: 'Monthly Billing Summary — February 2026', type: 'report',
    format: 'XLSX', agent: 'Client Invoicing', date: '2026-02-28', size: '520 KB',
    status: 'final', department: 'Finance', tag: '₪148K',
  },
  {
    id: '8', name: 'Hours Report — February 2026', type: 'report',
    format: 'PDF', agent: 'Client Invoicing', date: '2026-02-28', size: '290 KB',
    status: 'final', department: 'Finance',
  },
  {
    id: '9', name: 'LinkedIn: "Why Managed Ops Beats Hiring"', type: 'post',
    format: 'DOC', agent: 'Social Content', date: '2026-03-21', size: '45 KB',
    status: 'posted', department: 'Marketing',
  },
  {
    id: '10', name: 'Instagram Carousel — Automation ROI', type: 'post',
    format: 'PNG', agent: 'Social Content', date: '2026-03-21', size: '1.2 MB',
    status: 'posted', department: 'Marketing',
  },
  {
    id: '11', name: 'Missing Receipts List — March', type: 'receipt',
    format: 'DOC', agent: 'Receipt Matching', date: '2026-03-16', size: '32 KB',
    status: 'active', department: 'Finance', tag: '4 items',
  },
  {
    id: '12', name: 'Recruiting Report — Senior Developer', type: 'report',
    format: 'PDF', agent: 'Recruiting Pipeline', date: '2026-03-17', size: '410 KB',
    status: 'final', department: 'HR', tag: '23 apps',
  },
  {
    id: '13', name: 'Pricing Breakdown — Toyota/Aman', type: 'proposal',
    format: 'XLSX', agent: 'Proposal Generator', date: '2026-03-20', size: '180 KB',
    status: 'draft', department: 'Sales', tag: '₪52K',
  },
  {
    id: '14', name: 'Project Timeline — Toyota/Aman', type: 'proposal',
    format: 'PDF', agent: 'Proposal Generator', date: '2026-03-20', size: '95 KB',
    status: 'draft', department: 'Sales', tag: '16 weeks',
  },
  {
    id: '15', name: 'Daily Status Report — March 21', type: 'report',
    format: 'PDF', agent: 'Status Reports', date: '2026-03-21', size: '120 KB',
    status: 'sent', department: 'Operations',
  },
];

const filters: { label: string; value: DocType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Proposals', value: 'proposal' },
  { label: 'Invoices', value: 'invoice' },
  { label: 'Reports', value: 'report' },
  { label: 'Posts', value: 'post' },
  { label: 'Receipts', value: 'receipt' },
];

const formatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  XLSX: FileSpreadsheet,
  DOC: FileText,
  PNG: Image,
};

const formatColors: Record<string, string> = {
  PDF: 'bg-blue-500/20 text-blue-400',
  XLSX: 'bg-green-500/20 text-green-400',
  DOC: 'bg-purple-500/20 text-purple-400',
  PNG: 'bg-pink-500/20 text-pink-400',
};

const statusStyles: Record<string, string> = {
  draft: 'bg-yellow-500/20 text-yellow-400',
  sent: 'bg-accent-500/20 text-accent-400',
  posted: 'bg-brand-500/20 text-brand-400',
  final: 'bg-blue-500/20 text-blue-400',
  active: 'bg-orange-500/20 text-orange-400',
};

export default function DocumentsPage() {
  const [filter, setFilter] = useState<DocType>('all');
  const [search, setSearch] = useState('');
  const [viewingDoc, setViewingDoc] = useState<typeof documents[0] | null>(null);

  const filtered = documents.filter(doc => {
    if (filter !== 'all' && doc.type !== filter) return false;
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">{documents.length} documents generated by agents</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-raised border border-surface-border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
          />
        </div>
        <div className="flex gap-1 bg-surface-raised border border-surface-border rounded-xl p-1">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                filter === f.value
                  ? 'bg-brand-500/20 text-brand-400'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-2">
        {filtered.map(doc => {
          const FormatIcon = formatIcons[doc.format] || FileText;
          return (
            <div
              key={doc.id}
              className="bg-surface-raised border border-surface-border rounded-xl p-4 hover:border-brand-500/30 transition-all group cursor-pointer"
              onClick={() => setViewingDoc(doc)}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', formatColors[doc.format] || 'bg-gray-500/20')}>
                  <FormatIcon className="w-5 h-5" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                    {doc.tag && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent-500/20 text-accent-400 shrink-0">
                        {doc.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{doc.agent}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{doc.department}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString('en-IL', { month: 'short', day: 'numeric' })}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{doc.size}</span>
                  </div>
                </div>

                {/* Status */}
                <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase shrink-0', statusStyles[doc.status])}>
                  {doc.status}
                </span>

                {/* Format */}
                <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0', formatColors[doc.format])}>
                  {doc.format}
                </span>

                {/* Actions */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="p-2 rounded-lg text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20"
                    title="View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => addToast(`Editing ${doc.name}`, 'info')}
                    className="p-2 rounded-lg text-gray-300 bg-surface-overlay hover:bg-surface-overlay/80 border border-surface-border"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => addToast(`Downloading ${doc.name}`, 'success')}
                    className="p-2 rounded-lg text-gray-300 bg-surface-overlay hover:bg-surface-overlay/80 border border-surface-border"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  {(doc.status === 'draft') && (
                    <button
                      onClick={() => addToast(`Sending ${doc.name} to client`, 'success')}
                      className="p-2 rounded-lg text-accent-400 bg-accent-500/10 hover:bg-accent-500/20 border border-accent-500/20"
                      title="Send"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No documents found</p>
          </div>
        )}
      </div>

      {viewingDoc && (
        <DocumentViewer
          doc={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}
