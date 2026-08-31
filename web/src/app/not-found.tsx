import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { GoBackButton } from '@/components/GoBackButton';
import type { Metadata } from 'next';

// SEO: this file is Next.js's App Router convention for the 404 page — it's
// rendered (with a real HTTP 404 status, not 200) for any URL under this app
// that doesn't match a route, and for any explicit notFound() call. Marking
// it noindex,nofollow keeps a page that intentionally has no real content
// out of search results, without needing a robots.txt exclusion.
export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or the URL may be incorrect.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#1a1a1a] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="w-full max-w-lg text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Compass className="h-10 w-10 text-white" />
          </div>

          <div className="space-y-2">
            <p className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              404
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Page Not Found</h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or the URL may be incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2 rounded-2xl px-6 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold border-0 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all">
                <Home className="h-4 w-4" />
                Go to Home
              </Button>
            </Link>
            <GoBackButton fallbackHref="/" className="w-full sm:w-auto border-yellow-200 hover:border-yellow-400 hover:text-[#d97706] hover:bg-amber-50" />
          </div>
        </div>
      </main>
    </div>
  );
}
