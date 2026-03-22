'use client';

import { agents as initialAgents, executionLogs } from '@/lib/mock-data';
import { addToast } from '@/components/toast';
import { useDocViewer } from '@/components/doc-context';
import {
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  AlertTriangle,
  FileText,
  Send,
  Eye,
  Phone,
  Calendar,
  Pencil,
  X,
  Download,
  UserPlus,
} from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-400" />
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

// Extract all attention items from all logs that have structured output
const approvalItems = [
  {
    id: '1',
    agent: 'Lead Pipeline',
    text: 'Toyota/Aman proposal sent 3 days ago — no response yet.',
    priority: 'high' as const,
    actions: ['Send Follow-up', 'Call Contact', 'Dismiss'],
  },
  {
    id: '2',
    agent: 'Lead Pipeline',
    text: 'Leumi Tech requested pricing by end of week — proposal needed.',
    priority: 'high' as const,
    actions: ['Generate Proposal', 'Schedule Call', 'Dismiss'],
  },
  {
    id: '3',
    agent: 'Email Triage',
    text: 'Client "Strauss Group" — contract renewal question, reply needed today.',
    priority: 'urgent' as const,
    actions: ['View Email', 'Send Draft Reply', 'Call Client'],
  },
  {
    id: '4',
    agent: 'Proposal Generator',
    text: 'Toyota/Aman proposal ready — review pricing before sending to client.',
    priority: 'medium' as const,
    actions: ['Review Now', 'Approve & Send'],
  },
  {
    id: '5',
    agent: 'Receipt Matching',
    text: '4 missing receipts — ₪5,553 in unmatched transactions.',
    priority: 'medium' as const,
    actions: ['Upload Receipts', 'View Details'],
  },
  {
    id: '6',
    agent: 'LinkedIn Outreach',
    text: 'Avi Koren (CTO, Payoneer) responded — interested in a demo.',
    priority: 'high' as const,
    actions: ['View Reply', 'Schedule Demo'],
  },
];

const recentDocuments = [
  { id: '1', name: 'Proposal — Toyota/Aman', type: 'PDF', agent: 'Proposal Generator', date: 'Mar 20', size: '₪52K scope' },
  { id: '2', name: 'Daily Pipeline Brief', type: 'PDF', agent: 'Lead Pipeline', date: 'Mar 21', size: '47 leads' },
  { id: '3', name: 'Monthly Billing Summary — Feb', type: 'XLSX', agent: 'Client Invoicing', date: 'Feb 28', size: '₪148K' },
  { id: '4', name: 'Invoice #2026-024 — Strauss Group', type: 'PDF', agent: 'Client Invoicing', date: 'Feb 28', size: '₪28,400' },
  { id: '5', name: 'Missing Receipts List', type: 'DOC', agent: 'Receipt Matching', date: 'Mar 16', size: '4 items' },
  { id: '6', name: 'Recruiting Report — Senior Dev', type: 'PDF', agent: 'Recruiting Pipeline', date: 'Mar 17', size: '23 apps' },
];

const priorityStyles = {
  urgent: 'border-red-500/30 bg-red-500/10',
  high: 'border-yellow-500/30 bg-yellow-500/10',
  medium: 'border-blue-500/30 bg-blue-500/10',
};

const priorityLabels = {
  urgent: { text: 'Urgent', color: 'text-red-400 bg-red-500/20' },
  high: { text: 'High', color: 'text-yellow-400 bg-yellow-500/20' },
  medium: { text: 'Medium', color: 'text-blue-400 bg-blue-500/20' },
};

const tagStyles: Record<string, string> = {
  PDF: 'bg-blue-500/20 text-blue-400',
  XLSX: 'bg-green-500/20 text-green-400',
  DOC: 'bg-purple-500/20 text-purple-400',
};

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Send Follow-up': Send,
  'Call Contact': Phone,
  'Call Client': Phone,
  'Dismiss': X,
  'Generate Proposal': Pencil,
  'Schedule Call': Phone,
  'Schedule Demo': Calendar,
  'View Email': Eye,
  'Send Draft Reply': Send,
  'Review Now': Eye,
  'Approve & Send': Send,
  'Upload Receipts': Download,
  'View Details': Eye,
  'View Reply': Eye,
  'Add to Segment': UserPlus,
};

