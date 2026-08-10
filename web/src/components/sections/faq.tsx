'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: "Why Is Astrology So Accurate?", a: "Astrology uses precise mathematical calculations of planetary positions..." },
  { q: "Why Should You Choose HealConnect For An Astrology Horoscope?", a: "We curate only the top 1% of authentic and verified experts globally." },
  { q: "Is Astrology Prediction True?", a: "Yes, when interpreted by an experienced and knowledgeable astrologer." },
  { q: "How Can Online Astrology Help Me In Predicting The Future?", a: "It provides a roadmap of cosmic influences to help you make informed decisions." },
  { q: "How reliable is the HealConnect app?", a: "Our platform ensures secure, confidential, and verified consultations." },
  { q: "How much does HealConnect cost?", a: "Pricing varies per expert, typically ranging from ₹10 to ₹150 per minute." }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F8F9FA] relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="md:w-1/3 sticky top-32">
            <h4 className="text-pink-600 font-bold tracking-widest text-sm uppercase mb-3">Questions, Answered</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
              First time? <br/>
              <span className="text-pink-700">Read these</span> first.
            </h2>
          </div>

          <div className="md:w-2/3 flex flex-col gap-4 w-full">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${openIdx === idx ? 'shadow-md border border-pink-100 ring-1 ring-pink-50' : 'shadow-sm border border-border/50 hover:border-pink-100'}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className={`font-semibold text-base ${openIdx === idx ? 'text-pink-800' : 'text-foreground'}`}>
                    {faq.q}
                  </h3>
                  {openIdx === idx ? (
                    <ChevronUp className="w-5 h-5 text-pink-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </div>
                
                {openIdx === idx && (
                  <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
