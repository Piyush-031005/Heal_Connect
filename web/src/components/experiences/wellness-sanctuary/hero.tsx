'use client';
import { useLayout } from '@/lib/layout-context';

export function SanctuaryHero() {
  const { setLayout } = useLayout();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <button onClick={() => setLayout('mystic-wheel')} className="absolute top-8 left-8 font-medium bg-white/50 px-4 py-2 rounded-full text-sm hover:bg-white transition-colors">Breathe & Return</button>
      <div className="w-[600px] h-[600px] absolute bg-[#D8E4D3] rounded-full blur-[80px] -z-10 animate-[ping_10s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">Find your center.</h1>
      <p className="text-lg md:text-xl opacity-80 max-w-lg mb-12">Astrology designed for mental clarity and emotional peace.</p>
      <button className="bg-[#4A5D4E] text-white px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">Start Healing</button>
    </section>
  );
}
