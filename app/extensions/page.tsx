'use client';

import { useState } from 'react';
import extensionsData from '@/data/extensions.json';
import type { VsCodeExtension } from '@/lib/types';

const CATEGORIES = ['All', 'AI & ML', 'Productivity', 'Linting', 'Themes', 'DevOps'] as const;

export default function ExtensionsPage() {
  const extensions = extensionsData as VsCodeExtension[];
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = extensions.filter((e) => {
    const matchCat = category === 'All' || e.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">VS Code Extensions</h1>
          <p className="text-lg text-slate-300">
            Official DCYFR extensions for VS Code — Claude Code integration, workspace tooling,
            and developer ergonomics.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="search"
            placeholder="Search extensions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-900/60 border border-slate-700/40 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-600/60"
            aria-label="Search extensions"
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  category === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-slate-200 hover:border-slate-600/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-slate-400 mb-6" aria-live="polite">
          {filtered.length} extension{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && ` in ${category}`}
          {search && ` matching "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-slate-400 text-center py-16">No extensions match your filters.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ext) => (
              <article
                key={ext.id}
                className="group rounded-xl border border-slate-700/40 bg-slate-900/40 hover:border-indigo-700/50 transition-all overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-semibold text-slate-100 group-hover:text-white transition-colors leading-tight">
                      {ext.name}
                    </h2>
                    {ext.featured && (
                      <span className="shrink-0 ml-2 text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-700/40 rounded-full px-2 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{ext.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ext.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/30 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{ext.category}</span>
                    <div className="flex items-center gap-3">
                      <span>{'★'.repeat(Math.round(ext.rating))} {ext.rating.toFixed(1)}</span>
                      <span>v{ext.version}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-700/30 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {ext.installCount.toLocaleString()} installs
                  </span>
                  <a
                    href={ext.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Install →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
