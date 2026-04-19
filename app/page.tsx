import type { Metadata } from 'next';
import Link from 'next/link';
import extensionsData from '@/data/extensions.json';
import cliData from '@/data/cli-commands.json';
import type { VsCodeExtension, CliCommand } from '@/lib/types';
import { DcyfrButton } from '@/components/ui/dcyfr-button';
import { DcyfrBadge } from '@/components/ui/dcyfr-badge';
import { ContactDialog } from '@/components/ContactDialog';

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
    color: 'border-primary/50/40 bg-primary/40 hover:border-primary/40/60',
    badge: `${(cliData as CliCommand[]).length} commands`,
  },
  {
    href: '/extensions',
    icon: '⬡',
    title: 'VS Code Extensions',
    description:
      'Official DCYFR extensions for Claude Code integration, workspace status, snippet runner, and TLP classification labels.',
    color: 'border-primary/50/40 bg-primary/40 hover:border-primary/40/60',
    badge: `${(extensionsData as VsCodeExtension[]).length} extensions`,
  },
  {
    href: '/profiles',
    icon: '◎',
    title: 'Developer Profiles',
    description:
      'Sign in with GitHub to create your DCYFR developer profile. Showcase projects, earn badges, and appear on the contributor leaderboard.',
    color: 'border-primary/50/40 bg-primary/40 hover:border-primary/40/60',
    badge: 'Coming Q1 2027',
  },
  {
    href: '/community',
    icon: '⊕',
    title: 'Community',
    description:
      'Connect with other DCYFR developers. Job board, contributor leaderboard, article highlights, and community links.',
    color: 'border-primary/50/40 bg-primary/40 hover:border-primary/40/60',
    badge: 'Coming Q1 2027',
  },
  {
    href: '/health',
    icon: '◈',
    title: 'Workspace Health',
    description:
      'One-click reachability check across all 6 DCYFR TLDs. Export diagnostic report as JSON for CI checks or incident response.',
    color: 'border-primary/50/40 bg-primary/40 hover:border-primary/40/60',
    badge: '6 checks',
  },
];

const FEATURED_EXTENSIONS = (extensionsData as VsCodeExtension[]).filter((e) => e.featured).slice(0, 3);
const FEATURED_COMMANDS = (cliData as CliCommand[]).slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-primary/80/40 bg-gradient-to-b from-primary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <DcyfrBadge
            variant="secure"
            size="md"
            className="mb-6 rounded-full border-primary/50/40 bg-primary/60 text-primary/60"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"
              aria-hidden="true"
            />
            Launching Q1 2027
          </DcyfrBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Developer Tools for the<br />
            <span className="text-primary/70">DCYFR Ecosystem</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10">
            CLI reference, VS Code extensions, developer identity, and workspace health
            tooling — everything you need to build with DCYFR.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <DcyfrButton asChild variant="brand" size="lg">
              <Link href="/cli">CLI Reference</Link>
            </DcyfrButton>
            <DcyfrButton asChild variant="ghostly" size="lg">
              <Link href="/extensions">Extensions</Link>
            </DcyfrButton>
            <ContactDialog triggerVariant="secure" triggerSize="lg" />
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">What&apos;s on dcyfr.work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group rounded-xl border p-5 transition-all ${s.color}`}
            >
              <div className="text-2xl mb-3 text-primary/70 font-mono">{s.icon}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors">
                  {s.title}
                </h3>
                <DcyfrBadge
                  variant="secure"
                  size="sm"
                  className="shrink-0 rounded-full border-primary/60/40 bg-primary/60 text-primary/70"
                >
                  {s.badge}
                </DcyfrBadge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Extensions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Featured Extensions</h2>
          <DcyfrButton asChild variant="ghostly" size="sm">
            <Link href="/extensions" className="text-primary/70">
              View all →
            </Link>
          </DcyfrButton>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_EXTENSIONS.map((ext) => (
            <a
              key={ext.id}
              href={ext.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border/80/40 bg-card/40 hover:border-primary/50/50 p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-muted-foreground/60 group-hover:text-foreground transition-colors leading-tight">
                  {ext.name}
                </h3>
                <span className="shrink-0 ml-2 text-xs text-muted-foreground font-mono">v{ext.version}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">{ext.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
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
          <h2 className="text-xl font-bold text-foreground">Common CLI Commands</h2>
          <DcyfrButton asChild variant="ghostly" size="sm">
            <Link href="/cli" className="text-primary/70">
              View all →
            </Link>
          </DcyfrButton>
        </div>
        <div className="space-y-3">
          {FEATURED_COMMANDS.map((cmd) => (
            <Link
              key={cmd.id}
              href={`/cli#${cmd.id}`}
              className="group flex items-start gap-4 rounded-xl border border-border/80/40 bg-card/40 hover:border-primary/50/50 p-4 transition-all"
            >
              <code className="shrink-0 font-mono text-primary/60 text-sm bg-primary/60 border border-primary/60/40 rounded px-2.5 py-1 group-hover:border-primary/50/60 transition-colors">
                {cmd.command}
              </code>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                {cmd.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — profiles preview */}
      <section className="border-t border-primary/80/40 bg-primary/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Developer Profiles — Coming Q1 2027</h2>
          <p className="text-muted-foreground/80 mb-8">
            Sign in with GitHub, showcase your DCYFR projects, earn practitioner badges,
            and connect with employers hiring for AI-native engineering roles.
          </p>
          <DcyfrButton asChild variant="brand" size="lg">
            <Link href="/profiles">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </DcyfrButton>
        </div>
      </section>
    </>
  );
}
