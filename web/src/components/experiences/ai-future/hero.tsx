'use client';
import { useLayout } from '@/lib/layout-context';

export function AiHero() {
  const { setLayout } = useLayout();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-[url('/grid.svg')]">
      <button onClick={() => setLayout('mystic-wheel')} className="absolute top-8 left-8 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">Abort</button>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
      
      <div className="z-10 text-center flex flex-col items-center">
        <div className="w-24 h-24 mb-8 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-[2px] shadow-[0_0_40px_rgba(147,51,234,0.3)]">
          <div className="w-full h-full bg-[#0A0A0F] rounded-2xl flex items-center justify-center">
             <div className="w-8 h-8 border-t-2 border-r-2 border-purple-500 animate-spin rounded-full" />
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white animate-pulse">
          NEURAL DESTINY
        </h1>
        <p className="text-xl text-purple-200/60 max-w-xl">
          The world's first AI-driven astrological prediction engine. Unprecedented accuracy.
        </p>
      </div>
    </section>
  );
}
