'use client';

import { useState } from 'react';
import { addToast } from '@/components/toast';
import { clsx } from 'clsx';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
} from 'lucide-react';

interface ApprovalItem {
  id: string;
  agent: string;
  department: string;
  action: string;
  description: string;
  detail?: string;
  cost?: string;
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'denied';
  requestedAt: string;
}

const initialApprovals: ApprovalItem[] = [
  {
    id: 'apr-1',
    agent: 'LinkedIn Outreach',
    department: 'Sales',
    action: 'Send 25 outreach messages',
    description: 'New segment: HealthTech CTOs (Tel Aviv, 100+ employees). 25 personalized messages ready.',
    detail: 'This exceeds the daily limit of 15 messages. Sending 25 may trigger LinkedIn rate limits.',
    cost: '25 API credits',
    risk: 'medium',
    status: 'pending',
    requestedAt: '2026-03-22T08:15:00Z',
  },
  {
    id: 'apr-2',
    agent: 'Proposal Generator',
    department: 'Sales',
    action: 'Send proposal to Meridian Digital',
    description: 'Proposal for ₪85,000 enterprise project — 24 pages with custom pricing.',
    detail: 'Large deal. Proposal includes non-standard payment terms (Net-60 instead of Net-30).',
    cost: '₪85,000 deal',
    risk: 'high',
    status: 'pending',
    requestedAt: '2026-03-22T07:30:00Z',
  },
  {
    id: 'apr-3',
    agent: 'Client Invoicing',
    department: 'Finance',
    action: 'Process late payment reminder',
    description: 'Atlas Industries invoice #2026-024 is 15 days overdue (₪28,400).',
    detail: 'Sending automated late payment reminder. Third reminder — next step would be escalation.',
    cost: '₪28,400 overdue',
    risk: 'medium',
    status: 'pending',
    requestedAt: '2026-03-22T09:00:00Z',
  },
  {
    id: 'apr-4',
    agent: 'Social Content',
    department: 'Marketing',
    action: 'Post on all 4 platforms',
    description: 'Daily content ready: LinkedIn article, Instagram carousel, Facebook post, X thread.',
    detail: 'Content mentions competitor pricing comparison. May need review before posting.',
    risk: 'low',
    status: 'pending',
    requestedAt: '2026-03-22T07:30:00Z',
  },
  {
    id: 'apr-5',
    agent: 'Email Triage',
    department: 'Operations',
    action: 'Auto-reply to 8 vendor emails',
    description: '8 routine vendor inquiries identified. Draft replies ready for batch sending.',
    risk: 'low',
    status: 'pending',
    requestedAt: '2026-03-22T06:00:00Z',
  },
  // Past approvals
  {
    id: 'apr-6',
    agent: 'LinkedIn Outreach',
    department: 'Sales',
    action: 'Send 15 messages to SaaS CTOs',
    description: 'Standard daily outreach to SaaS CTOs segment.',
    risk: 'low',
    status: 'approved',
    requestedAt: '2026-03-21T09:30:00Z',
  },
  {
    id: 'apr-7',
    agent: 'Recruiting Pipeline',
    department: 'HR',
    action: 'Send 18 rejection emails',
    description: 'Batch rejection for non-matching Senior Developer applicants.',
    risk: 'low',
    status: 'approved',
    requestedAt: '2026-03-17T10:20:00Z',
  },
  {
    id: 'apr-8',
    agent: 'Proposal Generator',
    department: 'Sales',
    action: 'Send proposal to NovaTech Solutions',
    description: 'Proposal for ₪52,000 mobile app project.',
    cost: '₪52,000 deal',
    risk: 'high',
    status: 'denied',
    requestedAt: '2026-03-20T14:40:00Z',
  },
];

const riskStyles = {
  low: 'bg-accent-500/20 text-accent-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle2,
  denied: XCircle,
};

const statusStyles = {
  pending: 'text-yellow-400',
  approved: 'text-accent-400',
  denied: 'text-red-400',
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [tab, setTab] = useState<'pending' | 'history'>('pending');

  const pending = approvals.filter(a => a.status === 'pending');
  const history = approvals.filter(a => a.status !== 'pending');

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'approved' as const } : a
    ));
    const item = approvals.find(a => a.id === id);
    addToast(`Approved: ${item?.action}`, 'success');
  };

  const handleDeny = (id: string) => {
    setApprovals(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'denied' as const } : a
    ));
    const item = approvals.find(a => a.id === id);
    addToast(`Denied: ${item?.action}`, 'error');
  };

  const currentList = tab === 'pending' ? pending : history;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-sm text-gray-500 mt-1">Review and authorize agent actions before execution</p>
        </div>
        {pending.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
            {pending.length} pending
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-raised border border-surface-border rounded-xl p-1 mb-6 w-fit">
        <button
          onClick={() => setTab('pending')}
          className={clsx(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            tab === 'pending' ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-gray-200'
          )}
        >
          Pending {pending.length > 0 && `(${pending.length})`}
        </button>
        <button
          onClick={() => setTab('history')}
          className={clsx(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            tab === 'history' ? 'bg-brand-500/20 text-brand-400' : 'text-gray-400 hover:text-gray-200'
          )}
        >
          History ({history.length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {currentList.map(item => {
          const StatusIcon = statusIcons[item.status];
          return (
            <div
              key={item.id}
              className={clsx(
                'bg-surface-raised border rounded-xl p-5 transition-all',
                item.status === 'pending' ? 'border-yellow-500/20' : 'border-surface-border'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className={clsx('w-4 h-4', statusStyles[item.status])} />
                    <span className="text-xs text-gray-500">{item.agent}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{item.department}</span>
                    <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase', riskStyles[item.risk])}>
                      {item.risk} risk
                    </span>
                    {item.cost && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent-500/20 text-accent-400">
                        {item.cost}
                      </span>
                    )}
                  </div>

                  {/* Action title */}
                  <h3 className="text-base font-semibold text-white mb-1">{item.action}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>

                  {item.detail && (
                    <div className="flex items-start gap-2 mt-2 px-3 py-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-yellow-300">{item.detail}</p>
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(item.requestedAt).toLocaleDateString('en-IL', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' at '}
                    {new Date(item.requestedAt).toLocaleTimeString('en-IL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Action buttons */}
                {item.status === 'pending' && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-accent-400 bg-accent-500/10 hover:bg-accent-500/20 border border-accent-500/20 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Allow
                    </button>
                    <button
                      onClick={() => handleDeny(item.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Deny
                    </button>
                    <button
                      onClick={() => addToast('Viewing details...', 'info')}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-surface-overlay hover:bg-surface-overlay/80 border border-surface-border transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                )}

                {item.status !== 'pending' && (
                  <span className={clsx('text-sm font-medium capitalize', statusStyles[item.status])}>
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {currentList.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ShieldCheck className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">{tab === 'pending' ? 'No pending approvals' : 'No history yet'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
