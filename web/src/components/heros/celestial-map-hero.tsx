'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Moon, Sun } from 'lucide-react';

export default function CelestialMapHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-[#050B14] min-h-[90vh] flex items-center">
      {/* Deep Space Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050B14] to-[#050B14]" />
        
        {/* Constellation lines and glowing stars (SVG overlay) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            {/* Constellation A */}
            <circle cx="70%" cy="30%" r="2" fill="#fff" filter="url(#glow)"/>
            <circle cx="85%" cy="20%" r="3" fill="#fff" filter="url(#glow)"/>
            <circle cx="80%" cy="45%" r="1.5" fill="#fff" />
            <circle cx="95%" cy="40%" r="2.5" fill="#fff" filter="url(#glow)"/>
            <path d="M 70% 30% L 85% 20% L 95% 40% L 80% 45% Z" />
            
            {/* Constellation B */}
            <circle cx="20%" cy="70%" r="2" fill="#fff" filter="url(#glow)"/>
            <circle cx="10%" cy="85%" r="1" fill="#fff" />
            <circle cx="30%" cy="90%" r="3" fill="#fff" filter="url(#glow)"/>
            <circle cx="40%" cy="75%" r="2" fill="#fff" />
            <path d="M 20% 70% L 10% 85% L 30% 90% L 40% 75% Z" />
          </g>
        </svg>

        {/* Floating Astrological cards/elements */}
        <div className="absolute right-[10%] top-[20%] animate-[bounce_6s_ease-in-out_infinite] opacity-80 mix-blend-screen hidden lg:block">
          <div className="w-24 h-32 border border-amber-300/30 rounded-lg flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm shadow-[0_0_15px_rgba(214,180,107,0.2)]">
            <Sun className="w-8 h-8 text-amber-200" />
          </div>
        </div>
        
        <div className="absolute right-[25%] bottom-[15%] animate-[bounce_8s_ease-in-out_infinite_reverse] opacity-80 mix-blend-screen hidden lg:block">
          <div className="w-24 h-32 border border-blue-300/30 rounded-lg flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm shadow-[0_0_15px_rgba(147,197,253,0.2)]">
            <Moon className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-white/10 hover:bg-white/20 text-blue-200 border border-white/20 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-3 h-3 mr-2 inline" /> Cosmic Alignment
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-light tracking-tight leading-tight mb-8 text-white animate-in slide-in-from-bottom-8 duration-1000">
            Navigate your life's journey through the <span className="font-serif font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">Stars</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100/70 mb-10 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-300 font-light leading-relaxed">
            Uncover the celestial map of your destiny. Connect with global experts in astrology, numerology, and tarot to align your path.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in zoom-in duration-1000 delay-500">
            <Link href="/practitioners">
              <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-10 h-14 text-lg rounded-full font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] group transition-all">
                Reveal Your Map <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal inline badge for this hero
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={`inline-flex items-center ${className}`}>{children}</span>;
}
