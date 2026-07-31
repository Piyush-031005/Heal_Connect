'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { TOP_ASTROLOGERS } from '@/lib/constants';

export function TopAstrologers({ variant }: { variant: string }) {
  const { t } = useLang();

  if (variant === 'constellation') {
    return (
      <section className="py-24 relative z-10 bg-[#05050A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,168,67,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#D4A843] text-xs uppercase tracking-[0.4em] font-semibold mb-4 block">The Oracle Council</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Active Seers</h2>
            </div>
            <Link href="/practitioners" className="text-[#D4A843] hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-mono">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TOP_ASTROLOGERS.slice(0, 3).map((a, idx) => (
              <div key={idx} className="group relative border border-[#D4A843]/20 bg-[#D4A843]/5 backdrop-blur-xl hover:bg-[#D4A843]/10 transition-all duration-700 p-8 flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-[10px] text-[#D4A843]">[{a.online ? 'ONLINE' : 'OFFLINE'}]</div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-none border border-[#D4A843]/40 p-1 shrink-0 group-hover:scale-105 transition-transform">
                    <img src={a.img} alt={a.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white group-hover:text-[#D4A843] transition-colors">{a.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-white/50">{a.exp}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[#D4A843] text-xs">★ {a.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {a.tags.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-2 py-1 border border-white/10 text-[10px] text-white/40 font-mono uppercase">
                      {s}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-12 rounded-none bg-white text-black hover:bg-[#D4A843] font-bold uppercase tracking-widest text-xs transition-all">
                  Initiate Link
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'aurora') {
    return (
      <section className="py-24 relative z-10 bg-[#020202] overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">Network Nodes</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black text-white tracking-tighter">Verified Experts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {TOP_ASTROLOGERS.slice(0, 3).map((a, idx) => (
              <div key={idx} className="group p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-purple-400/50 transition-colors p-1">
                  <img src={a.img} alt={a.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{a.name}</h3>
                <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
                  <span>{a.exp}</span>
                  <span>•</span>
                  <span className="text-purple-300 font-medium">★ {a.rating}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {a.tags.slice(0, 2).map((s: string) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 border border-white/10 text-white font-semibold transition-all">
                  Connect Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'cosmic') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A0B0F] mb-4">Master Guides</h2>
            <p className="text-[#4A3B3F]">Connect with enlightened souls for cosmic clarity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TOP_ASTROLOGERS.map((a, idx) => (
              <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden p-[1px] bg-red-900/10 hover:bg-red-500/50 transition-all duration-700 shadow-[0_10px_30px_rgba(220,38,38,0.05)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.2)]">
                <div className="absolute inset-0 bg-white rounded-[2.5rem]" />
                <div className="relative h-full flex flex-col p-6 bg-white/80 backdrop-blur-md rounded-[2.5rem]">
                  <div className="flex gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-100 shadow-md group-hover:border-red-400 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all shrink-0">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-bold text-[#1A0B0F] text-2xl mb-1">{a.name}</h3>
                      <p className="text-red-600 text-sm font-medium">{a.exp}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-[#1A0B0F] text-sm font-bold">{a.rating}</span>
                        <span className="text-[#4A3B3F] text-xs ml-1">({a.orders})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {a.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-900/70 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-[#1A0B0F] font-bold">₹{a.price}/min</p>
                    <Button className="rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors border-0 shadow-md">
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
