'use client';
import { useLayout } from '@/lib/layout-context';

export function ObservatoryHero() {
  const { setLayout } = useLayout();
  return (
    <section className="relative h-screen flex flex-col items-center justify-center border-4 border-[#1A1A1A] m-4 p-8">
      <button onClick={() => setLayout('mystic-wheel')} className="absolute top-4 left-4 text-xs tracking-widest border border-white/20 px-4 py-1 hover:bg-white/10">ESC</button>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10" />
      <div className="text-center z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 mb-6">
          OBSERVATORY / 01
        </h1>
        <p className="text-sm md:text-base text-blue-200/60 uppercase tracking-[0.3em] mb-12">
          Initializing telemetry... Orbit stable. 
        </p>
        <div className="grid grid-cols-3 gap-4 border border-blue-900/30 p-4 bg-black/50 backdrop-blur-sm">
          <div className="p-4 border border-blue-900/30"><div className="text-[10px] text-blue-400 mb-2">SYSTEM</div><div className="text-xl">ONLINE</div></div>
          <div className="p-4 border border-blue-900/30"><div className="text-[10px] text-blue-400 mb-2">CONNECTION</div><div className="text-xl">SECURE</div></div>
          <div className="p-4 border border-blue-900/30"><div className="text-[10px] text-blue-400 mb-2">ASTRO-DATA</div><div className="text-xl">SYNCED</div></div>
        </div>
      </div>
    </section>
  );
}
