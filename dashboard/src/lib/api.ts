// OpsAgent API client — connects dashboard to real agent server via Cloudflare Tunnel

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiAgentStatus {
  name: string;
  enabled: boolean;
  schedule: string | null;
  lastRun: {
    date: string;
    timestamp: string;
    tokensIn: number | null;
    tokensOut: number | null;
    preview: string;
  } | null;
  logCount: number;
}

export interface ApiClient {
  id: string;
  name: string;
  timezone: string;
  industry: string;
  agents: ApiAgentStatus[];
}

export interface ApiStatusResponse {
  clients: ApiClient[];
  availableAgents: string[];
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getStatus(): Promise<ApiStatusResponse> {
  return apiFetch('/api/status');
}

export async function getLogDates(clientId: string, agentName: string): Promise<string[]> {
  const data = await apiFetch<{ logs: string[] }>(`/api/logs/${clientId}/${agentName}`);
  return data.logs.map(f => f.replace('.md', ''));
}

export async function getLog(clientId: string, agentName: string, date: string): Promise<string> {
  const data = await apiFetch<{ content: string }>(`/api/logs/${clientId}/${agentName}/${date}`);
  return data.content;
}

export async function stopAgent(clientId: string, agentName: string): Promise<boolean> {
  const data = await apiFetch<{ stopped: boolean }>(`/api/stop/${clientId}/${agentName}`, {
    method: 'POST',
  });
  return data.stopped;
}

export async function updateSchedule(
  clientId: string,
  agentName: string,
  schedule?: string,
  enabled?: boolean,
): Promise<void> {
  await apiFetch(`/api/schedule/${clientId}/${agentName}`, {
    method: 'PUT',
    body: JSON.stringify({ schedule, enabled }),
  });
}

export async function getRunningAgents(): Promise<{ clientId: string; agentName: string }[]> {
  const data = await apiFetch<{ running: { clientId: string; agentName: string }[] }>('/api/running');
  return data.running;
}

// SSE stream for running an agent — returns EventSource
export function runAgentStream(clientId: string, agentName: string): EventSource {
  return new EventSource(`${API_BASE}/api/run/${clientId}/${agentName}`);
}

// Check if API is reachable
export async function checkConnection(): Promise<boolean> {
  try {
    await apiFetch('/api/status');
    return true;
  } catch {
    return false;
  }
}
