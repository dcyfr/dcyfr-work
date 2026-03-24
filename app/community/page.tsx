import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Connect with other DCYFR developers. Job board, contributor leaderboard, article highlights, and community links.',
  openGraph: { url: 'https://dcyfr.work/community' },
};

const COMMUNITY_LINKS = [
  {
    name: 'GitHub Discussions',
    description: 'Technical Q&A, feature requests, and architectural discussions.',
    href: 'https://github.com/dcyfr/dcyfr-workspace/discussions',
    icon: '⬡',
    label: 'github.com/dcyfr',
  },
  {
    name: 'Discord',
    description: "Real-time chat with other DCYFR developers. #general, #agents, #rag, #infra.",
    href: 'https://discord.gg/dcyfr',
    icon: '◈',
    label: 'discord.gg/dcyfr',
  },
  {
    name: 'dcyfr.tech Blog',
    description: 'Technical articles on agent patterns, context engineering, infrastructure, and more.',
    href: 'https://dcyfr.tech',
    icon: '▣',
    label: 'dcyfr.tech',
  },
];

const CURATED_ARTICLES = [
  {
    title: 'Delegation Framework v2: Trustworthy Agent Composition',
    href: 'https://dcyfr.tech/articles/delegation-framework-v2',
    category: 'Agent Patterns',
    readingTime: 8,
  },
  {
    title: 'Context Engineering: Managing Attention Budgets in Long-Running Agents',
    href: 'https://dcyfr.tech/articles/context-engineering-attention-budgets',
    category: 'Context Engineering',
    readingTime: 11,
  },
  {
    title: 'Introducing dcyfr.bot: A Curated Agent Marketplace',
    href: 'https://dcyfr.tech/articles/dcyfr-bot-agent-marketplace-launch',
    category: 'Agent Patterns',
    readingTime: 5,
  },
];

export default function CommunityPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Coming soon banner */}
        <div className="rounded-xl border border-indigo-700/40 bg-indigo-950/40 px-5 py-4 flex items-center gap-3 mb-10">
          <span className="text-indigo-400 text-xl">⊕</span>
          <div>
            <p className="font-semibold text-indigo-200">Full launch Q1 2027</p>
            <p className="text-sm text-indigo-400">Job board and contributor leaderboard coming in Phase 4. Community channels are already live.</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Community</h1>
          <p className="text-lg text-slate-300">
            Connect with other developers building on the DCYFR ecosystem. Ask questions,
            share projects, and find collaborators.
          </p>
        </div>

        {/* Community links */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Join the Conversation</h2>
          <div className="space-y-3">
            {COMMUNITY_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-slate-700/40 bg-slate-900/40 hover:border-indigo-700/50 p-5 transition-all"
              >
                <span className="shrink-0 text-2xl font-mono text-indigo-400 mt-0.5">{link.icon}</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                      {link.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{link.label}</span>
                  </div>
                  <p className="text-sm text-slate-400">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Curated articles */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Article Highlights</h2>
            <a href="https://dcyfr.tech/articles" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              All articles →
            </a>
          </div>
          <div className="space-y-3">
            {CURATED_ARTICLES.map((a) => (
              <a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-slate-700/40 bg-slate-900/40 hover:border-indigo-700/50 px-5 py-4 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{a.category} · {a.readingTime} min read</p>
                </div>
                <span className="shrink-0 text-indigo-400 text-sm">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Job board — coming soon */}
        <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-6 text-center">
          <div className="text-3xl font-mono text-slate-600 mb-3">▣</div>
          <h2 className="font-semibold text-white mb-2">Job Board — Coming Q1 2027</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            A curated board of roles specifically seeking developers with DCYFR ecosystem experience —
            AI-native engineering, agent orchestration, RAG pipeline development, and infrastructure.
          </p>
          <Link
            href="/profiles"
            className="inline-block mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Create your profile to get notified →
          </Link>
        </div>
      </div>
    </div>
  );
}
