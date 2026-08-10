'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ZODIACS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabha', date: 'Apr 20 - May 20' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20' },
  { id: 'cancer', name: 'Cancer', hindi: 'Kark', date: 'Jun 21 - Jul 22' },
  { id: 'leo', name: 'Leo', hindi: 'Singh', date: 'Jul 23 - Aug 22' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22' },
  { id: 'libra', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchik', date: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makar', date: 'Dec 22 - Jan 19' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbh', date: 'Jan 20 - Feb 18' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meen', date: 'Feb 19 - Mar 20' },
];

export default function ZodiacHoroscope() {
  const [activeZodiac, setActiveZodiac] = useState(ZODIACS[6]); // Default to Libra as per screenshot
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Top Controls */}
        <div className="flex justify-end mb-10">
          <div className="flex bg-muted/50 rounded-full p-1 border border-border/50">
            {['Today', 'Tomorrow', 'Week', 'Month'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab 
                    ? 'bg-amber-100 text-amber-700 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Zodiac Selector */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 mb-12 pb-4 px-2 snap-x">
          {ZODIACS.map((zodiac) => {
            const isActive = activeZodiac.id === zodiac.id;
            return (
              <button
                key={zodiac.id}
                onClick={() => setActiveZodiac(zodiac)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all shrink-0 snap-start
                  ${isActive 
                    ? 'border-amber-300 bg-amber-50 shadow-sm' 
                    : 'border-border/50 bg-card hover:border-primary/30 hover:shadow-sm'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${isActive ? 'bg-amber-500' : 'bg-purple-500'}`}>
                  {/* Placeholder for actual zodiac icon, using first letter for now or an emoji */}
                  <span className="text-sm font-serif font-bold">{zodiac.name[0]}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className={`text-sm font-bold ${isActive ? 'text-amber-700' : 'text-foreground'}`}>
                    {zodiac.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{zodiac.hindi}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Dashboard Card */}
        <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-8 md:p-12">
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-serif font-bold">{activeZodiac.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-1">{activeZodiac.name}</h3>
                  <p className="text-muted-foreground text-sm">{activeZodiac.hindi} • {activeZodiac.date}</p>
                  <p className="text-amber-600 font-semibold text-sm mt-1">{activeTab} - 24 Jul 2026</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-8">
                {activeZodiac.name}, don't take on more than you can manage. Attempting to make everyone happy could exhaust you emotionally. You may need a healthy break due to work-related stress, and a little sleep could be really beneficial. A setback could make you doubt your luck, but don't give up. Recognize other people's emotions to prevent needless confrontation.
              </p>

              <div className="space-y-3 mb-10 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Mood:</span>
                  <span className="font-bold text-foreground">Nervous</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Lucky #:</span>
                  <span className="font-bold text-amber-600">2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Color:</span>
                  <div className="w-4 h-4 rounded-full bg-pink-500 shadow-sm border border-border" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-xl font-bold shadow-md">
                  Get my detailed horoscope
                </Button>
                <Button variant="outline" className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700 px-8 py-6 rounded-xl font-bold border-2">
                  Talk to a specialist
                </Button>
              </div>
            </div>

            {/* Right Progress Bars */}
            <div className="w-full md:w-72 flex flex-col justify-center gap-6">
              {[
                { label: 'Love', val: 75, color: 'bg-red-400', text: 'Strong', textColor: 'text-red-500' },
                { label: 'Career', val: 60, color: 'bg-blue-400', text: 'Good', textColor: 'text-blue-500' },
                { label: 'Health', val: 65, color: 'bg-green-400', text: 'Good', textColor: 'text-green-500' },
                { label: 'Money', val: 60, color: 'bg-amber-400', text: 'Good', textColor: 'text-amber-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-muted/50 p-4 rounded-2xl flex items-center justify-between">
                  <span className="font-medium text-foreground w-16">{stat.label}</span>
                  <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${stat.color}`} style={{ width: `${stat.val}%` }} />
                  </div>
                  <span className={`text-xs font-bold w-12 text-right ${stat.textColor}`}>{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
