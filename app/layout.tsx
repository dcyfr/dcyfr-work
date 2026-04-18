import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} theme-dcyfr-work`}>
      <body className="bg-slate-950 text-slate-50 min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <header className="border-b border-indigo-900/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-100 font-bold text-lg hover:text-white transition-colors"
            >
              <span className="text-indigo-400">⬡</span>
              <span>dcyfr<span className="text-indigo-400">.work</span></span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/cli" className="inline-flex items-center min-h-[44px] text-slate-300 hover:text-slate-100 transition-colors">CLI Ref</Link>
              <Link href="/extensions" className="inline-flex items-center min-h-[44px] text-slate-300 hover:text-slate-100 transition-colors">Extensions</Link>
              <Link href="/profiles" className="inline-flex items-center min-h-[44px] text-slate-300 hover:text-slate-100 transition-colors">Profiles</Link>
              <Link href="/community" className="inline-flex items-center min-h-[44px] text-slate-300 hover:text-slate-100 transition-colors">Community</Link>
              <Link href="/health" className="inline-flex items-center min-h-[44px] text-slate-300 hover:text-slate-100 transition-colors">Health</Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-indigo-900/50 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-semibold text-slate-300">dcyfr.work</p>
                <p className="text-xs text-slate-400 mt-1">Developer Tools &amp; Identity Layer</p>
              </div>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400" aria-label="Footer navigation">
                <Link href="/cli" className="hover:text-slate-200 transition-colors">CLI Reference</Link>
                <Link href="/extensions" className="hover:text-slate-200 transition-colors">Extensions</Link>
                <Link href="/profiles" className="hover:text-slate-200 transition-colors">Profiles</Link>
                <Link href="/community" className="hover:text-slate-200 transition-colors">Community</Link>
                <a href="https://dcyfr.io" className="hover:text-slate-200 transition-colors">dcyfr.io</a>
                <a href="https://dcyfr.bot" className="hover:text-slate-200 transition-colors">dcyfr.bot</a>
              </nav>
            </div>
            <div className="mt-6 pt-6 border-t border-indigo-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
              <p>&copy; 2027 DCYFR Labs. All rights reserved.</p>
              <p>dcyfr.work — launching Q1 2027</p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
