'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// ── Layout 3: "Dark Tarot" ──────────────────────────────────────────────────
// Inspired by: Black zodiac tarot card image — dark/black, dramatic white line
// art zodiac illustrations in card format. Full dark luxury editorial energy.
// Interactive: hover a card to "select" your sign and get a one-liner reading.

const ZODIAC_CARDS = [
  { sign: 'Aries', symbol: '♈', element: 'FIRE', date: 'Mar 21 – Apr 19', reading: 'Bold moves pay off. Trust your instincts this season.' },
  { sign: 'Taurus', symbol: '♉', element: 'EARTH', date: 'Apr 20 – May 20', reading: 'Abundance is yours. Stay grounded and patient.' },
  { sign: 'Gemini', symbol: '♊', element: 'AIR', date: 'May 21 – Jun 20', reading: 'Connections are your superpower. Speak your truth.' },
  { sign: 'Cancer', symbol: '♋', element: 'WATER', date: 'Jun 21 – Jul 22', reading: 'Your intuition is sharper than ever. Listen to it.' },
  { sign: 'Leo', symbol: '♌', element: 'FIRE', date: 'Jul 23 – Aug 22', reading: 'You were born to lead. Step into the spotlight.' },
  { sign: 'Virgo', symbol: '♍', element: 'EARTH', date: 'Aug 23 – Sep 22', reading: 'Precision creates magic. Your plan is working.' },
  { sign: 'Libra', symbol: '♎', element: 'AIR', date: 'Sep 23 – Oct 22', reading: 'Harmony is coming. Your diplomacy opens doors.' },
  { sign: 'Scorpio', symbol: '♏', element: 'WATER', date: 'Oct 23 – Nov 21', reading: 'Transformation is your gift. Embrace the change.' },
  { sign: 'Sagittarius', symbol: '♐', element: 'FIRE', date: 'Nov 22 – Dec 21', reading: 'Adventure awaits. Your vision is expanding.' },
  { sign: 'Capricorn', symbol: '♑', element: 'EARTH', date: 'Dec 22 – Jan 19', reading: 'Your discipline is building an empire. Keep going.' },
  { sign: 'Aquarius', symbol: '♒', element: 'AIR', date: 'Jan 20 – Feb 18', reading: 'You see the future. Share your vision boldly.' },
  { sign: 'Pisces', symbol: '♓', element: 'WATER', date: 'Feb 19 – Mar 20', reading: 'Your creativity knows no limits. Dive deep.' },
];

const ELEMENT_COLORS: Record<string, string> = {
  FIRE: '#FF6B35',
  EARTH: '#8B7355',
  AIR: '#87CEEB',
  WATER: '#4682B4',
};

export default function DarkTarotHero() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedCard = selected !== null ? ZODIAC_CARDS[selected] : null;

  return (
    <section className="relative overflow-hidden pt-20 pb-16 min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0D0D0D 100%)' }}>

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B6914 0%, transparent 70%)' }} />

      {/* Hero headline */}
      <div className="relative z-10 text-center mb-12 px-4">
        <p className="text-xs tracking-[0.35em] uppercase text-amber-400/70 mb-3 font-medium">✦ Select Your Sign ✦</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
          What Do The Stars<br />
          <span className="italic font-light text-amber-300">Hold For You?</span>
        </h1>
        <p className="text-white/50 text-lg max-w-lg mx-auto font-light">
          Choose your sign and connect with a verified expert for a personalized reading.
        </p>
      </div>

      {/* Reading banner */}
      {selectedCard && (
        <div className="relative z-10 mb-8 px-6 py-4 rounded-2xl border text-center max-w-md mx-4 animate-in fade-in duration-500"
          style={{ borderColor: `${ELEMENT_COLORS[selectedCard.element]}40`, background: `${ELEMENT_COLORS[selectedCard.element]}15`, backdropFilter: 'blur(10px)' }}>
          <p className="text-xs tracking-widest uppercase mb-1 font-bold" style={{ color: ELEMENT_COLORS[selectedCard.element] }}>
            {selectedCard.sign} · {selectedCard.element} · {selectedCard.date}
          </p>
          <p className="text-white text-sm font-light leading-relaxed">{selectedCard.reading}</p>
        </div>
      )}

      {/* Zodiac card grid */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {ZODIAC_CARDS.map((card, i) => (
            <button
              key={card.sign}
              onClick={() => setSelected(i === selected ? null : i)}
              className="group relative rounded-2xl border transition-all duration-300 overflow-hidden aspect-[2/3] flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-105"
              style={{
                borderColor: selected === i ? ELEMENT_COLORS[card.element] : 'rgba(255,255,255,0.08)',
                background: selected === i
                  ? `linear-gradient(135deg, ${ELEMENT_COLORS[card.element]}20, rgba(0,0,0,0.8))`
                  : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(0,0,0,0.8))',
                boxShadow: selected === i ? `0 0 20px ${ELEMENT_COLORS[card.element]}40` : 'none',
              }}
            >
              {/* Decorative corner lines (tarot card border) */}
              <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l opacity-40" style={{ borderColor: ELEMENT_COLORS[card.element] }} />
              <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r opacity-40" style={{ borderColor: ELEMENT_COLORS[card.element] }} />
              <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l opacity-40" style={{ borderColor: ELEMENT_COLORS[card.element] }} />
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r opacity-40" style={{ borderColor: ELEMENT_COLORS[card.element] }} />

              {/* Element badge */}
              <span className="text-[8px] tracking-[0.2em] uppercase font-bold px-1.5 py-0.5 rounded-sm"
                style={{ color: ELEMENT_COLORS[card.element], background: `${ELEMENT_COLORS[card.element]}20` }}>
                {card.element}
              </span>

              {/* Big symbol */}
              <span className="text-3xl" style={{ color: selected === i ? ELEMENT_COLORS[card.element] : 'rgba(255,255,255,0.5)' }}>
                {card.symbol}
              </span>

              {/* Sign name */}
              <span className="text-[10px] tracking-widest uppercase font-bold text-white/70 group-hover:text-white transition-colors">
                {card.sign}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-4 items-center px-4">
        <Link href="/practitioners">
          <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold border-none text-black shadow-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #D4A843, #F5C842)' }}>
            Book a Reading <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </Link>
        <span className="text-white/30 text-sm">No credit card needed for first session</span>
      </div>
    </section>
  );
}
