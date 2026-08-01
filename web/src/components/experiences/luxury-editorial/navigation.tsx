'use client';
import { Layout } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';

export function LuxuryNavigation() {
  const { setLayout } = useLayout();
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-10 flex items-center justify-between mix-blend-difference text-white">
      <div className="font-sans text-[11px] uppercase tracking-[0.3em]">HealConnect</div>
      <div className="font-serif italic text-2xl">Maison de l'Astrologie</div>
      <button onClick={() => setLayout('mystic-wheel')} className="font-sans text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
        <Layout className="w-3 h-3" /> Return
      </button>
    </nav>
  );
}
