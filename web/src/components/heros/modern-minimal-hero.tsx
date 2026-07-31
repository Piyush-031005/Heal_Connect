'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModernMinimalHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen bg-[#020202] flex items-center justify-center overflow-hidden pt-20 perspective-[1000px]">
      
      {/* Aurora Borealis Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25)_0%,transparent_60%)] blur-[100px] animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2)_0%,transparent_60%)] blur-[120px] animate-[pulse_15s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_60%)] blur-[90px] animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]" />
        
        {/* Subtle dot matrix overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 h-full">
          
          {/* Hero Content (Left) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">Next-Gen Astrology</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-sans font-black tracking-tighter leading-[1.05] text-white mb-8">
              Cosmic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-lg mb-10">
              Decode the universe with breathtaking clarity. Our verified network of masters provides profound insights into your life's trajectory.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/practitioners" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all font-bold text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105">
                  Begin Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all font-medium text-base backdrop-blur-sm">
                  View Experts
                </Button>
              </Link>
            </div>
          </div>

          {/* Abstract Glassmorphism Composition (Right) */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] hidden md:flex items-center justify-center">
            
            {/* Center Massive Glass Orb */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center animate-[float_10s_ease-in-out_infinite]">
              <div className="w-[280px] h-[280px] rounded-full border border-white/5 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                  <Sparkles className="w-8 h-8 text-cyan-200 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Orbiting Glass Cards */}
            {mounted && [
              { top: '10%', left: '10%', rot: '-15deg', delay: '0s', label: 'Natal Chart' },
              { top: '60%', left: '-5%', rot: '10deg', delay: '2s', label: 'Tarot Arcana' },
              { top: '80%', left: '60%', rot: '-5deg', delay: '4s', label: 'Vastu Shastra' },
              { top: '20%', left: '70%', rot: '15deg', delay: '1s', label: 'Numerology' },
            ].map((card, idx) => (
              <div 
                key={idx}
                className="absolute w-40 h-48 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl p-5 flex flex-col justify-end"
                style={{
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.rot})`,
                  animation: `float 8s ease-in-out infinite alternate`,
                  animationDelay: card.delay
                }}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 mb-auto flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                </div>
                <h4 className="text-white font-medium text-sm">{card.label}</h4>
                <p className="text-white/40 text-[10px] mt-1">Live syncing...</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </section>
  );
}
