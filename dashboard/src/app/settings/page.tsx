'use client';

import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  Bell,
  Clock,
  Mail,
  Shield,
  CreditCard,
  Receipt,
  TrendingUp,
  Zap,
  Plus,
  Trash2,
  Circle,
  Server,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { useApi } from '@/lib/use-api';
import { useClient, ClientSummary } from '@/lib/client-context';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        'w-10 h-5.5 rounded-full transition-colors relative',
        enabled ? 'bg-brand-500' : 'bg-surface-overlay'
      )}
      style={{ height: '22px' }}
    >
      <span
        className={clsx(
          'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow',
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

// ── Client Management Panel ──────────────────────────────────────────────────

function ClientManagement() {
  const { clients, selectedClient, setSelectedClientId, refreshClients } = useClient();
  const [healthResults, setHealthResults] = useState<Record<string, { connected: boolean; latencyMs: number | null; checking: boolean }>>({});

  const checkHealth = async (clientId: string) => {
    setHealthResults(prev => ({ ...prev, [clientId]: { connected: false, latencyMs: null, checking: true } }));
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${API_BASE}/api/clients/${clientId}/health`);
      const data = await res.json();
      setHealthResults(prev => ({
        ...prev,
        [clientId]: { connected: data.connected, latencyMs: data.latencyMs, checking: false },
      }));
    } catch {
      setHealthResults(prev => ({
        ...prev,
        [clientId]: { connected: false, latencyMs: null, checking: false },
      }));
    }
  };

  const checkAllHealth = async () => {
    for (const client of clients) {
      checkHealth(client.id);
    }
  };

  return (
    <div className="bg-surface-raised border border-surface-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-brand-400" />
          <h2 className="text-base font-semibold text-white">Client Management</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={checkAllHealth}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-surface-raised"
          >
            <RefreshCw className="w-3 h-3" />
            Check All VMs
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {clients.map(client => {
          const health = healthResults[client.id];
          const isSelected = client.id === selectedClient?.id;

          return (
            <div
              key={client.id}
              className={clsx(
                'p-4 rounded-xl border transition-all cursor-pointer',
                isSelected
                  ? 'border-brand-500/30 bg-brand-500/5'
                  : 'border-surface-border bg-surface/50 hover:border-surface-border/80'
              )}
              onClick={() => setSelectedClientId(client.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Circle
                    className={clsx(
                      'w-2.5 h-2.5 fill-current',
                      health?.checking ? 'text-yellow-400 animate-pulse' :
                      health?.connected ? 'text-emerald-400' :
                      client.connected ? 'text-emerald-400' : 'text-gray-500'
                    )}
                  />
                  <span className={clsx(
                    'text-sm font-semibold',
                    isSelected ? 'text-brand-400' : 'text-white'
                  )}>
                    {client.name}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {health?.latencyMs != null && (
                    <span className="text-[10px] text-gray-500">
                      {health.latencyMs}ms
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); checkHealth(client.id); }}
                    className="text-gray-500 hover:text-white transition-colors p-1 rounded"
                    title="Check VM health"
                  >
                    <RefreshCw className={clsx('w-3 h-3', health?.checking && 'animate-spin')} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
                <div>
                  <span className="text-gray-600">Industry:</span>
                  <p className="text-gray-400 truncate">{client.industry || '—'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Agents:</span>
                  <p className="text-gray-400">{client.enabledAgents}/{client.totalAgents}</p>
                </div>
                <div>
                  <span className="text-gray-600">VM:</span>
                  <p className="text-gray-400 truncate">{client.vmId || '—'}</p>
                </div>
              </div>

              {client.tunnelUrl && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-600">
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span className="truncate">{client.tunnelUrl}</span>
                </div>
              )}

              {client.dashboard && (
                <div className="mt-2">
                  <a
                    href={client.dashboard.route}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Open Client Dashboard →
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {clients.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Server className="w-6 h-6 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No clients configured</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-surface-border">
        <p className="text-xs text-gray-600">
          Add new clients with: <code className="text-gray-400 bg-surface px-1 py-0.5 rounded">node scripts/provision-client.js --id &lt;id&gt; --name &quot;Name&quot;</code>
        </p>
      </div>
    </div>
  );
}

// ── Main Settings Page ───────────────────────────────────────────────────────

export default function SettingsPage() {
  const { agents } = useApi();
  const { selectedClient } = useClient();

  const [schedules, setSchedules] = useState<{ id: string; name: string; schedule: string; enabled: boolean }[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    onFailure: true,
    dailyDigest: true,
    weeklyReport: false,
  });

  useEffect(() => {
    if (agents.length > 0) {
      setSchedules(agents.map(a => ({
        id: a.id,
        name: a.name,
        schedule: a.schedule,
        enabled: a.status !== 'idle',
      })));
    }
  }, [agents]);

  const toggleAgent = (id: string) => {
    setSchedules(s => s.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage clients, agent schedules, and notifications
          {selectedClient && <span> — <span className="text-gray-400">{selectedClient.name}</span></span>}
        </p>
      </div>

      {/* Client Management — full width */}
      <div className="mb-6">
        <ClientManagement />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Schedules */}
        <div className="bg-surface-raised border border-surface-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-brand-400" />
            <h2 className="text-base font-semibold text-white">Agent Schedules</h2>
          </div>
          <div className="space-y-3">
            {schedules.length > 0 ? schedules.map(agent => (
              <div
                key={agent.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface/50"
              >
                <div>
                  <p className="text-sm text-white font-medium">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.schedule}</p>
                </div>
                <Toggle enabled={agent.enabled} onToggle={() => toggleAgent(agent.id)} />
              </div>
            )) : (
              <p className="text-sm text-gray-500 text-center py-4">Select a client to see agents</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-surface-raised border border-surface-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-4 h-4 text-brand-400" />
              <h2 className="text-base font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: 'email' as const, label: 'Email notifications', desc: 'Get notified after each agent run', icon: Mail },
                { key: 'onFailure' as const, label: 'Failure alerts', desc: 'Immediate alert when an agent fails', icon: Shield },
                { key: 'dailyDigest' as const, label: 'Daily digest', desc: 'Summary of all operations at end of day', icon: Clock },
                { key: 'weeklyReport' as const, label: 'Weekly report', desc: 'Comprehensive weekly performance report', icon: Bell },
              ].map(item => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface/50"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-white font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={notifications[item.key]}
                    onToggle={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery settings */}
          <div className="bg-surface-raised border border-surface-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Mail className="w-4 h-4 text-brand-400" />
              <h2 className="text-base font-semibold text-white">Delivery</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  defaultValue={selectedClient?.id ? '' : ''}
                  placeholder="ops@client.com"
                  className="mt-1 w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Timezone</label>
                <input
                  type="text"
                  defaultValue={selectedClient?.timezone || 'Asia/Jerusalem'}
                  className="mt-1 w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
