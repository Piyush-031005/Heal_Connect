'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/lang-context';
import { TOP_ASTROLOGERS } from '@/lib/constants';

export function TopAstrologers({ variant }: { variant: string }) {
  const { t } = useLang();

  if (variant === 'cosmic-future') {
    return (
      <section className="py-24 relative z-10 bg-white border-t border-gray-100 font-sans selection:bg-sky-200">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Verified Network</span>
              <h2 className="text-4xl md:text-5xl font-medium text-[#111111] tracking-tight">Meet the <span className="text-gray-400">Experts.</span></h2>
            </div>
            <Link href="/practitioners" className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-sm font-medium text-white hover:scale-105 transition-all shadow-md">
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TOP_ASTROLOGERS.slice(0, 3).map((a, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 p-8 flex flex-col overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 px-6 py-2 font-bold text-[10px] text-gray-900 bg-gray-100 rounded-bl-2xl tracking-widest uppercase">{a.online ? 'Online' : 'Offline'}</div>
                <div className="flex flex-col items-center text-center mt-6 mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-all duration-700 mb-6 shrink-0 relative">
                     <img src={a.img} alt={a.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">{a.name}</h3>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-sm font-light text-gray-500">{a.exp}</span>
                      <span className="text-gray-200">•</span>
                      <span className="text-gray-900 text-sm font-bold">★ {a.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {a.tags.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
                      {s}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-14 rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 font-medium text-base transition-all duration-500">
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'divine-lotus') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFBF7] border-t border-pink-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-pink-500 text-sm uppercase tracking-[0.4em] font-bold mb-4 block">Divine Network</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A0B16] tracking-tight">Ascended <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-500 italic font-bold">Masters</span></h2>
            </div>
            <Link href="/practitioners" className="text-[#1A0B16] hover:text-pink-500 transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold border-b border-pink-200 pb-1">
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TOP_ASTROLOGERS.slice(0, 3).map((a, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(236,72,153,0.04)] hover:shadow-[0_40px_80px_rgba(236,72,153,0.15)] hover:-translate-y-2 transition-all duration-700 p-8 flex flex-col overflow-hidden border border-pink-50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 px-6 py-2 font-bold text-[10px] text-pink-600 bg-pink-50 rounded-bl-2xl tracking-widest uppercase shadow-sm border-l border-b border-pink-100">{a.online ? 'Online' : 'Offline'}</div>
                <div className="flex flex-col items-center text-center mt-6 mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_20px_rgba(236,72,153,0.1)] group-hover:scale-105 group-hover:border-pink-200 transition-all duration-700 mb-6 shrink-0 relative">
                     <div className="absolute inset-0 rounded-full border border-pink-200 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 border-dashed m-1" />
                     <img src={a.img} alt={a.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 p-2 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[#1A0B16] group-hover:text-pink-600 transition-colors mb-2">{a.name}</h3>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-sm font-light text-gray-500">{a.exp}</span>
                      <span className="text-pink-200">•</span>
                      <span className="text-pink-500 text-sm font-bold">★ {a.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {a.tags.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-4 py-1.5 bg-pink-50/50 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-pink-100 group-hover:bg-pink-100 group-hover:text-pink-700 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-14 rounded-full bg-[#1A0B16] text-white hover:bg-pink-500 font-bold uppercase tracking-widest text-xs transition-all duration-500 shadow-md hover:shadow-lg">
                  Initiate Link
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'cinematic-nature') {
    return (
      <section className="py-24 relative z-10 bg-[#FDFCF8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,195,0,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-[#FFC300] text-sm uppercase tracking-[0.4em] font-bold mb-4 block">Premium Network</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">Verified Masters</h2>
            </div>
            <Link href="/practitioners" className="text-[#32CD32] hover:text-[#28A428] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TOP_ASTROLOGERS.slice(0, 3).map((a, idx) => (
              <div key={idx} className="group relative bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(255,195,0,0.15)] hover:-translate-y-2 transition-all duration-700 p-8 flex flex-col overflow-hidden border border-gray-50">
                <div className="absolute top-0 right-0 px-6 py-3 font-bold text-[10px] text-[#1A1A1A] bg-[#FFC300] rounded-bl-3xl tracking-widest uppercase shadow-md">{a.online ? 'Online' : 'Offline'}</div>
                <div className="flex flex-col items-center text-center mt-4 mb-8">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-[0_10px_20px_rgba(50,205,50,0.1)] group-hover:scale-105 group-hover:border-[#32CD32]/20 transition-all duration-700 mb-6 shrink-0">
                    <img src={a.img} alt={a.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[#1A1A1A] group-hover:text-[#32CD32] transition-colors mb-2">{a.name}</h3>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-sm font-light text-gray-500">{a.exp}</span>
                      <span className="text-gray-200">•</span>
                      <span className="text-[#FFC300] text-sm font-bold">★ {a.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {a.tags.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 group-hover:bg-[#FFC300]/10 group-hover:text-[#FFC300] group-hover:border-[#FFC300]/20 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
                <Button className="w-full h-14 rounded-2xl bg-[#FAFAFA] text-[#1A1A1A] hover:bg-[#32CD32] hover:text-white font-bold uppercase tracking-widest text-xs transition-all duration-500 border border-gray-100 group-hover:border-transparent">
                  Initiate Link
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
                      <h3 className="font-bold text-lg text-foreground group-hover:text-pink-500 transition-colors">{a.name}</h3>
                      <div className="flex items-center gap-1 bg-background px-2 py-1 rounded-lg">
                        <span className="text-pink-500 text-sm">★</span>
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
                    <Button className="rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-pink-500 hover:to-pink-600 text-primary-foreground border-0 shadow-md">
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
