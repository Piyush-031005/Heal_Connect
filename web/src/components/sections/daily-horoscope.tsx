'use client';

import { useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { ZODIAC_SIGNS, HOROSCOPE_DATA } from '@/lib/constants';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { ZodiacIcon } from '@/components/icons/zodiac-icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DailyHoroscope({ variant }: { variant: string }) {
  const { t } = useLang();

  if (variant === 'cinematic-nature') {
    return (
      <section className="py-24 relative z-10 bg-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <span className="text-[#32CD32] text-sm uppercase tracking-[0.4em] font-bold mb-4 block">Daily Alignments</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight">Cosmic Forecast</h2>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-gray-200 text-gray-500 hover:text-[#32CD32] hover:border-[#32CD32] transition-colors"><ChevronLeft className="w-5 h-5" /></Button>
              <Button variant="outline" size="icon" className="w-12 h-12 rounded-full border-gray-200 text-gray-500 hover:text-[#32CD32] hover:border-[#32CD32] transition-colors"><ChevronRight className="w-5 h-5" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {ZODIAC_SIGNS.slice(0, 3).map((h, idx) => {
              const data = HOROSCOPE_DATA[idx];
              return (
                <div key={idx} className="group bg-[#FDFCF8] rounded-[2rem] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(50,205,50,0.08)] border border-gray-50 transition-all duration-700 hover:-translate-y-2">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-gray-100 shadow-sm group-hover:border-[#32CD32]/20 group-hover:scale-110 transition-all duration-500">
                      <Moon className="w-6 h-6 text-[#FFC300]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">{h.name}</h3>
                      <p className="text-sm font-bold text-[#32CD32] uppercase tracking-widest">{data.dateRange}</p>
                    </div>
                  </div>
                  <p className="text-[#4A4A4A] leading-relaxed font-light mb-8">{data.text}</p>
                  <Link href="#" className="text-[#FFC300] hover:text-[#E6B000] text-sm uppercase tracking-widest font-bold flex items-center gap-2 group/link">
                    Read Full Forecast <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  const [activeZodiac, setActiveZodiac] = useState(0);

  if (variant === 'cosmic') {
    const selected = ZODIAC_SIGNS[activeZodiac];
    const data = HOROSCOPE_DATA[activeZodiac];
    const areas = [
      { label: 'Love', value: data.love, color: 'bg-pink-500', textColor: 'text-pink-400' },
      { label: 'Career', value: data.career, color: 'bg-indigo-500', textColor: 'text-indigo-400' },
      { label: 'Health', value: data.health, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
      { label: 'Money', value: data.money, color: 'bg-pink-500', textColor: 'text-pink-400' },
    ];

    return (
      <section id="horoscope" className="py-24 relative z-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A0B0F] mb-4">Cosmic Reading</h2>
            <p className="text-[#4A3B3F]">Your personalized daily energy forecast.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 bg-white border border-red-900/10 rounded-[3rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            {/* Left: Horoscope text */}
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-inner">
                  <ZodiacIcon name={selected.name} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#1A0B0F]">{selected.name}</h3>
                  <p className="text-red-700/80 font-medium">{data.dateRange}</p>
                </div>
              </div>
              <p className="text-lg text-[#4A3B3F] leading-relaxed mb-8">{data.text}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-6 py-3 rounded-2xl bg-white border border-red-100 shadow-sm">
                  <span className="block text-xs text-red-900/50 uppercase mb-1">Mood</span>
                  <span className="text-[#1A0B0F] font-bold">{data.mood}</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white border border-red-100 shadow-sm">
                  <span className="block text-xs text-red-900/50 uppercase mb-1">Lucky Number</span>
                  <span className="text-[#1A0B0F] font-bold">{data.luckyNum}</span>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-white border border-red-100 shadow-sm">
                  <span className="block text-xs text-red-900/50 uppercase mb-1">Color</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${data.colorClass}`} />
                    <span className="text-[#1A0B0F] font-bold">{data.color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Progress bars and Zodiac Selector */}
            <div className="lg:w-96 flex flex-col gap-8 relative z-10">
              <div className="space-y-4 bg-red-50/50 p-6 rounded-3xl border border-red-100">
                <h4 className="text-[#1A0B0F] font-bold mb-4">Energy Levels</h4>
                {areas.map(({ label, value, color, textColor }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A3B3F] font-medium">{label}</span>
                      <span className={`font-bold ${textColor}`}>{value}%</span>
                    </div>
                    <div className="w-full h-2 bg-red-900/10 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-[#1A0B0F] font-bold mb-4 text-sm uppercase tracking-wider">Select Sign</h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
                  {ZODIAC_SIGNS.map((sign, idx) => (
                    <button
                      key={sign.name}
                      onClick={() => setActiveZodiac(idx)}
                      className={`p-2 rounded-xl text-2xl transition-all duration-300 ${
                        activeZodiac === idx 
                          ? 'bg-red-600 shadow-[0_5px_15px_rgba(220,38,38,0.4)] scale-110 z-10' 
                          : 'bg-white border border-red-100 hover:bg-red-50 hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      title={sign.name}
                    >
                      <span className={`block w-6 h-6 mx-auto ${activeZodiac === idx ? 'opacity-100 drop-shadow-md text-red-600' : 'opacity-50 text-red-900 grayscale'}`}>
                        <ZodiacIcon name={sign.name} className="w-full h-full" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    const selected = ZODIAC_SIGNS[activeZodiac];
    const data = HOROSCOPE_DATA[activeZodiac];

    return (
      <section id="horoscope" className="py-24 relative z-10 bg-[#12121E]">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row gap-12 items-center border border-[#D4A843]/20 bg-[#1A1A2E]">
          {/* Left Dark Block */}
          <div className="flex-1 p-12 lg:p-20 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-[#D4A843] pointer-events-none">
              <ZodiacIcon name={selected.name} className="w-96 h-96" />
            </span>
            <div className="relative z-10">
              <span className="text-[#D4A843] text-sm uppercase tracking-widest mb-4 block font-serif">Daily Forecast</span>
              <h2 className="text-5xl font-serif text-white mb-2">{selected.name}</h2>
              <p className="text-[#8A8A9E] mb-8 font-light italic">{data.dateRange}</p>
              
              <p className="text-xl text-[#E8DBBF] font-light leading-relaxed mb-10 border-l-2 border-[#D4A843] pl-6">
                "{data.text}"
              </p>

              <div className="flex gap-8 text-[#8A8A9E] font-serif uppercase tracking-widest text-xs border-t border-[#D4A843]/20 pt-8">
                <div><span className="block text-[#D4A843] mb-1">Mood</span> {data.mood}</div>
                <div><span className="block text-[#D4A843] mb-1">Lucky #</span> {data.luckyNum}</div>
                <div><span className="block text-[#D4A843] mb-1">Color</span> {data.color}</div>
              </div>
            </div>
          </div>

          {/* Right Light Block / Selector */}
          <div className="w-full md:w-96 p-8 md:p-12 bg-[#F2E8D5] flex flex-col gap-6">
            <h3 className="font-serif text-2xl text-[#1C1208] mb-4 text-center">Select Your Sign</h3>
            <div className="grid grid-cols-3 gap-4">
              {ZODIAC_SIGNS.map((sign, idx) => (
                <button
                  key={sign.name}
                  onClick={() => setActiveZodiac(idx)}
                  className={`py-4 rounded-none border transition-all flex flex-col items-center gap-2 ${activeZodiac === idx ? 'border-[#C4772A] bg-[#E8DBBF] text-[#1C1208] shadow-inner' : 'border-[#6B4C1E]/20 text-[#5A4A2E] hover:border-[#6B4C1E]/50'}`}
                >
                  <ZodiacIcon name={sign.name} className="w-8 h-8" />
                  <span className="text-[10px] uppercase tracking-wider font-serif">{sign.name}</span>
                </button>
              ))}
            </div>
            <Button className="w-full rounded-none bg-[#1C1208] text-white hover:bg-[#C4772A] transition-colors h-14 uppercase tracking-widest font-serif text-xs mt-4">
              Full Reading <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Default Mystic / Golden
  const selected = ZODIAC_SIGNS[activeZodiac];
  const data = HOROSCOPE_DATA[activeZodiac];
  const areas = [
    { label: 'Love', value: data.love, color: 'bg-rose-400', textColor: 'text-rose-500' },
    { label: 'Career', value: data.career, color: 'bg-blue-400', textColor: 'text-blue-500' },
    { label: 'Health', value: data.health, color: 'bg-emerald-400', textColor: 'text-emerald-500' },
    { label: 'Money', value: data.money, color: 'bg-pink-400', textColor: 'text-pink-500' },
  ];

  return (
    <section id="horoscope" className="py-16 md:py-24 bg-card/30 border-y border-border relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">{t.horoscopeTitle}</h2>
          <p className="text-muted-foreground text-lg">Your personalized daily energy forecast based on planetary alignments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 lg:gap-4 mb-12">
          {ZODIAC_SIGNS.map((sign, idx) => (
            <button
              key={sign.name}
              onClick={() => setActiveZodiac(idx)}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 border ${
                activeZodiac === idx
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105 z-10'
                  : 'bg-secondary border-border hover:border-primary/40 hover:bg-secondary/80'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center ${activeZodiac === idx ? 'opacity-100' : 'opacity-70'}`}>
                <ZodiacIcon name={sign.name} className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-sm leading-tight">{sign.name}</span>
                <span className={`text-xs ${activeZodiac === idx ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{sign.alt}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-background rounded-3xl p-6 md:p-10 border border-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary drop-shadow-md">
                  <ZodiacIcon name={selected.name} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{selected.name} <span className="text-muted-foreground font-normal text-xl ml-2">({selected.alt})</span></h3>
                  <p className="text-sm text-primary font-medium">{data.dateRange}</p>
                </div>
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-8">{data.text}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-secondary px-5 py-3 rounded-2xl border border-border">
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Mood</span>
                  <span className="font-semibold text-foreground">{data.mood}</span>
                </div>
                <div className="bg-secondary px-5 py-3 rounded-2xl border border-border">
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Lucky Number</span>
                  <span className="font-semibold text-foreground">{data.luckyNum}</span>
                </div>
                <div className="bg-secondary px-5 py-3 rounded-2xl border border-border">
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Color</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${data.colorClass} shadow-sm border border-border`} />
                    <span className="font-semibold text-foreground">{data.color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-72 space-y-3">
              {areas.map(({ label, value, color, textColor }) => (
                <div key={label} className="bg-secondary/50 rounded-xl px-4 py-3 flex items-center justify-between border border-border shadow-sm">
                  <span className="text-sm text-foreground/80 font-medium">{label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${textColor}`}>{value >= 80 ? t.horoscopeLevels.strong : value >= 60 ? t.horoscopeLevels.good : t.horoscopeLevels.fair}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
