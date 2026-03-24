import type { Metadata } from 'next';
import Link from 'next/link';
import extensionsData from '@/data/extensions.json';
import cliData from '@/data/cli-commands.json';
import type { VsCodeExtension, CliCommand } from '@/lib/types';

export const metadata: Metadata = {
  title: 'DCYFR Work — Developer Tools & Identity',
  description:
    'CLI reference, VS Code extensions, developer profiles, and workspace health tooling for the DCYFR ecosystem.',
};

const SECTIONS = [
  {
    href: '/cli',
    icon: '>_',
    title: 'CLI Reference',
    description:
      'Complete reference for @dcyfr/ai-cli commands — agent run, delegate, workspace health, OpenSpec, and more.',
    color: 'border-indigo-700/40 bg-indigo-950/40 hover:border-indigo-600/60',
    badge: `${(cliData as CliCommand[]).length} commands`,
  },
  {
    href: '/extensions',
    icon: '⬡',
    title: 'VS Code Extensions',
    description:
      'Official DCYFR extensions for Claude Code integration, workspace status, snippet runner, and TLP classification labels.',
    color: 'border-indigo-700/40 bg-indigo-950/40 hover:border-indigo-600/60',
    badge: `${(extensionsData as VsCodeExtension[]).length} extensions`,
  },
  {
    href: '/profiles',
    icon: '◎',
    title: 'Developer Profiles',
    description:
      'Sign in with GitHub to create your DCYFR developer profile. Showcase projects, earn badges, and appear on the contributor leaderboard.',
    color: 'border-indigo-700/40 bg-indigo-950/40 hover:border-indigo-600/60',
    badge: 'Coming Q1 2027',
  },
  {
    href: '/community',
    icon: '⊕',
    title: 'Community',
    description:
      'Connect with other DCYFR developers. Job board, contributor leaderboard, article highlights, and community links.',
    color: 'border-indigo-700/40 bg-indigo-950/40 hover:border-indigo-600/60',
    badge: 'Coming Q1 2027',
  },
  {
    href: '/health',
    icon: '◈',
    title: 'Workspace Health',
    description:
      'One-click reachability check across all 6 DCYFR TLDs. Export diagnostic report as JSON for CI checks or incident response.',
    color: 'border-indigo-700/40 bg-indigo-950/40 hover:border-indigo-600/60',
    badge: '6 checks',
  },
];

const FEATURED_EXTENSIONS = (extensionsData as VsCodeExtension[]).filter((e) => e.featured).slice(0, 3);
const FEATURED_COMMANDS = (cliData as CliCommand[]).slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-indigo-900/40 bg-gradient-to-b from-indigo-950/40 to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-700/40 bg-indigo-950/60 px-3 py-1 text-xs text-indigo-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Launching Q1 2027</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Developer Tools for the<br />
            <span className="text-indigo-400">DCYFR Ecosystem</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            CLI reference, VS Code extensions, developer identity, and workspace health
            tooling — everything you need to build with DCYFR.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cli"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              CLI Reference
            </Link>
            <Link
              href="/extensions"
              className="border border-indigo-600/50 hover:border-indigo-500 text-indigo-300 hover:text-indigo-200 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Extensions
            </Link>
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">What&apos;s on dcyfr.work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group rounded-xl border p-5 transition-all ${s.color}`}
            >
              <div className="text-2xl mb-3 text-indigo-400 font-mono">{s.icon}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <span className="text-xs text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 rounded-full px-2 py-0.5">
                  {s.badge}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Extensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Featured Extensions</h2>
          <Link href="/extensions" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_EXTENSIONS.map((ext) => (
            <a
              key={ext.id}
              href={ext.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-700/40 bg-slate-900/40 hover:border-indigo-700/50 p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors leading-tight">
                  {ext.name}
                </h3>
                <span className="shrink-0 ml-2 text-xs text-slate-400 font-mono">v{ext.version}</span>
              </div>
              <p className="text-sm text-slate-400 mb-3 leading-relaxed line-clamp-2">{ext.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{ext.category}</span>
                <span>{'★'.repeat(Math.round(ext.rating))} {ext.rating}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured CLI Commands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Common CLI Commands</h2>
          <Link href="/cli" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {FEATURED_COMMANDS.map((cmd) => (
            <Link
              key={cmd.id}
              href={`/cli#${cmd.id}`}
              className="group flex items-start gap-4 rounded-xl border border-slate-700/40 bg-slate-900/40 hover:border-indigo-700/50 p-4 transition-all"
            >
              <code className="shrink-0 font-mono text-indigo-300 text-sm bg-indigo-950/60 border border-indigo-800/40 rounded px-2.5 py-1 group-hover:border-indigo-700/60 transition-colors">
                {cmd.command}
              </code>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {cmd.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — profiles preview */}
      <section className="border-t border-indigo-900/40 bg-indigo-950/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Developer Profiles — Coming Q1 2027</h2>
          <p className="text-slate-300 mb-8">
            Sign in with GitHub, showcase your DCYFR projects, earn practitioner badges,
            and connect with employers hiring for AI-native engineering roles.
          </p>
          <Link
            href="/profiles"
            className="inline-flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <span>Learn more</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