export default function OverviewPage() {
  const { openDoc } = useDocViewer();
  const running = initialAgents.filter(a => a.status === 'running').length;
  const todayLogs = executionLogs.filter(l => l.startedAt.startsWith('2026-03-21'));
  const successRate = Math.round(
    (executionLogs.filter(l => l.status === 'success').length / executionLogs.length) * 100
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Operations Overview</h1>
        <p className="text-sm text-gray-500 mt-1">MSApps — Real-time operations dashboard</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard icon={Zap} label="Active Agents" value={initialAgents.length} sub="Across 5 departments" />
        <StatCard icon={Activity} label="Running Now" value={running} sub={running > 0 ? 'Processing tasks' : 'All idle'} />
        <StatCard icon={CheckCircle2} label="Today's Runs" value={todayLogs.length} sub="Completed today" />
        <StatCard icon={Clock} label="Success Rate" value={`${successRate}%`} sub="Last 30 days" />
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Left: Approvals & Attention — 3 cols */}
        <div className="col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Needs Your Attention</h2>
            <span className="text-xs font-medium text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded-full">{approvalItems.length}</span>
          </div>

          <div className="space-y-3">
            {approvalItems.map(item => {
              const pLabel = priorityLabels[item.priority];
              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-4 ${priorityStyles[item.priority]}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${pLabel.color}`}>
                          {pLabel.text}
                        </span>
                        <span className="text-xs text-gray-500">{item.agent}</span>
                      </div>
                      <p className="text-sm text-white font-medium">{item.text}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.actions.map((action, ai) => {
                      const AIcon = actionIcons[action] || Eye;
                      const isDismiss = action === 'Dismiss';
                      const isPrimary = ai === 0;
                      return (
                        <button
                          key={ai}
                          onClick={() => addToast(`${action} — action triggered`, 'success')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            isDismiss
                              ? 'bg-surface-overlay text-gray-400 hover:text-gray-200 border-surface-border'
                              : isPrimary
                              ? 'bg-brand-500/15 text-brand-400 hover:bg-brand-500/25 border-brand-500/20'
                              : 'bg-accent-500/15 text-accent-400 hover:bg-accent-500/25 border-accent-500/20'
                          }`}
                        >
                          <AIcon className="w-3 h-3" />
                          {action}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recent Documents — 2 cols */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-brand-400" />
            <h2 className="text-lg font-semibold text-white">Recent Documents</h2>
          </div>

          <div className="space-y-2">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-raised border border-surface-border rounded-xl p-3 hover:border-brand-500/30 transition-all group cursor-pointer"
                onClick={() => openDoc({ id: doc.id, name: doc.name, format: doc.type, agent: doc.agent, department: '', date: doc.date, status: 'final' })}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 min-w-0">
                    <FileText className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{doc.agent} · {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-gray-500">{doc.size}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${tagStyles[doc.type] || 'bg-gray-500/20 text-gray-400'}`}>
                      {doc.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); openDoc({ id: doc.id, name: doc.name, format: doc.type, agent: doc.agent, department: '', date: doc.date, status: 'final' }); }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToast(`Editing ${doc.name}`, 'info'); }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-gray-300 bg-surface-overlay hover:bg-surface-overlay/80 border border-surface-border"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToast(`Downloading ${doc.name}`, 'success'); }}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-gray-300 bg-surface-overlay hover:bg-surface-overlay/80 border border-surface-border"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity feed */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="bg-surface-raised border border-surface-border rounded-xl divide-y divide-surface-border">
          {todayLogs.slice(0, 6).map(log => {
            const statusLabel = log.status === 'success' ? 'Success' : log.status === 'partial' ? 'Partial' : 'Failed';
            const statusColor = log.status === 'success' ? 'text-accent-400' : log.status === 'partial' ? 'text-yellow-400' : 'text-red-400';
            return (
              <div key={log.id} className="flex items-center gap-4 px-4 py-3">
                <span className={`text-xs font-medium ${statusColor} w-14`}>{statusLabel}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{log.summary}</p>
                  <p className="text-xs text-gray-500">{log.agentName}</p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">
                  {new Date(log.startedAt).toLocaleTimeString('en-IL', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
