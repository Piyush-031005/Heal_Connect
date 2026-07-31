'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CelestialMapHero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-[#05050A] flex items-center justify-center pt-20">
      
      {/* Deep Space & Nebula Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#05050A]" />
        {/* Nebula glowing blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(212,168,67,0.15)_0%,transparent_50%)] blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(212,168,67,0.08)_0%,transparent_60%)] blur-3xl animate-[pulse_15s_ease-in-out_infinite_alternate]" />
        
        {/* SVG Constellation Network */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Abstract Constellation Lines & Stars */}
          <g stroke="#D4A843" strokeWidth="0.5" fill="none">
            <polyline points="10%,20% 25%,15% 40%,30% 35%,50% 15%,45%" />
            <polyline points="60%,10% 75%,25% 65%,40% 90%,35% 95%,15%" />
            <polyline points="50%,70% 70%,60% 85%,80% 95%,75%" />
            <polyline points="30%,80% 45%,90% 60%,85%" />
            <line x1="40%" y1="30%" x2="70%" y2="60%" opacity="0.3" strokeDasharray="4 4" />
            <line x1="65%" y1="40%" x2="70%" y2="60%" opacity="0.3" strokeDasharray="4 4" />
          </g>
          
          <g fill="#D4A843">
            {/* Main Stars */}
            <circle cx="10%" cy="20%" r="3" className="animate-pulse" />
            <circle cx="25%" cy="15%" r="2" />
            <circle cx="40%" cy="30%" r="4" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="35%" cy="50%" r="2" />
            <circle cx="15%" cy="45%" r="3" />
            
            <circle cx="60%" cy="10%" r="3" />
            <circle cx="75%" cy="25%" r="4" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="65%" cy="40%" r="2" />
            <circle cx="90%" cy="35%" r="3" />
            <circle cx="95%" cy="15%" r="2" />
            
            <circle cx="50%" cy="70%" r="3" />
            <circle cx="70%" cy="60%" r="5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="85%" cy="80%" r="2" />
            <circle cx="95%" cy="75%" r="3" />
          </g>

          {/* Random Star Dust */}
          {Array.from({ length: 150 }).map((_, i) => (
            <circle 
              key={`dust-${i}`}
              cx={`${Math.random() * 100}%`} 
              cy={`${Math.random() * 100}%`} 
              r={Math.random() * 1.5 + 0.5} 
              fill="#FFFFFF" 
              opacity={Math.random() * 0.5 + 0.1}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (Left/Center) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(212,168,67,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse shadow-[0_0_10px_#D4A843]" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-semibold text-[#D4A843]">The Oracle Network</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-serif leading-[1.05] tracking-tight text-white mb-8">
              Chart Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A843] via-[#F4D068] to-[#997321] italic pr-4">
                Constellation
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-xl font-light leading-relaxed mb-12 border-l-2 border-[#D4A843]/40 pl-6">
              Transcend ordinary guidance. Access an elite network of celestial interpreters mapping the precise alignment of your destiny.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/practitioners">
                <Button className="h-14 px-10 rounded-none bg-gradient-to-r from-[#D4A843] to-[#F4D068] hover:from-[#F4D068] hover:to-[#D4A843] text-black font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,168,67,0.3)]">
                  Initiate Link <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating Glass Panels (Right) */}
          <div className="lg:col-span-5 relative h-[600px] hidden lg:block perspective-[1200px]">
            {/* Main Panel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-[3/4] bg-white/5 border border-white/10 backdrop-blur-2xl p-10 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform rotate-y-[-12deg] rotate-x-[8deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-1000 group">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 border border-[#D4A843]/40 bg-[#D4A843]/5 flex items-center justify-center text-[#D4A843] group-hover:scale-110 transition-transform duration-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <span className="text-white/30 font-mono text-xs uppercase tracking-widest">SYS.001</span>
              </div>
              <div className="space-y-6">
                <div className="h-px w-full bg-gradient-to-r from-[#D4A843]/50 to-transparent" />
                <h3 className="text-3xl font-serif text-white/90">Quantum <br/>Readings</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  Pinpoint accuracy derived from the exact intersection of planetary bodies at your moment of origin.
                </p>
              </div>
            </div>
            
            {/* Decorative Sub-panel */}
            <div className="absolute top-[10%] right-[-15%] w-56 p-5 bg-[#05050A]/80 border border-[#D4A843]/30 backdrop-blur-xl shadow-2xl transform rotate-y-[15deg] translate-z-[50px] animate-[float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">Live Connection</span>
              </div>
              <p className="text-white/90 text-sm font-serif">500+ Seers Active</p>
            </div>
            
            {/* Decorative Sub-panel 2 */}
            <div className="absolute bottom-[15%] left-[-15%] w-64 p-6 bg-[#D4A843]/10 border border-[#D4A843]/20 backdrop-blur-xl transform -rotate-y-[20deg] translate-z-[80px] animate-[float_8s_ease-in-out_infinite_reverse]">
              <p className="text-[#D4A843] text-xs font-mono mb-2 tracking-widest">COORDINATES LOCKED</p>
              <div className="h-1.5 w-full bg-white/10 mt-3 overflow-hidden rounded-full">
                <div className="h-full bg-gradient-to-r from-[#D4A843]/50 to-[#F4D068] w-2/3 animate-[slideRight_3s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotateY(15deg); }
          50% { transform: translateY(-20px) rotateY(20deg); }
          100% { transform: translateY(0px) rotateY(15deg); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </section>
  );
}
