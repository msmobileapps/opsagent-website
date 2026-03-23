'use client';

import { useState, useEffect, useCallback } from 'react';
import { Agent, AgentStatus } from './types';
import {
  getStatus,
  getRunningAgents,
  getLogDates,
  getLog,
  getParsedLog,
  getHistory,
  getDocuments,
  getApprovals,
  resolveApproval as apiResolveApproval,
  stopAgent as apiStopAgent,
  updateSchedule as apiUpdateSchedule,
  runAgentStream,
  ApiAgentStatus,
  Approval,
} from './api';
import { ExecutionLog, OutputItem } from './types';

// Agent metadata not available from the API — enriches raw data
const agentMeta: Record<string, { department: string; description: string; icon: string }> = {
  'lead-pipeline': {
    department: 'Sales',
    description: 'Daily scanning, prioritization, and pipeline report delivery. Updates CRM events and sends briefings.',
    icon: 'target',
  },
  'linkedin-outreach': {
    department: 'Sales',
    description: 'Finds target segments, writes personalized messages, sends them via LinkedIn, and tracks responses.',
    icon: 'send',
  },
  'social-posts': {
    department: 'Marketing',
    description: 'Creates and publishes daily posts across LinkedIn, Instagram, Facebook, and X.',
    icon: 'share2',
  },
  'receipts': {
    department: 'Finance',
    description: 'Matches bank transactions to invoices, uploads receipts to iCount, flags missing documents.',
    icon: 'receipt',
  },
  'invoicing': {
    department: 'Finance',
    description: 'Generates monthly invoices per client based on timesheets, sends via accounting system.',
    icon: 'fileText',
  },
  'recruiter': {
    department: 'HR',
    description: 'Posts job openings, screens candidates, ranks applications, and manages recruitment pipeline.',
    icon: 'users',
  },
};

// Convert cron expression to human-readable schedule
function cronToHuman(cron: string | null): string {
  if (!cron) return 'Manual only';
  const parts = cron.split(' ');
  if (parts.length < 5) return cron;

  const [min, hour, dom, , dow] = parts;
  const time = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;

  const dowMap: Record<string, string> = {
    '0-4': 'Sun–Thu',
    '1-5': 'Mon–Fri',
    '*': 'Every day',
    '1': 'Monday',
    '0': 'Sunday',
  };
  const dayLabel = dowMap[dow] || `Day ${dow}`;

  if (dom === '1') return `1st of month at ${time}`;
  return `${dayLabel} at ${time}`;
}

// Map API agent to our Agent type
function mapAgent(raw: ApiAgentStatus, runningNames: string[]): Agent {
  const meta = agentMeta[raw.name] || { department: 'Operations', description: '', icon: 'bot' };
  const isRunning = runningNames.includes(raw.name);

  let status: AgentStatus = 'idle';
  if (isRunning) status = 'running';
  else if (raw.enabled) status = 'scheduled';

  return {
    id: raw.name,
    name: raw.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    department: meta.department,
    description: meta.description,
    status,
    schedule: cronToHuman(raw.schedule),
    lastRun: raw.lastRun?.date || null,
    nextRun: '', // computed from cron if needed
    icon: meta.icon,
    metrics: [], // populated from log parsing
  };
}

export interface UseApiResult {
  connected: boolean;
  loading: boolean;
  agents: Agent[];
  clientName: string;
  refresh: () => Promise<void>;
  runAgent: (agentId: string, onLog?: (msg: string) => void) => Promise<string | null>;
  stopAgent: (agentId: string) => Promise<boolean>;
  updateSchedule: (agentId: string, schedule?: string, enabled?: boolean) => Promise<void>;
  getAgentLogs: (agentId: string) => Promise<string[]>;
  getAgentLog: (agentId: string, date: string) => Promise<string>;
  getParsedAgentLog: (agentId: string, date: string) => Promise<ExecutionLog>;
  getExecutionHistory: () => Promise<ExecutionLog[]>;
  getAgentDocuments: () => Promise<(OutputItem & { agentName: string; date: string; id: string })[]>;
  getApprovalsList: (status?: string) => Promise<Approval[]>;
  resolveApproval: (approvalId: string, decision: 'approve' | 'deny') => Promise<Approval>;
}

export function useApi(): UseApiResult {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [clientName, setClientName] = useState('');

  const refresh = useCallback(async () => {
    try {
      const [status, running] = await Promise.all([getStatus(), getRunningAgents()]);
      const runningNames = running.map(r => r.agentName);

      if (status.clients.length > 0) {
        const client = status.clients[0]; // POC: first client
        setClientName(client.name);
        setAgents(client.agents.map(a => mapAgent(a, runningNames)));
      }
      setConnected(true);
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, [refresh]);

  const runAgentFn = useCallback(async (agentId: string, onLog?: (msg: string) => void): Promise<string | null> => {
    // Update local state to "running"
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'running' as AgentStatus } : a));

    return new Promise((resolve) => {
      const es = runAgentStream('msapps', agentId);
      let output: string | null = null;

      es.addEventListener('log', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        onLog?.(data.message);
      });

      es.addEventListener('done', (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        output = data.output;
        es.close();
        refresh();
        resolve(output);
      });

      es.addEventListener('error', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          onLog?.(`Error: ${data.message}`);
        } catch {}
        es.close();
        refresh();
        resolve(null);
      });
    });
  }, [refresh]);

  const stopAgentFn = useCallback(async (agentId: string): Promise<boolean> => {
    const stopped = await apiStopAgent('msapps', agentId);
    if (stopped) await refresh();
    return stopped;
  }, [refresh]);

  const updateScheduleFn = useCallback(async (agentId: string, schedule?: string, enabled?: boolean) => {
    await apiUpdateSchedule('msapps', agentId, schedule, enabled);
    await refresh();
  }, [refresh]);

  const getAgentLogsFn = useCallback(async (agentId: string): Promise<string[]> => {
    return getLogDates('msapps', agentId);
  }, []);

  const getAgentLogFn = useCallback(async (agentId: string, date: string): Promise<string> => {
    return getLog('msapps', agentId, date);
  }, []);

  const getParsedAgentLogFn = useCallback(async (agentId: string, date: string): Promise<ExecutionLog> => {
    return getParsedLog('msapps', agentId, date);
  }, []);

  const getExecutionHistoryFn = useCallback(async (): Promise<ExecutionLog[]> => {
    const data = await getHistory('msapps');
    return data.logs;
  }, []);

  const getAgentDocumentsFn = useCallback(async () => {
    const data = await getDocuments('msapps');
    return data.documents;
  }, []);

  const getApprovalsListFn = useCallback(async (status?: string): Promise<Approval[]> => {
    const data = await getApprovals('msapps', status);
    return data.approvals;
  }, []);

  const resolveApprovalFn = useCallback(async (approvalId: string, decision: 'approve' | 'deny'): Promise<Approval> => {
    return apiResolveApproval('msapps', approvalId, decision);
  }, []);

  return {
    connected,
    loading,
    agents,
    clientName,
    refresh,
    runAgent: runAgentFn,
    stopAgent: stopAgentFn,
    updateSchedule: updateScheduleFn,
    getAgentLogs: getAgentLogsFn,
    getAgentLog: getAgentLogFn,
    getParsedAgentLog: getParsedAgentLogFn,
    getExecutionHistory: getExecutionHistoryFn,
    getAgentDocuments: getAgentDocumentsFn,
    getApprovalsList: getApprovalsListFn,
    resolveApproval: resolveApprovalFn,
  };
}
