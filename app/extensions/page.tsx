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
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">VS Code Extensions</h1>
          <p className="text-lg text-muted-foreground/80">
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
            className="flex-1 bg-card/60 border border-border/80/40 rounded-lg px-4 py-2.5 text-sm text-muted-foreground/70 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40/60"
            aria-label="Search extensions"
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  category === cat
                    ? 'bg-primary/60 text-foreground'
                    : 'bg-muted/60 border border-border/80/40 text-muted-foreground hover:text-muted-foreground/70 hover:border-border/60/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
          {filtered.length} extension{filtered.length !== 1 ? 's' : ''}
          {category !== 'All' && ` in ${category}`}
          {search && ` matching "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No extensions match your filters.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ext) => (
              <article
                key={ext.id}
                className="group rounded-xl border border-border/80/40 bg-card/40 hover:border-primary/50/50 transition-all overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors leading-tight">
                      {ext.name}
                    </h2>
                    {ext.featured && (
                      <span className="shrink-0 ml-2 text-xs text-primary/60 bg-primary/60 border border-primary/50/40 rounded-full px-2 py-0.5">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ext.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ext.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground bg-muted/60 border border-border/80/30 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{ext.category}</span>
                    <div className="flex items-center gap-3">
                      <span>{'★'.repeat(Math.round(ext.rating))} {ext.rating.toFixed(1)}</span>
                      <span>v{ext.version}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border/80/30 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {ext.installCount.toLocaleString()} installs
                  </span>
                  <a
                    href={ext.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary/70 hover:text-primary/60 transition-colors"
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
