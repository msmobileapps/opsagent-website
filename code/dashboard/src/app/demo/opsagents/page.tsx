'use client';

import {
  Activity, CheckCircle2, AlertTriangle, Bot, Target, Users,
} from 'lucide-react';

const kpiCards = [
  { icon: Target, label: 'Active Agents', value: '5', trend: 0, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Activity, label: 'Runs Today', value: '0', trend: 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: CheckCircle2, label: 'Success Rate', value: '—', trend: 0, color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Users, label: 'Running Now', value: '0', trend: 0, color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

export default function OpsagentsOverview() {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Operations Overview — OpsAgents</h1>
          <p className="text-sm text-gray-500 mt-1">AI-powered operations center</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          System active
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiCards.map(kpi => (
          <div key={kpi.label} className="bg-surface-raised border border-surface-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className="text-xs text-gray-500">{kpi.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Needs Attention</h2>
          </div>
          <div className="text-center py-8 text-gray-500 border border-surface-border rounded-xl bg-surface-raised">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60" />
            <p className="text-sm">All clear!</p>
            <p className="text-xs text-gray-600 mt-1">Items will appear once agents start running</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="text-center py-8 text-gray-500 border border-surface-border rounded-xl bg-surface-raised">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400 opacity-60" />
            <p className="text-sm">No activity yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}