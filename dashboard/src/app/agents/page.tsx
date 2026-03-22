'use client';

import { useState } from 'react';
import { agents as mockAgents, executionLogs } from '@/lib/mock-data';
import { Agent } from '@/lib/types';
import { useApi } from '@/lib/use-api';
import { AgentCard } from '@/components/agent-card';
import { AgentDetail } from '@/components/agent-detail';
import { ScheduleModal } from '@/components/schedule-modal';
import { addToast } from '@/components/toast';
import { Plus, MessageSquare, Wifi, WifiOff } from 'lucide-react';

export default function AgentsPage() {
  const api = useApi();
  const agents = api.connected ? api.agents : mockAgents;
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [runOutput, setRunOutput] = useState<string[]>([]);

  const handleStart = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    if (api.connected) {
      addToast(`Starting ${agent.name}...`, 'info');
      setRunOutput([]);
      const output = await api.runAgent(id, (msg) => {
        setRunOutput(prev => [...prev, msg]);
      });
      if (output) {
        addToast(`${agent.name} completed successfully`, 'success');
      } else {
        addToast(`${agent.name} finished with errors`, 'error');
      }
    } else {
      addToast(`${agent.name} started (demo mode)`, 'success');
    }
  };

  const handleStop = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    if (api.connected) {
      const stopped = await api.stopAgent(id);
      addToast(stopped ? `${agent.name} stopped` : `${agent.name} is not running`, stopped ? 'info' : 'error');
    } else {
      addToast(`${agent.name} stopped (demo mode)`, 'info');
    }
  };

  const handleEditSchedule = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent) setEditingAgent(agent);
  };

  const handleSaveSchedule = async (schedule: string) => {
    if (!editingAgent) return;

    if (api.connected) {
      await api.updateSchedule(editingAgent.id, schedule);
    }
    addToast(`${editingAgent.name} schedule updated to: ${schedule}`, 'success');
    setEditingAgent(null);
  };

  const handleCardClick = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent) setSelectedAgent(agent);
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Monitoring</h1>
          <p className="text-sm text-gray-500 mt-1">Click an agent to view output and manage schedule</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
          api.connected
            ? 'text-accent-400 bg-accent-500/10 border-accent-500/20'
            : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
        }`}>
          {api.connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {api.connected ? `Live — ${api.clientName}` : 'Demo Mode'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onStart={handleStart}
            onStop={handleStop}
            onEditSchedule={handleEditSchedule}
            onClick={handleCardClick}
          />
        ))}

        {/* Request New Agent card */}
        <button
          onClick={() => addToast('Request submitted — our team will be in touch within 24 hours', 'success')}
          className="border-2 border-dashed border-surface-border rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-brand-500/40 hover:bg-brand-500/5 transition-all group min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
            <Plus className="w-6 h-6 text-brand-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Request New Agent</p>
            <p className="text-xs text-gray-500 mt-1">Automate another workflow</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20">
            <MessageSquare className="w-3 h-3" />
            Talk to Us
          </div>
        </button>
      </div>

      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          logs={executionLogs}
          onClose={() => setSelectedAgent(null)}
          onStart={handleStart}
          onStop={handleStop}
          onEditSchedule={handleEditSchedule}
        />
      )}

      {editingAgent && (
        <ScheduleModal
          agentName={editingAgent.name}
          currentSchedule={editingAgent.schedule}
          onSave={handleSaveSchedule}
          onClose={() => setEditingAgent(null)}
        />
      )}
    </div>
  );
}
