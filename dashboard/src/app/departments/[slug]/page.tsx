'use client';

import { agents, executionLogs, departmentMetrics } from '@/lib/mock-data';
import { Sparkline } from '@/components/sparkline';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import {
  TrendingUp, Users, Wallet, Megaphone, Settings, Package, Target,
  Search, Activity, RefreshCw, CreditCard, Banknote, Receipt,
  ClipboardList, CheckCircle2, AlertCircle, XCircle, ArrowLeft,
  Zap, Clock, BarChart3,
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target, search: Search, users: Users, receipt: Receipt,
  megaphone: Megaphone, 'clipboard-list': ClipboardList, activity: Activity,
  'refresh-cw': RefreshCw, 'credit-card': CreditCard, banknote: Banknote,
  wallet: Wallet, package: Package, 'trending-up': TrendingUp,
  settings: Settings,
};

const deptMeta: Record<string, { name: string; color: string; description: string; icon: string }> = {
  sales: {
    name: 'Sales',
    color: 'from-blue-500 to-blue-700',
    description: 'Lead generation, qualification, sales team performance, and pipeline management',
    icon: 'trending-up',  },
  marketing: {
    name: 'Marketing',
    color: 'from-purple-500 to-purple-700',
    description: 'Campaigns, SEO, digital health, social media, and performance attribution',
    icon: 'megaphone',
  },
  operations: {
    name: 'Operations',
    color: 'from-amber-500 to-amber-700',
    description: 'Project tracking, subcontractor management, and system integrations',
    icon: 'settings',
  },
  finance: {
    name: 'Finance',
    color: 'from-emerald-500 to-emerald-700',
    description: 'Financing, preapprovals, lender management, receipts, and payroll',
    icon: 'wallet',
  },
  procurement: {
    name: 'Procurement',
    color: 'from-orange-500 to-orange-700',
    description: 'Supplier sourcing, material pricing comparisons, and supply chain management',
    icon: 'package',
  },
  executive: {
    name: 'Executive',
    color: 'from-rose-500 to-rose-700',
    description: 'Daily briefings, cross-department summaries, and strategic alerts',
    icon: 'clipboard-list',
  },
};
const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  partial: AlertCircle,
  failed: XCircle,
};

const statusColor: Record<string, string> = {
  success: 'text-accent-400',
  partial: 'text-yellow-400',
  failed: 'text-red-400',
};

