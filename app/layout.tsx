import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { PageShell, SiteNav, SiteFooter } from '@/components/chrome';
import { DcyfrToaster } from '@/components/ui/dcyfr-sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'DCYFR Work — Developer Tools & Identity',
    template: '%s | dcyfr.work',
  },
  description:
    'CLI reference, VS Code extensions, developer profiles, and workspace health tooling for the DCYFR ecosystem.',
  metadataBase: new URL('https://dcyfr.work'),
  openGraph: {
    siteName: 'dcyfr.work',
    type: 'website',
    url: 'https://dcyfr.work',
  },
};

const DcyfrWorkLogo = (
  <span className="inline-flex items-center gap-2 text-lg font-bold tracking-tight">
    <span className="text-accent">⬡</span>
    <span>
      dcyfr<span className="text-accent">.work</span>
    </span>
  </span>
);

const NAV_LINKS = [
  { href: '/cli', label: 'CLI Ref' },
  { href: '/extensions', label: 'Extensions' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/community', label: 'Community' },
  { href: '/health', label: 'Health' },
];

const FOOTER_COLUMNS = [
  {
    title: 'Products',
    links: [
      { href: '/cli', label: 'CLI Reference' },
      { href: '/extensions', label: 'Extensions' },
      { href: '/profiles', label: 'Profiles' },
      { href: '/community', label: 'Community' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { href: 'https://dcyfr.io', label: 'dcyfr.io', external: true },
      { href: 'https://dcyfr.bot', label: 'dcyfr.bot', external: true },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} theme-dcyfr-work`}>
      <body className="min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PageShell
            nav={<SiteNav logo={DcyfrWorkLogo} links={NAV_LINKS} />}
            footer={
              <SiteFooter
                brand={{
                  name: 'dcyfr.work',
                  tagline: 'Developer Tools & Identity Layer',
                }}
                columns={FOOTER_COLUMNS}
                copyright="© 2027 DCYFR Labs. All rights reserved. — launching Q1 2027"
              />
            }
            padding="none"
            maxWidth="full"
          >
            {children}
          </PageShell>
          <DcyfrToaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
