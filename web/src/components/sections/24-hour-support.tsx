'use client';
import { useLayout } from '@/lib/layout-context';

import { Check, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function FinalHybridSupport() {
  const { layout } = useLayout();
  const isNewLayout = layout.startsWith('layout-');
  return (
    <section className="relative py-24 bg-fixed bg-center bg-cover border-none overflow-hidden"
      style={{ backgroundImage: 'url(/hands-star-bg.png)' }}
    >
      {/* Overlay to ensure readability while letting the cosmic background shine through */}
      <div className="absolute inset-0 bg-[#4D316B]/75 backdrop-blur-sm z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#B79AE6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B79AE6]">The ZenAuraa App</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F8F7FA] mb-6 leading-tight drop-shadow-md">
              Astrology made simpler, and available to you <span className="text-[#B79AE6]">24×7.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-[#B79AE6] mb-8 leading-relaxed font-medium">
              Connect with an astrologer anytime, and find the solutions to all your love, marriage, career, and finance related problems instantly.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B79AE6]" />
                <span className="text-[#F8F7FA] font-medium">Instant chats, notifications, and alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B79AE6]" />
                <span className="text-[#F8F7FA] font-medium">Secure payments, UPI, cards & wallet, all encrypted</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/app-store"
                className="bg-white text-[#4D316B] px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                App Store
              </Link>
              <Link
                href="/google-play"
                className="bg-white text-[#4D316B] px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                Google Play
              </Link>
            </div>
          </div>
          
          {/* Right Phone Mockup */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            {/* Minimalist Phone Frame with Chat */}
            <div className="relative w-full max-w-[320px] h-[640px] bg-white rounded-[3rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-100">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-100 rounded-b-2xl z-20"></div>
              
              {/* Screen Content */}
              <div className="w-full h-full bg-[#f8f9fa] rounded-[2rem] overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="bg-white pt-8 pb-3 px-4 border-b flex items-center justify-between z-10 shadow-sm">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Riya" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">Riya</h4>
                      <p className="text-[10px] text-green-500 font-semibold">Online</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-gray-50/50">
                  <div className="flex gap-2">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Riya" className="w-6 h-6 rounded-full shrink-0" />
                    <div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-gray-700 border border-gray-100">
                        Hello! How can I help you today?
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1 ml-1">9:41 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-row-reverse">
                    <div>
                      <div className="bg-gradient-to-r from-purple-400 to-purple-300 text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs">
                        I need guidance about my career
                      </div>
                      <p className="text-[9px] text-gray-400 mt-1 mr-1 text-right">9:42 AM ✓</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Riya" className="w-6 h-6 rounded-full shrink-0" />
                    <div className="bg-gray-200 p-3 rounded-full flex gap-1 items-center h-8">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="bg-white p-3 border-t flex gap-2 items-center">
                  <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center px-3">
                    <span className="text-[11px] text-gray-400">Type a message...</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
