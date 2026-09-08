import Link from 'next/link';
import { LayoutDashboard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoBackButton } from '@/components/GoBackButton';
import type { Metadata } from 'next';

// Scoped to /admin/** — Next.js renders this instead of the root
// not-found.tsx for any unmatched path under this segment (e.g. a mistyped
// /admin/xyz), since src/app/admin/layout.tsx wraps the whole section. Same
// noindex reasoning as the root 404: nothing here for search engines to index.
export const metadata: Metadata = {
  title: 'Page Not Found — Admin Panel',
  description: 'The admin page you are looking for does not exist or the URL may be incorrect.',
  robots: { index: false, follow: false },
};

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
          <Shield className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <p className="text-6xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="text-xl font-black text-white">Page Not Found</h1>
          <p className="text-white/50 text-sm">
            The admin page you&apos;re looking for doesn&apos;t exist or the URL may be incorrect.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/admin/dashboard" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all">
              <LayoutDashboard className="w-4 h-4" />
              Go to Admin Dashboard
            </Button>
          </Link>
          <GoBackButton
            fallbackHref="/admin/dashboard"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
