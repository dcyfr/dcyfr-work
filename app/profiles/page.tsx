import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Profiles',
  description: 'Create your DCYFR developer profile, earn practitioner badges, and connect with employers. Launching Q1 2027.',
  openGraph: { url: 'https://dcyfr.work/profiles' },
};

const BADGES = [
  {
    name: 'Agent Practitioner',
    description: 'Completed 10+ agent delegation workflows using @dcyfr/ai.',
    icon: '⬡',
    color: 'border-indigo-700/40 bg-indigo-950/40 text-indigo-300',
  },
  {
    name: 'RAG Expert',
    description: 'Built and deployed a production RAG pipeline with the rag-pipeline-basic pattern.',
    icon: '◈',
    color: 'border-violet-700/40 bg-violet-950/40 text-violet-300',
  },
  {
    name: 'Code Gen Pioneer',
    description: 'Used the code-gen-basic snippet in a published project.',
    icon: '>_',
    color: 'border-cyan-700/40 bg-cyan-950/40 text-cyan-300',
  },
  {
    name: 'Infrastructure Specialist',
    description: 'Deployed an AI-native service using a dcyfr.build template.',
    icon: '▣',
    color: 'border-emerald-700/40 bg-emerald-950/40 text-emerald-300',
  },
  {
    name: 'Core Contributor',
    description: 'Merged 3+ pull requests into a DCYFR open-source repository.',
    icon: '✦',
    color: 'border-amber-700/40 bg-amber-950/40 text-amber-300',
  },
  {
    name: 'Early Adopter',
    description: 'Created a developer profile during the Q1 2027 launch window.',
    icon: '◎',
    color: 'border-rose-700/40 bg-rose-950/40 text-rose-300',
  },
];

export default function ProfilesPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Coming soon banner */}
        <div className="rounded-xl border border-indigo-700/40 bg-indigo-950/40 px-5 py-4 flex items-center gap-3 mb-10">
          <span className="text-indigo-400 text-xl">◎</span>
          <div>
            <p className="font-semibold text-indigo-200">Launching Q1 2027</p>
            <p className="text-sm text-indigo-400">Developer profiles are in development. Full GitHub OAuth + badge system coming in Phase 4.</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Developer Profiles</h1>
          <p className="text-lg text-slate-300">
            Your DCYFR identity layer. Sign in with GitHub to create a profile, showcase projects
            built with DCYFR tools, earn practitioner badges, and connect with employers hiring
            for AI-native engineering roles.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {[
            {
              icon: '⬡',
              title: 'GitHub OAuth Login',
              description: 'Sign in with your GitHub account. Profile auto-populates from your GitHub bio and avatar.',
            },
            {
              icon: '◈',
              title: 'Project Showcase',
              description: 'List public projects that use DCYFR tools. Link to GitHub repos, deployed sites, and npm packages.',
            },
            {
              icon: '✦',
              title: 'Practitioner Badges',
              description: 'Earn verifiable badges by demonstrating DCYFR tool mastery through published projects and contributions.',
            },
            {
              icon: '▣',
              title: 'Contributor Leaderboard',
              description: 'Rank among top DCYFR contributors by badge count, project impact, and community engagement.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-5"
            >
              <div className="text-2xl text-indigo-400 font-mono mb-3">{f.icon}</div>
              <h2 className="font-semibold text-slate-100 mb-2">{f.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Badge showcase */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">Practitioner Badges</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-xl border p-4 ${badge.color}`}
              >
                <div className="text-2xl font-mono mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm mb-1.5">{badge.name}</h3>
                <p className="text-xs opacity-70 leading-relaxed">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-xl border border-slate-700/40 bg-slate-900/40 p-5">
          <h2 className="font-semibold text-white mb-2">Privacy First</h2>
          <p className="text-sm text-slate-400">
            Profiles are public by default but can be set to private. We only store your GitHub
            username, display name, and bio — no email, no private repo data. Delete your profile
            at any time from your settings.
          </p>
        </div>
      </div>
    </div>
  );
}
