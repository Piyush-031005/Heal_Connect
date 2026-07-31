'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { TOP_ASTROLOGERS } from '@/lib/constants';

export function TopAstrologers({ variant }: { variant: 'mystic' | 'golden' | 'cosmic' | 'split' }) {
  const { t } = useLang();

  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-[#05050A]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Master Guides</h2>
            <p className="text-white/60">Connect with enlightened souls for cosmic clarity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TOP_ASTROLOGERS.map((a, idx) => (
              <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-b from-white/10 to-transparent hover:from-pink-500/50 hover:to-purple-500/20 transition-all duration-700">
                <div className="absolute inset-0 bg-black/90 rounded-[2.5rem]" />
                <div className="relative h-full flex flex-col p-6 bg-black/40 backdrop-blur-md rounded-[2.5rem]">
                  <div className="flex gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-pink-500/50 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all shrink-0">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-bold text-white text-2xl mb-1">{a.name}</h3>
                      <p className="text-pink-400 text-sm font-medium">{a.exp}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-white text-sm font-bold">{a.rating}</span>
                        <span className="text-white/40 text-xs ml-1">({a.orders})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {a.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-white font-bold">₹{a.price}/min</p>
                    <Button className="rounded-full bg-white text-black hover:bg-pink-500 hover:text-white transition-colors border-0">
                      Connect Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className="py-24 relative z-10 bg-[#E8DBBF] border-t border-[#6B4C1E]/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto gap-8">
            <div>
              <span className="text-[#B87333] text-sm uppercase tracking-widest mb-4 block font-bold">The Oracle Council</span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1C1208]">Top Astrologers</h2>
            </div>
            <Link href="/practitioners">
              <Button variant="outline" className="rounded-none border-[#1C1208] text-[#1C1208] hover:bg-[#1C1208] hover:text-white transition-colors font-serif uppercase tracking-widest text-xs h-12 px-8">
                Consult The Oracle
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#6B4C1E]/20 max-w-7xl mx-auto divide-y md:divide-y-0 md:divide-x divide-[#6B4C1E]/20 bg-[#F2E8D5]">
            {TOP_ASTROLOGERS.map((a, idx) => (
              <div key={idx} className="p-8 group hover:bg-[#E8DBBF] transition-colors duration-500">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-[#6B4C1E]/30 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-serif text-[#1C1208]">{a.rating} ★</span>
                    <span className="text-xs uppercase tracking-widest text-[#B87333]">{a.orders} read</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif text-[#1C1208] mb-2">{a.name}</h3>
                <p className="text-[#5A4A2E] text-sm italic mb-6">{a.langs} • {a.exp}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {a.tags.slice(0,2).map(tag => (
                    <span key={tag} className="text-xs uppercase tracking-widest text-[#1C1208] border-b border-[#6B4C1E]/30 pb-1">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between border-t border-[#6B4C1E]/20 pt-6">
                  <span className="font-serif text-[#1C1208]">₹{a.price} / min</span>
                  <span className="text-[#B87333] group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default (mystic/golden)
  return (
    <section className="py-16 md:py-24 relative z-10 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Top Astrologers</h2>
            <p className="text-muted-foreground text-lg">Connect with India's finest verified experts for life-changing guidance.</p>
          </div>
          <Link href="/practitioners">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5 rounded-full text-primary h-12 px-6">
              View All Astrologers <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TOP_ASTROLOGERS.map((a) => (
            <div key={a.name} className="bg-secondary/50 backdrop-blur-xl border border-border/50 shadow-sm hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 rounded-3xl overflow-hidden group">
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <img src={a.img} alt={a.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-background" />
                    {a.online && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" title="Online" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-amber-500 transition-colors">{a.name}</h3>
                      <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg">
                        <span className="text-amber-500 text-sm">★</span>
                        <span className="text-sm font-semibold">{a.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{a.langs}</p>
                    <p className="text-sm font-medium text-primary mt-1">{a.exp}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {a.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-background font-normal border-border/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Consultation</span>
                    <span className="font-bold text-foreground">₹{a.price}<span className="text-sm font-normal text-muted-foreground">/min</span></span>
                  </div>
                  <Link href="/practitioners">
                    <Button className="rounded-full bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-amber-600 text-primary-foreground border-0 shadow-md">
                      Chat / Call
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
