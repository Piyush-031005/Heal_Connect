'use client';

import { PhoneCall, Globe2, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export function FinalHybridSupport() {
  return (
    <section className="relative py-20 bg-[#150d30] border-t border-[#3B236D]/50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#9E88C7]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-[#25174A]/40 border border-[#3B236D] rounded-[3rem] p-8 lg:p-12 backdrop-blur-sm">
          
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Always Here For You</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F7FA] mb-6 leading-tight">
              24/7 Global Availability & Mobile Support
            </h2>
            <p className="text-lg text-[#9E88C7] mb-8 leading-relaxed">
              Whether it's 3 AM or mid-day, our vetted spiritual guides and astrologers are just a tap away. Get instant guidance through secure chat or calling directly from your phone.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/practitioners"
                className="bg-[#D4AF37] text-[#150d30] px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Connect Instantly
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-[#150d30]/60 p-6 rounded-3xl border border-[#3B236D]/50 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#9E88C7]/20 rounded-full flex items-center justify-center mb-4 text-[#D1BDEB]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F8F7FA] mb-2">Global Access</h4>
              <p className="text-sm text-[#9E88C7]">Connect from anywhere in the world, in your preferred language.</p>
            </div>
            
            <div className="bg-[#150d30]/60 p-6 rounded-3xl border border-[#3B236D]/50 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-4 text-[#D4AF37]">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F8F7FA] mb-2">24/7 Availability</h4>
              <p className="text-sm text-[#9E88C7]">No appointments needed. Find an expert ready to talk right now.</p>
            </div>
            
            <div className="bg-[#150d30]/60 p-6 rounded-3xl border border-[#3B236D]/50 flex flex-col items-center text-center sm:col-span-2">
              <div className="w-12 h-12 bg-[#9E88C7]/20 rounded-full flex items-center justify-center mb-4 text-[#D1BDEB]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F8F7FA] mb-2">100% Private & Secure</h4>
              <p className="text-sm text-[#9E88C7]">Your calls and chats are completely confidential. Mobile-optimized for seamless on-the-go support.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
