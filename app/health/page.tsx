'use client';

import { useState } from 'react';
import type { HealthCheckResult } from '@/lib/types';

type RunState = 'idle' | 'running' | 'done' | 'error';

const STATUS_STYLES = {
  healthy: { label: 'Healthy', color: 'text-emerald-400', bg: 'border-emerald-700/40 bg-emerald-950/40' },
  warning: { label: 'Warning', color: 'text-warning', bg: 'border-warning/40 bg-warning/40' },
  critical: { label: 'Critical', color: 'text-destructive', bg: 'border-destructive/40 bg-destructive/40' },
};

const CHECK_STYLES = {
  pass: { label: '✓', color: 'text-emerald-400' },
  warn: { label: '⚠', color: 'text-warning' },
  fail: { label: '✕', color: 'text-destructive' },
};

export default function HealthPage() {
  const [state, setState] = useState<RunState>('idle');
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function runCheck() {
    setState('running');
    setResult(null);
    setErrorMsg('');
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data: HealthCheckResult = await res.json();
      setResult(data);
      setState('done');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setState('error');
    }
  }

  function downloadReport() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dcyfr-health-${result.runAt.replace(/[:.]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Workspace Health Checker</h1>
          <p className="text-lg text-slate-300">
            Verify reachability of all DCYFR TLD endpoints. Results export as JSON for
            debugging, incident reports, or CI checks.
          </p>
        </div>

        {/* Run button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={runCheck}
            disabled={state === 'running'}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            aria-busy={state === 'running'}
          >
            {state === 'running' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                Running checks…
              </>
            ) : (
              'Run Health Check'
            )}
          </button>
          {state === 'done' && result && (
            <button
              onClick={downloadReport}
              className="text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-700/40 hover:border-indigo-600/60 rounded-lg px-4 py-2.5 transition-colors"
            >
              Export JSON
            </button>
          )}
        </div>

        {/* Error state */}
        {state === 'error' && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/30 px-5 py-4 mb-6 text-destructive text-sm">
            Health check failed: {errorMsg}
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            {/* Overall status */}
            <div className={`rounded-xl border px-5 py-4 flex items-center justify-between mb-6 ${STATUS_STYLES[result.status].bg}`}>
              <div>
                <p className={`text-lg font-bold ${STATUS_STYLES[result.status].color}`}>
                  {STATUS_STYLES[result.status].label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Run at {new Date(result.runAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p>{result.checks.filter((c) => c.status === 'pass').length} / {result.checks.length} passing</p>
              </div>
            </div>

            {/* Check list */}
            <div className="space-y-2">
              {result.checks.map((check) => (
                <div
                  key={check.name}
                  className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-900/40 px-5 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-base ${CHECK_STYLES[check.status].color}`}
                      aria-label={check.status}
                    >
                      {CHECK_STYLES[check.status].label}
                    </span>
                    <span className="text-sm text-slate-200">{check.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{check.detail}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Idle state — what gets checked */}
        {state === 'idle' && (
          <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 divide-y divide-slate-700/30">
            <div className="px-5 py-3.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0">Checks</p>
            </div>
            {[
              'dcyfr.io — Portal',
              'dcyfr.app — Templates',
              'dcyfr.tech — Research',
              'dcyfr.codes — Patterns',
              'dcyfr.bot — Agents',
              'dcyfr.build — Infrastructure',
            ].map((name) => (
              <div key={name} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-slate-400">{name}</span>
                <span className="text-xs text-slate-600">sitemap.xml reachability</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
