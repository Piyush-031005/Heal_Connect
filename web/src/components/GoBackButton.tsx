'use client';

/**
 * Small client-only "Go Back" button for use inside Server Component pages
 * (like not-found.tsx) that otherwise need to stay server-rendered so they
 * can export `metadata` (e.g. noindex on 404 pages). Falls back to the
 * given href if there's no browser history to go back to (e.g. someone
 * lands directly on the 404 page from a bookmark or typed URL).
 */
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function GoBackButton({ fallbackHref, className }: { fallbackHref: string; className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      className={cn('gap-2 rounded-2xl px-5 font-semibold', className)}
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </Button>
  );
}
