import { NextResponse } from 'next/server';
import type { HealthCheck, HealthCheckResult } from '@/lib/types';

const TLD_CHECKS = [
  { name: 'dcyfr.io — Portal', url: 'https://dcyfr.io/sitemap.xml' },
  { name: 'dcyfr.app — Templates', url: 'https://dcyfr.app/sitemap.xml' },
  { name: 'dcyfr.tech — Research', url: 'https://dcyfr.tech/sitemap.xml' },
  { name: 'dcyfr.codes — Patterns', url: 'https://dcyfr.codes/sitemap.xml' },
  { name: 'dcyfr.bot — Agents', url: 'https://dcyfr.bot/sitemap.xml' },
  { name: 'dcyfr.build — Infrastructure', url: 'https://dcyfr.build/sitemap.xml' },
];

const TIMEOUT_MS = 8_000;

async function checkUrl(url: string): Promise<{ ok: boolean; statusCode?: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timer);
    return { ok: res.ok, statusCode: res.status };
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : 'unknown error';
    return { ok: false, error: message.includes('abort') ? 'timeout' : message };
  }
}

export async function GET() {
  const results = await Promise.allSettled(
    TLD_CHECKS.map(async ({ name, url }) => {
      const result = await checkUrl(url);
      const check: HealthCheck = {
        name,
        status: result.ok ? 'pass' : result.error === 'timeout' ? 'warn' : 'fail',
        detail: result.ok
          ? `HTTP ${result.statusCode}`
          : result.error === 'timeout'
          ? `Timeout after ${TIMEOUT_MS / 1000}s`
          : (result.error ?? `HTTP ${result.statusCode}`),
      };
      return check;
    }),
  );

  const checks: HealthCheck[] = results.map((r) =>
    r.status === 'fulfilled'
      ? r.value
      : { name: 'unknown', status: 'fail' as const, detail: 'internal error' },
  );

  const failCount = checks.filter((c) => c.status === 'fail').length;
  const warnCount = checks.filter((c) => c.status === 'warn').length;

  const overallStatus: HealthCheckResult['status'] =
    failCount > 0 ? 'critical' : warnCount > 0 ? 'warning' : 'healthy';

  const payload: HealthCheckResult = {
    status: overallStatus,
    checks,
    runAt: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
