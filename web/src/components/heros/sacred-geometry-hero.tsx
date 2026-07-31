'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function SacredGeometryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-stone-50 dark:bg-stone-950 min-h-[90vh] flex items-center">
      
      {/* Sacred Geometry SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] animate-[spin_240s_linear_infinite]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeWidth="0.1" fill="none">
            {/* Metatron's Cube / Flower of Life approximation elements */}
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="20" />
            
            <circle cx="50" cy="10" r="10" />
            <circle cx="84.6" cy="30" r="10" />
            <circle cx="84.6" cy="70" r="10" />
            <circle cx="50" cy="90" r="10" />
            <circle cx="15.4" cy="70" r="10" />
            <circle cx="15.4" cy="30" r="10" />
            
            {/* Connecting Lines */}
            <path d="M 50 10 L 84.6 30 L 84.6 70 L 50 90 L 15.4 70 L 15.4 30 Z" />
            <path d="M 50 10 L 84.6 70 L 15.4 70 Z" />
            <path d="M 50 90 L 84.6 30 L 15.4 30 Z" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="max-w-2xl lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-primary/40 w-12" />
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Divine Proportion</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight leading-[1.1] mb-8 text-stone-900 dark:text-stone-100">
            Harmonize Your Life's <br/>
            <span className="italic font-light text-stone-500 dark:text-stone-400">Architecture</span>
          </h1>
          
          <p className="text-lg text-stone-600 dark:text-stone-400 mb-10 max-w-xl font-light leading-relaxed">
            Ancient wisdom meets modern insight. Our certified spiritual architects provide deep clarity using the sacred laws of the universe.
          </p>

          <Link href="/practitioners">
            <Button size="lg" className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-100 dark:text-stone-900 px-8 h-12 text-base rounded-none tracking-widest uppercase font-semibold transition-all">
              Seek Balance <ArrowRight className="w-4 h-4 ml-3 inline" />
            </Button>
          </Link>
        </div>
        
        {/* Abstract Geometrics Side visual */}
        <div className="lg:w-1/2 relative hidden lg:flex items-center justify-center pointer-events-none">
           <div className="w-[400px] h-[400px] border border-primary/20 rotate-45 flex items-center justify-center p-8 transition-transform duration-[10s] hover:rotate-90">
             <div className="w-full h-full border border-primary/40 -rotate-12 flex items-center justify-center p-8">
               <div className="w-full h-full border border-primary/60 rotate-45 rounded-full" />
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
