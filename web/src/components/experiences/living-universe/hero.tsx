'use client';
import { useLayout } from '@/lib/layout-context';

export function UniverseHero() {
  const { setLayout } = useLayout();
  return (
    <section className="h-[200vh] relative">
      <button onClick={() => setLayout('mystic-wheel')} className="fixed top-8 left-8 z-50 mix-blend-difference text-white uppercase text-xs tracking-widest font-bold">Return</button>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mix-blend-overlay opacity-80">UNIVERSE</h1>
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-purple-600/30 to-orange-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
      </div>
    </section>
  );
}
