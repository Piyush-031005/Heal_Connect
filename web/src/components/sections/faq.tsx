'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';
import { useLang } from '@/lib/lang-context';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { layout } = useLayout();
  const { t } = useLang();
  
  const isFinalHybrid = layout === 'final-hybrid';
  const FAQS = t.faqs;

  return (
    <section className={`py-24 relative bg-transparent`}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="w-full md:w-1/3 relative md:sticky md:top-32 mb-8 md:mb-0 z-20">
            {isFinalHybrid ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#B79AE6]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B79AE6]">Support</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#5F3BA9]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5F3BA9]">Support</span>
              </div>
            )}
            
            <h2 className={`text-4xl md:text-5xl font-heading font-semibold not-italic leading-tight ${isFinalHybrid ? 'text-[#F8F7FA]' : 'text-[#1E2059]'}`}>
              {t.faqTitle} <br/>
              <span className={isFinalHybrid ? 'text-[#B79AE6] italic font-medium' : 'text-[#5F3BA9] font-medium'}>{t.faqTitleEm}</span> {t.faqTitleRest}
            </h2>
          </div>

          <div className="md:w-2/3 flex flex-col gap-4 w-full">
            {FAQS.map((faq: { q: string; a: string }, idx: number) => (
              <div 
                key={idx} 
                className={`rounded-[1.5rem] transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isFinalHybrid 
                    ? openIdx === idx 
                      ? 'bg-[#7A48AB] border-[#B79AE6]/50 shadow-[0_10px_30px_rgba(212,175,55,0.1)]' 
                      : 'bg-[#4D316B] border-[#694091] hover:bg-[#7A48AB]/40'
                    : openIdx === idx 
                      ? 'bg-[#1E2059]/10 border-[#5F3BA9]/30 shadow-[0_10px_30px_rgba(30,32,89,0.1)] backdrop-blur-md' 
                      : 'bg-white/40 border-white/40 hover:bg-[#1E2059]/5 backdrop-blur-md'
                }`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="p-6 md:p-8 flex items-center justify-between">
                  <h3 className={`font-serif font-medium text-lg md:text-xl ${
                    isFinalHybrid 
                      ? openIdx === idx ? 'text-[#B79AE6]' : 'text-[#F8F7FA]'
                      : openIdx === idx ? 'text-[#5F3BA9]' : 'text-[#1E2059]'
                  }`}>
                    {faq.q}
                  </h3>
                  {openIdx === idx ? (
                    <ChevronUp className={`w-5 h-5 shrink-0 ${isFinalHybrid ? 'text-[#B79AE6]' : 'text-[#5F3BA9]'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 shrink-0 ${isFinalHybrid ? 'text-[#B79AE6]' : 'text-[#1E2059]/60'}`} />
                  )}
                </div>
                
                {openIdx === idx && (
                  <div className={`px-6 md:px-8 pb-8 text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300 ${
                    isFinalHybrid ? 'text-[#B79AE6]' : 'text-[#1E2059]/60'
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
