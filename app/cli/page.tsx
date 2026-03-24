import type { Metadata } from 'next';
import cliData from '@/data/cli-commands.json';
import type { CliCommand } from '@/lib/types';

export const metadata: Metadata = {
  title: 'CLI Reference',
  description: 'Complete reference for @dcyfr/ai-cli — agent run, delegate, workspace health, OpenSpec commands, and more.',
  openGraph: { url: 'https://dcyfr.work/cli' },
};

const commands = cliData as CliCommand[];

export default function CliPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">CLI Reference</h1>
          <p className="text-lg text-slate-300 mb-4">
            Complete command reference for{' '}
            <code className="text-indigo-300 bg-indigo-950/60 border border-indigo-800/40 rounded px-1.5 py-0.5 text-sm">
              @dcyfr/ai-cli
            </code>.
          </p>
          <div className="rounded-lg border border-slate-700/40 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 mb-2">Install</p>
            <code className="text-sm text-indigo-300 font-mono">npm install -g @dcyfr/ai-cli</code>
          </div>
        </div>

        {/* Command list */}
        <div className="space-y-8">
          {commands.map((cmd) => (
            <article
              key={cmd.id}
              id={cmd.id}
              className="rounded-xl border border-slate-700/40 bg-slate-900/40 overflow-hidden"
            >
              {/* Command header */}
              <div className="border-b border-slate-700/40 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <code className="text-lg font-mono font-bold text-indigo-300">{cmd.command}</code>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="border border-slate-700/40 rounded px-2 py-0.5">{cmd.package}</span>
                  <span className="border border-slate-700/40 rounded px-2 py-0.5">since {cmd.since}</span>
                </div>
              </div>

              <div className="px-5 py-4 space-y-4">
                {/* Description */}
                <p className="text-slate-300">{cmd.description}</p>

                {/* Usage */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usage</p>
                  <pre className="text-sm text-indigo-200 bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-4 py-3 overflow-x-auto">
                    <code>{cmd.usage}</code>
                  </pre>
                </div>

                {/* Flags */}
                {cmd.flags && cmd.flags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Flags</p>
                    <div className="space-y-1.5">
                      {cmd.flags.map((f) => (
                        <div key={f.flag} className="flex flex-wrap items-start gap-2 text-sm">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <code className="text-indigo-300 bg-indigo-950/40 border border-indigo-800/30 rounded px-2 py-0.5 font-mono text-xs">
                              {f.flag}
                            </code>
                            {f.alias && (
                              <code className="text-slate-400 bg-slate-800/40 border border-slate-700/30 rounded px-2 py-0.5 font-mono text-xs">
                                {f.alias}
                              </code>
                            )}
                            {f.required && (
                              <span className="text-xs text-amber-400 border border-amber-700/40 rounded px-1.5 py-0.5">
                                required
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400">{f.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Examples</p>
                  <div className="space-y-1.5">
                    {cmd.examples.map((ex, i) => (
                      <pre
                        key={i}
                        className="text-sm text-slate-200 bg-slate-800/60 border border-slate-700/40 rounded-lg px-4 py-2.5 overflow-x-auto"
                      >
                        <code>{ex}</code>
                      </pre>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
