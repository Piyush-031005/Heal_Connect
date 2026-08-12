'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const STORY_EXPERTS = [
  { name: 'Maya Sharma', role: 'Vedic Astrologer', years: '12 yrs', style: ['Intuitive', 'Spiritual'], langs: ['English', 'Hindi'], available: true, color: '#D4AF37', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', quote: 'I guide souls through life transitions with cosmic clarity.' },
  { name: 'Arun Nair', role: 'Tarot & Crystals', years: '8 yrs', style: ['Creative', 'Warm'], langs: ['English', 'Malayalam'], available: true, color: '#9E88C7', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', quote: 'Every card tells a story; every story holds your truth.' },
  { name: 'Dr. Elena Rossi', role: 'Energy Healer', years: '15 yrs', style: ['Analytical', 'Gentle'], langs: ['English', 'Italian'], available: false, color: '#63BFE4', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', quote: 'The body holds wisdom that the mind has not yet heard.' },
  { name: 'Chen Wei', role: 'Numerologist', years: '20 yrs', style: ['Practical', 'Deep'], langs: ['English', 'Mandarin'], available: true, color: '#F4D58D', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', quote: 'Numbers are the universe\'s most honest language.' },
  { name: 'Luna Vega', role: 'Tarot Reader', years: '6 yrs', style: ['Visionary', 'Expressive'], langs: ['English', 'Spanish'], available: true, color: '#FFB347', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop', quote: 'Your future is written in the stars and the cards alike.' },
];

export function FinalHybridExperts() {
  const [current, setCurrent] = useState(0);
  const expert = STORY_EXPERTS[current];

  return (
    <section className="relative min-h-screen bg-[#150d30] overflow-hidden flex items-center py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${expert.color}15, transparent)`, transition: 'background 0.8s ease' }} />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#3B236D]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-16 relative z-10 w-full">
        
        {/* Large Decorative Quote mark to fill space */}
        <div className="absolute right-0 top-10 text-[200px] leading-none font-serif text-[#F8F7FA] opacity-[0.02] pointer-events-none select-none">
          &rdquo;
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Left: cards */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[2px]" style={{ backgroundColor: expert.color }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: expert.color }}>Meet Your Guide</span>
            </div>
            <div className="relative" style={{ height: '380px', width: '280px' }}>
              {STORY_EXPERTS.map((ex, i) => {
                const offset = (i - current + STORY_EXPERTS.length) % STORY_EXPERTS.length;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isNext2 = offset === 2;
                return (
                  <div key={ex.name}
                    className="absolute rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-pointer transition-all duration-700"
                    style={{
                      width: '260px', height: '340px',
                      borderColor: isActive ? ex.color : 'rgba(255,255,255,0.1)',
                      boxShadow: isActive ? `0 20px 40px ${ex.color}30` : '0 20px 40px rgba(0,0,0,0.5)',
                      transform: isActive ? 'scale(1) rotate(0deg) translate(0,0)'
                        : isNext ? 'scale(0.9) rotate(5deg) translate(35px,-18px)'
                        : isNext2 ? 'scale(0.82) rotate(9deg) translate(60px,-30px)'
                        : 'scale(0.75) translateY(30px)',
                      zIndex: isActive ? 10 : isNext ? 7 : isNext2 ? 4 : 1,
                      opacity: isActive ? 1 : isNext ? 0.75 : isNext2 ? 0.5 : 0.2,
                    }}
                    onClick={() => setCurrent(i)}
                  >
                    <img src={ex.img} alt={ex.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150d30]/90 via-[#150d30]/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold text-sm text-[#F8F7FA]">{ex.name}</div>
                      <div className="text-xs text-[#9E88C7]">{ex.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setCurrent(c => (c - 1 + STORY_EXPERTS.length) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {STORY_EXPERTS.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-400 cursor-pointer"
                  style={{ width: i === current ? '24px' : '8px', height: '8px', backgroundColor: i === current ? expert.color : `${expert.color}30` }}
                  onClick={() => setCurrent(i)} />
              ))}
              <button onClick={() => setCurrent(c => (c + 1) % STORY_EXPERTS.length)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: expert.color, color: expert.color, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: info */}
          <div className="lg:w-1/2" key={current} style={{ animation: 'zen-fade 0.5s ease' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: expert.available ? '#22c55e' : '#94a3b8' }} />
              <span className="text-sm font-bold" style={{ color: expert.available ? '#22c55e' : '#9E88C7' }}>
                {expert.available ? 'Available Now' : 'Accepting Bookings'}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-medium mb-2" style={{ color: '#F8F7FA', transition: 'color 0.5s ease' }}>
              {expert.name}
            </h2>
            <p className="text-base text-[#9E88C7] mb-6 font-medium">{expert.role} · {expert.years}</p>
            <blockquote className="text-xl font-light text-[#F8F7FA]/90 mb-8 leading-relaxed border-l-4 pl-6 italic"
              style={{ borderColor: expert.color }}>
              &ldquo;{expert.quote}&rdquo;
            </blockquote>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-[#9E88C7] mb-3">Style</p>
              <div className="flex gap-3 flex-wrap">
                {expert.style.map(s => (
                  <span key={s} className="px-4 py-2 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${expert.color}15`, color: expert.color, border: `1px solid ${expert.color}30` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-[#9E88C7] mb-3">Languages</p>
              <div className="flex gap-4">
                {expert.langs.map(l => (<span key={l} className="text-sm font-bold text-[#F8F7FA]">{l}</span>))}
              </div>
            </div>
            <Link href="/practitioners"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base shadow-xl hover:brightness-110 transition-all text-[#150d30]"
              style={{ backgroundColor: expert.color }}>
              Book a Session <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
