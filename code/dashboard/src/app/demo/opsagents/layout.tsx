'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  Zap,
  Menu,
  X,
} from 'lucide-react';

const nav = [
  { href: '/demo/opsagents', label: 'Overview', icon: LayoutDashboard },
  { href: '/demo/opsagents/agents', label: 'AI Agents', icon: Bot },
];

export default function OpsagentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Hide parent sidebar */}
      <style dangerouslySetInnerHTML={{ __html: `
        main.lg\\:ml-60 { margin-left: 0 !important; padding: 0 !important; }
        main.lg\\:ml-60 > .max-w-7xl { max-width: 100% !important; padding: 0 !important; }
        aside.w-60 { display: none !important; }
      `}} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-surface border-b border-surface-border z-50 flex items-center px-4 gap-3">
        <button onClick={() => setOpen(true)} className="p-1.5 rounded-lg hover:bg-surface-raised">
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <h1 className="text-sm font-bold text-white">OpsAgents AI</h1>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-50" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 h-screen w-64 bg-surface border-r border-surface-border flex flex-col z-50 transition-transform duration-200',
          'lg:l-0 lg:translate-x-0',
          open ? 'l-0 translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-5 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">OpsAgents</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">AI Operations Platform</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 rounded hover:bg-surface-raised">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-violet-500/15 text-violet-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-surface-raised'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-surface-border">
          <div className="bg-surface-raised rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Client</p>
            <p className="text-sm font-semibold text-white">OpsAgents</p>
            <p className="text-xs text-gray-500">5 agents active</p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Powered by</p>
              <p className="text-xs font-semibold text-gray-300">MSApps OpsAgent</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}