const agentStatusColors: Record<string, string> = {
  running: 'bg-accent-400',
  idle: 'bg-gray-500',
  error: 'bg-red-500',
  scheduled: 'bg-blue-400',
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
}
export default function DepartmentPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = deptMeta[slug];

  if (!meta) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-2">Department not found</h1>
        <Link href="/" className="text-brand-400 hover:underline">Back to Overview</Link>
      </div>
    );
  }

  const deptAgents = agents.filter(a => a.department === meta.name);
  const deptLogs = executionLogs
    .filter(l => l.department === meta.name)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  const metrics = departmentMetrics.find(d => d.department === meta.name);
  const DeptIcon = iconMap[meta.icon] || TrendingUp;

  const runningCount = deptAgents.filter(a => a.status === 'running').length;
  const successCount = deptLogs.filter(l => l.status === 'success').length;
  const successRate = deptLogs.length > 0 ? Math.round((successCount / deptLogs.length) * 100) : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">        <Link href="/agents" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          All Agents
        </Link>
        <div className="flex items-center gap-4">
          <div className={clsx('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', meta.color)}>
            <DeptIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{meta.name} Department</h1>
            <p className="text-sm text-gray-500 mt-0.5">{meta.description}</p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-raised border border-surface-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-brand-400" />
            <p className="text-xs text-gray-500 uppercase tracking-wider">Agents</p>
          </div>
          <p className="text-2xl font-bold text-white">{deptAgents.length}</p>
          <p className="text-xs text-gray-500 mt-1">{runningCount} running now</p>
        </div>
        <div className="bg-surface-raised border border-surface-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-accent-400" />
            <p className="text-xs text-gray-500 uppercase tracking-wider">Recent Runs</p>
          </div>          <p className="text-2xl font-bold text-white">{deptLogs.length}</p>
          <p className="text-xs text-gray-500 mt-1">In last 7 days</p>
        </div>
        <div className="bg-surface-raised border border-surface-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-accent-400" />
            <p className="text-xs text-gray-500 uppercase tracking-wider">Success Rate</p>
          </div>
          <p className="text-2xl font-bold text-white">{successRate}%</p>
          <p className="text-xs text-accent-400 mt-1">↑ 3% vs last month</p>
        </div>
        <div className="bg-surface-raised border border-surface-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-gray-500 uppercase tracking-wider">Last Activity</p>
          </div>
          <p className="text-2xl font-bold text-white">{deptLogs[0] ? timeAgo(deptLogs[0].completedAt) : 'N/A'}</p>
          <p className="text-xs text-gray-500 mt-1">{deptLogs[0]?.agentName || ''}</p>
        </div>
      </div>
      {/* KPIs with sparklines */}
      {metrics && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.kpis.map(kpi => (
              <div key={kpi.label} className="bg-surface-raised border border-surface-border rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {kpi.value}
                      {kpi.unit && <span className="text-sm text-gray-500 ml-1">{kpi.unit}</span>}
                    </p>
                    <p className={`text-xs mt-1 ${kpi.trend >= 0 ? 'text-accent-400' : 'text-red-400'}`}>
                      {kpi.trend >= 0 ? '↑' : '↓'} {Math.abs(kpi.trend)}% vs last month
                    </p>
                  </div>
                  <Sparkline data={kpi.sparkline} color={kpi.trend >= 0 ? '#10B981' : '#EF4444'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Two-column layout: Agents + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Agents list */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-400" />
            Agents
          </h2>
          <div className="space-y-3">
            {deptAgents.map(agent => {
              const AgentIcon = iconMap[agent.icon] || Target;
              return (
                <div key={agent.id} className="bg-surface-raised border border-surface-border rounded-xl p-4 hover:border-brand-500/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                        <AgentIcon className="w-4.5 h-4.5 text-brand-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                        <p className="text-xs text-gray-500">{agent.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={clsx('w-2 h-2 rounded-full', agentStatusColors[agent.status])} />
                      <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                    </div>
                  </div>                  <div className="grid grid-cols-3 gap-2">
                    {agent.metrics.map(m => (
                      <div key={m.label} className="bg-surface/50 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-500 uppercase">{m.label}</p>
                        <p className="text-sm font-semibold text-white">{m.value}</p>
                        {m.trend !== undefined && (
                          <p className={clsx('text-[10px]', m.trend >= 0 ? 'text-accent-400' : 'text-red-400')}>
                            {m.trend >= 0 ? '↑' : '↓'} {Math.abs(m.trend)}%
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-400" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {deptLogs.map(log => {
              const StatusIcon = statusIcon[log.status] || CheckCircle2;
              return (                <div key={log.id} className="bg-surface-raised border border-surface-border rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <StatusIcon className={clsx('w-5 h-5 mt-0.5 shrink-0', statusColor[log.status])} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-white">{log.agentName}</h3>
                        <span className="text-xs text-gray-500">{timeAgo(log.completedAt)}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{log.summary}</p>
                      <div className="space-y-1">
                        {log.details.slice(0, 3).map((d, i) => (
                          <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                            <span className="text-gray-600 mt-0.5">•</span>
                            {d}
                          </p>
                        ))}
                        {log.details.length > 3 && (
                          <p className="text-xs text-brand-400">+{log.details.length - 3} more details</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {deptLogs.length === 0 && (
              <div className="bg-surface-raised border border-surface-border rounded-xl p-8 text-center">
                <p className="text-gray-500">No recent activity for this department</p>
              </div>
            )}
          </div>        </div>
      </div>
    </div>
  );
}
