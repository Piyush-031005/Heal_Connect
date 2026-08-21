'use client';

import { useState } from 'react';
import Link from 'next/link';

const TAROT_CARDS = [
  {
    name: 'The Fool', roman: '0', subtitle: 'New Beginnings & Spontaneity',
    message: 'A blank slate lies before you. Take the leap of faith without fear, trusting that the universe will catch you. Embrace the unknown with childlike wonder.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The High Priestess', roman: 'II', subtitle: 'Intuition & Inner Voice',
    message: 'Your subconscious holds truths the waking mind has yet to hear. Honour the cycles within you - your intuition is your most sacred compass right now.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Sun', roman: 'XIX', subtitle: 'Joy & Success',
    message: 'Radiant golden energy courses through every opportunity before you. A magnificent chapter of abundance, creative power, and warmth is beautifully unfolding.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The World', roman: 'XXI', subtitle: 'Completion & Wholeness',
    message: 'You stand at the sacred culmination of an extraordinary cycle. Embrace the beautiful wholeness you have earned - a glorious new chapter awaits your first step.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Tower', roman: 'XVI', subtitle: 'Revelation & Transformation',
    message: 'A powerful revelation shakes what was never truly stable. What crumbles was built on illusion - what remains is the indestructible core of your true self.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Star', roman: 'XVII', subtitle: 'Hope & Serenity',
    message: 'After the storm comes clear, starlit skies. A time of deep spiritual healing and renewed hope is upon you. Trust in the quiet guidance of the universe.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Magician', roman: 'I', subtitle: 'Manifestation & Power',
    message: 'You possess all the tools needed to manifest your desires. Align your thoughts, words, and actions, and watch the universe bend to your will.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Empress', roman: 'III', subtitle: 'Abundance & Nurturing',
    message: 'Embrace your creative power and connect with the natural world around you. A time of growth, beauty, and bountiful harvest is approaching.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Emperor', roman: 'IV', subtitle: 'Structure & Authority',
    message: 'Step into your personal power and establish solid foundations. Logic, stability, and clear boundaries will guide you to lasting success.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Hierophant', roman: 'V', subtitle: 'Tradition & Guidance',
    message: 'Seek wisdom from established systems or spiritual mentors. Sometimes the answers we seek are found in the timeless rituals of the past.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Lovers', roman: 'VI', subtitle: 'Harmony & Choices',
    message: 'A significant alignment of values is occurring. Whether in relationships or major life choices, follow the path that brings deep harmony to your soul.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Chariot', roman: 'VII', subtitle: 'Determination & Victory',
    message: 'Harness your opposing forces and steer them with focused willpower. Through discipline and confidence, you will overcome any obstacles in your path.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'Strength', roman: 'VIII', subtitle: 'Courage & Compassion',
    message: 'True power comes from gentle resilience, not forceful domination. Tame your inner fears with love and patience; your quiet courage is your greatest asset.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  },
  {
    name: 'The Hermit', roman: 'IX', subtitle: 'Introspection & Inner Guidance',
    message: 'Withdraw from the noise of the world to hear your own inner truth. The lantern of your soul holds the exact light you need for the next step.',
    cardBg: '#F9F9F6', border: '#7A8B76', accent: '#7A8B76', color: '#7A8B76', backBg: '#F9F9F6'
  }
];

const CARD_ROTATIONS = [-35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35];
const CARD_OFFSETS = [70, 55, 42, 30, 20, 12, 5, 0, 5, 12, 20, 30, 42, 55, 70];

export function FinalHybridTarot() {
  const [selected, setSelected] = useState<number[]>([]);
  
  const handleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else if (selected.length < 3) {
      setSelected([...selected, index]);
    }
  };

  const isReadingReady = selected.length === 3;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-[#4D316B] border-t border-[#694091]/50">

      {/* Subtle geometric texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Light glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[150px] pointer-events-none bg-[#694091]/10" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-[1px] bg-[#B79AE6]" />
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#B79AE6]">Tarot Reading</span>
          <div className="w-10 h-[1px] bg-[#B79AE6]" />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#F8F7FA] mb-3">Draw 3 Cards</h2>
        <p className="text-[#B79AE6] text-sm font-bold mb-3">Set your intention. Choose 3 cards to reveal your Past, Present, and Future.</p>
        <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-14 border border-[#694091] bg-[#7A48AB]/80 backdrop-blur-sm shadow-lg">
          <span className="text-[#B79AE6] text-sm">✦</span>
          <span className="text-[#F8F7FA]/90 text-sm font-medium italic">"{selected.length}/3 cards selected"</span>
        </div>

        {/* Card spread deck */}
        <div className="relative flex items-end justify-center gap-1 md:gap-2 mb-20 min-h-[300px] scale-[0.6] sm:scale-100 origin-bottom">
          {TAROT_CARDS.map((card, i) => {
            const isSelected = selected.includes(i);
            const selectionIndex = selected.indexOf(i);
            
            // Positioning logic for selected cards
            let finalX = 0;
            let finalY = 0;
            let finalRot = 0;
            
            if (isSelected) {
              if (selectionIndex === 0) { finalX = -100; finalY = -50; finalRot = -5; } // Past
              if (selectionIndex === 1) { finalX = 0; finalY = -60; finalRot = 0; } // Present
              if (selectionIndex === 2) { finalX = 100; finalY = -50; finalRot = 5; } // Future
            }

            const rot = isSelected ? finalRot : (CARD_ROTATIONS[i] || 0);
            const yOffset = isSelected ? finalY : (CARD_OFFSETS[i] || 0);
            const xOffset = isSelected ? finalX : 0;
            
            return (
              <div key={i} className="relative group"
                style={{
                  transform: `translateX(${xOffset}px) rotate(${rot}deg) translateY(${yOffset}px) scale(${isSelected ? 1.15 : 1})`,
                  zIndex: isSelected ? 50 + selectionIndex : i + 1,
                  transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                  margin: '0 -20px' // Negative margin to overlap cards like a spread deck
                }}>
                <div className="w-[110px] h-[190px] md:w-[150px] md:h-[250px] relative cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onClick={() => handleSelect(i)}>
                  <div className="relative w-full h-full shadow-2xl rounded-xl group-hover:-translate-y-4 transition-transform duration-500"
                    style={{ transformStyle: 'preserve-3d', transform: (isReadingReady && isSelected) ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}>

                    {/* ── Card Back (Static 0deg) ── */}
                    <div className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center p-2"
                      style={{
                        background: card.backBg, border: `1px solid ${card.border}50`,
                        backfaceVisibility: 'hidden',
                        boxShadow: isSelected ? `0 0 20px ${card.accent}50` : 'none'
                      }}>
                      <div className="w-full h-full border rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
                        style={{ borderColor: card.border }}>
                        <div className="absolute inset-1 border rounded-md pointer-events-none" style={{ borderColor: `${card.border}50` }} />
                        
                        {/* Moon phases */}
                        <svg width="24" height="100" viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="15" r="4" stroke={card.border} strokeWidth="1" strokeDasharray="1 1" />
                          <path d="M12 28 A 5 5 0 1 1 12 38 A 3 5 0 1 0 12 28" fill={card.border} />
                          <circle cx="12" cy="50" r="5" fill={card.border} />
                          <path d="M12 62 A 5 5 0 1 0 12 72 A 3 5 0 1 1 12 62" fill={card.border} />
                          <circle cx="12" cy="85" r="4" stroke={card.border} strokeWidth="1" strokeDasharray="1 1" />
                        </svg>

                        {/* Little stars */}
                        <div className="absolute top-4 left-4 text-[8px]" style={{ color: card.border }}>✦</div>
                        <div className="absolute bottom-4 right-4 text-[8px]" style={{ color: card.border }}>✦</div>
                        <div className="absolute top-1/4 right-3 text-[6px]" style={{ color: card.border }}>✧</div>
                        <div className="absolute bottom-1/4 left-3 text-[6px]" style={{ color: card.border }}>✧</div>
                      </div>
                    </div>

                    {/* ── Card Front (Static 180deg) ── */}
                    <div className="absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center p-2"
                      style={{
                        background: card.cardBg, border: `1px solid ${card.border}`,
                        transform: 'rotateY(180deg)', backfaceVisibility: 'hidden'
                      }}>
                      <div className="w-full h-full rounded-lg border flex flex-col items-center justify-center relative p-3" style={{ borderColor: card.border }}>
                        <div className="absolute inset-1 rounded-md border" style={{ borderColor: `${card.border}30` }} />
                        <div className="absolute top-3 w-full text-center text-[10px] font-black tracking-[0.2em]" style={{ color: card.border }}>{card.roman}</div>
                        
                        <div className="my-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border" style={{ borderColor: card.border }}>
                           <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed flex items-center justify-center" style={{ borderColor: card.accent }}>
                             <span className="text-2xl md:text-3xl" style={{ color: card.border }}>✦</span>
                           </div>
                        </div>

                        <div className="absolute bottom-4 w-full text-center px-1">
                          <div className="font-serif font-bold text-xs md:text-sm tracking-wider leading-tight" style={{ color: card.border }}>{card.name.toUpperCase()}</div>
                          <div className="text-[5px] md:text-[6.5px] mt-1 uppercase tracking-widest font-bold" style={{ color: card.border }}>{card.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reading panel */}
        {isReadingReady && (
          <div className="max-w-4xl mx-auto rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.1)] border border-[#B79AE6]/30 bg-[#7A48AB]/90 backdrop-blur-xl"
            style={{ animation: 'zen-fade 1s ease' }}>
            <h3 className="text-3xl font-serif font-medium text-[#F8F7FA] mb-8">Your Reading</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
              {[
                { title: 'PAST', card: TAROT_CARDS[selected[0]] },
                { title: 'PRESENT', card: TAROT_CARDS[selected[1]] },
                { title: 'FUTURE', card: TAROT_CARDS[selected[2]] }
              ].map((pos, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#4D316B] border border-[#694091]">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#B79AE6] mb-2">{pos.title}</div>
                  <div className="font-serif text-lg text-[#F8F7FA] mb-2">{pos.card.name}</div>
                  <p className="text-xs text-[#B79AE6] leading-relaxed">{pos.card.message}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => setSelected([])} className="px-6 py-3 rounded-full text-sm font-bold transition-all border border-[#694091] text-[#B79AE6] hover:bg-[#694091]/30">
                Draw Again
              </button>
              <Link href="/practitioners" className="px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md hover:scale-105 text-[#4D316B] bg-[#B79AE6]">
                Get a Full Reading
              </Link>
            </div>
          </div>
        )}
        
        {!isReadingReady && selected.length > 0 && (
          <p className="text-[#B79AE6]/70 text-xs font-medium" style={{ letterSpacing: '0.2em' }}>
            {3 - selected.length} MORE CARD{3 - selected.length > 1 ? 'S' : ''} TO SELECT
          </p>
        )}
      </div>
    </section>
  );
}
