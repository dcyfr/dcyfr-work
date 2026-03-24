// VS Code extension metadata
export interface VsCodeExtension {
  id: string;
  slug: string;
  name: string;
  description: string;
  publisher: string;
  version: string;
  category: 'AI & ML' | 'Productivity' | 'Testing' | 'Linting' | 'Themes' | 'DevOps';
  tags: string[];
  installCount: number; // approximate
  rating: number; // 0–5
  marketplaceUrl: string;
  featured: boolean;
}

// CLI command reference entry
export interface CliCommand {
  id: string;
  command: string; // e.g. "dcyfr agent run"
  description: string;
  usage: string;
  flags?: CliFlag[];
  examples: string[];
  package: string; // e.g. "@dcyfr/ai-cli"
  since: string; // semver
}

export interface CliFlag {
  flag: string; // e.g. "--agent"
  alias?: string; // e.g. "-a"
  description: string;
  required: boolean;
}

// Developer profile (Phase 4 identity layer)
export interface DeveloperProfile {
  id: string;
  githubUsername: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  badges: BadgeName[];
  projectCount: number;
  joinedAt: string; // ISO 8601
  public: boolean;
}

export type BadgeName =
  | 'Agent Practitioner'
  | 'RAG Expert'
  | 'Code Gen Pioneer'
  | 'Infrastructure Specialist'
  | 'Core Contributor'
  | 'Early Adopter';

// Workspace health check result
export interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  checks: HealthCheck[];
  runAt: string; // ISO 8601
}

export interface HealthCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}
