'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';

const FAQS = [
  { q: "Why Is Astrology So Accurate?", a: "Astrology uses precise mathematical calculations of planetary positions at your exact time of birth. Our experts interpret these cosmic blueprints to provide deep, actionable insights into your life." },
  { q: "Why Should You Choose HealConnect?", a: "We curate only the top 1% of authentic and verified experts globally. Every practitioner goes through a rigorous multi-step interview and testing process before joining our platform." },
  { q: "Is my consultation completely confidential?", a: "100% yes. Your privacy is our highest priority. All chats and calls are end-to-end encrypted and we never share your personal details with third parties." },
  { q: "What is the difference between Tarot and Vedic Astrology?", a: "Vedic Astrology uses your birth details to map out a lifelong cosmic blueprint. Tarot relies on energy, intuition, and synchronicity to provide immediate guidance and answer specific current-life questions." },
  { q: "Can I get a refund if I'm not satisfied?", a: "Yes. We offer a 100% satisfaction guarantee for your first consultation. If you feel the connection wasn't right, our support team will refund the amount to your wallet immediately." },
  { q: "How much does a session cost?", a: "Pricing varies per expert based on their experience and modality, typically ranging from ₹10 to ₹150 per minute. You only pay for the exact minutes you use." }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { layout } = useLayout();
  
  const isFinalHybrid = layout === 'final-hybrid';

  return (
    <section className={`py-24 relative ${isFinalHybrid ? 'bg-transparent' : 'bg-[#F8F9FA]'}`}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="md:w-1/3 sticky top-32">
            {isFinalHybrid ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#D4AF37]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Support</span>
              </div>
            ) : (
              <h4 className="text-pink-600 font-bold tracking-widest text-sm uppercase mb-3">Questions, Answered</h4>
            )}
            
            <h2 className={`text-4xl md:text-5xl font-serif font-bold leading-tight ${isFinalHybrid ? 'text-[#F8F7FA]' : 'text-foreground'}`}>
              First time? <br/>
              <span className={isFinalHybrid ? 'text-[#D4AF37] italic font-medium' : 'text-pink-700'}>Read these</span> first.
            </h2>
          </div>

          <div className="md:w-2/3 flex flex-col gap-4 w-full">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-[1.5rem] transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isFinalHybrid 
                    ? openIdx === idx 
                      ? 'bg-[#7A48AB] border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.1)]' 
                      : 'bg-[#4D316B] border-[#694091] hover:bg-[#7A48AB]/40'
                    : openIdx === idx 
                      ? 'bg-white border-pink-100 shadow-md ring-1 ring-pink-50' 
                      : 'bg-white border-border/50 hover:border-pink-100 shadow-sm'
                }`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <h3 className={`font-serif font-medium text-lg md:text-xl ${
                    isFinalHybrid 
                      ? openIdx === idx ? 'text-[#D4AF37]' : 'text-[#F8F7FA]'
                      : openIdx === idx ? 'text-pink-800' : 'text-foreground'
                  }`}>
                    {faq.q}
                  </h3>
                  {openIdx === idx ? (
                    <ChevronUp className={`w-5 h-5 shrink-0 ${isFinalHybrid ? 'text-[#D4AF37]' : 'text-pink-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 shrink-0 ${isFinalHybrid ? 'text-[#B79AE6]' : 'text-muted-foreground'}`} />
                  )}
                </div>
                
                {openIdx === idx && (
                  <div className={`px-6 md:px-8 pb-8 text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300 ${
                    isFinalHybrid ? 'text-[#B79AE6]' : 'text-muted-foreground'
                  }`}>
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
