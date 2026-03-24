import type { MetadataRoute } from 'next';
import cliData from '@/data/cli-commands.json';
import type { CliCommand } from '@/lib/types';

const BASE_URL = 'https://dcyfr.work';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/cli`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/extensions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/profiles`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const commandRoutes: MetadataRoute.Sitemap = (cliData as CliCommand[]).map((cmd) => ({
    url: `${BASE_URL}/cli#${cmd.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...commandRoutes];
}
