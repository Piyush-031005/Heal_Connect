'use client';

import { Check, Download, Send, PhoneCall, Video, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { useLayout } from '@/lib/layout-context';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  const { layout } = useLayout();
  const isNewDesign1 = layout === 'new-design-1';

  if (isNewDesign1) {
    return (
      <section className="py-24 bg-gradient-to-br from-[#12527F] via-[#17619A] to-[#1E6CAC] text-white relative overflow-hidden z-10">
        {/* Background glow and subtle circle map */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#63BFE4]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#20A6DC]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Benefits */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-[0.2em] text-[#CDE9F4] mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#63BFE4]" />
                The ZenAuraa App
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-[1.1]">
                Astrology Made Simpler, <br />
                <span className="text-[#63BFE4] italic font-normal">Available 24×7.</span>
              </h2>

              <p className="text-lg text-[#CDE9F4]/90 mb-8 leading-relaxed font-normal max-w-xl">
                Connect with verified astrologers anytime, and find guidance for love, career, marriage, and finance instantly on your phone.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#20A6DC] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-semibold text-white">Instant chats, 1-on-1 calls, and live notifications</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#20A6DC] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-semibold text-white">Secure UPI, Cards & Wallet payments with 256-bit encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#20A6DC] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-semibold text-white">Daily personalized horoscopes & tarot readings</span>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 bg-white text-[#12527F] hover:bg-[#EDF8FC] px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:scale-[1.03]">
                  <Download className="w-5 h-5 text-[#1A92C6]" />
                  <div className="text-left leading-tight">
                    <span className="text-[10px] uppercase font-bold text-[#17619A]/70 block">Download on</span>
                    <span className="text-sm font-extrabold">App Store</span>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-[1.03]">
                  <Download className="w-5 h-5 text-[#63BFE4]" />
                  <div className="text-left leading-tight">
                    <span className="text-[10px] uppercase font-bold text-[#CDE9F4]/70 block">GET IT ON</span>
                    <span className="text-sm font-extrabold">Google Play</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Mobile App Chat Mockup */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] md:max-w-[380px] bg-white rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.4)] border-[8px] border-[#0A3250] overflow-hidden text-[#12527F]">
                
                {/* Phone Notch / Status Header */}
                <div className="bg-[#F8FCFE] px-6 py-3 border-b border-[#CDE9F4]/60 flex justify-between items-center text-xs font-bold text-[#17619A]">
                  <span>9:41</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-600">Online</span>
                  </div>
                </div>

                {/* Astrologer Bar */}
                <div className="bg-white px-5 py-3 border-b border-[#CDE9F4]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#9FD6EE]">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" alt="Astrologer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#12527F]">Riya Sharma</h4>
                      <p className="text-[10px] font-semibold text-emerald-600">Vedic Astrologer • Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#1A92C6]">
                    <div className="p-2 rounded-full bg-[#EDF8FC] hover:bg-[#CDE9F4] cursor-pointer">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div className="p-2 rounded-full bg-[#EDF8FC] hover:bg-[#CDE9F4] cursor-pointer">
                      <Video className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="p-5 bg-[#EDF8FC]/50 space-y-4 min-h-[300px] flex flex-col justify-end text-xs">
                  {/* Astrologer Bubble */}
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-[#CDE9F4] max-w-[85%] shadow-sm text-[#12527F] font-medium leading-relaxed">
                    Hello! How can I help guide your destiny today? ✨
                    <span className="block text-[9px] text-[#17619A]/50 mt-1 text-right">9:41 AM</span>
                  </div>

                  {/* User Bubble */}
                  <div className="bg-[#1A92C6] text-white p-3.5 rounded-2xl rounded-tr-none max-w-[85%] ml-auto font-medium shadow-md leading-relaxed">
                    I need guidance about my career transition next month.
                    <span className="block text-[9px] text-white/70 mt-1 text-right">9:42 AM ✓✓</span>
                  </div>

                  {/* Typing Indicator */}
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#CDE9F4] w-fit flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A92C6] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A92C6] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A92C6] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>

                {/* Chat Input Bar */}
                <div className="p-3 bg-white border-t border-[#CDE9F4] flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-[#EDF8FC] border-none rounded-full px-4 py-2 text-xs focus:outline-none text-[#12527F] placeholder:text-[#7FB2D3]"
                    readOnly
                    value="Tell me about Jupiter transit..."
                  />
                  <button className="w-8 h-8 rounded-full bg-[#1A92C6] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // --- PRIMARY LOCKED LAYOUT APP SHOWCASE (Lavender / Deep Purple Theme) ---
  return (
    <section className="py-24 bg-gradient-to-br from-[#382452] via-[#4B2F6E] to-[#5A3A82] text-white relative overflow-hidden z-10 border-t border-[#6B4996]/40">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8A64B5]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A384C6]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: App Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#D1BDEB] mb-4 block">
              THE ZenAuraa APP
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-[1.15]">
              Astrology made simpler, and available to you <span className="text-[#D1BDEB] italic font-normal">24×7.</span>
            </h2>

            <p className="text-base md:text-lg text-[#E3D5F2]/90 mb-8 leading-relaxed font-normal max-w-xl">
              Connect with an astrologer anytime, and find the solutions to all your love, marriage, career, and finance related problems instantly.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8A64B5] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-base font-semibold text-white">Instant chats, notifications, and alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#8A64B5] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <span className="text-base font-semibold text-white">Secure payments, UPI, cards & wallet, all encrypted</span>
              </div>
            </div>

            {/* App Store / Google Play Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-white text-[#382452] hover:bg-[#F4EEFB] px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl hover:scale-[1.03]">
                <Download className="w-5 h-5 text-[#8A64B5]" />
                <div className="text-left leading-tight">
                  <span className="text-[10px] uppercase font-bold text-[#7E6B99] block">Download on</span>
                  <span className="text-sm font-extrabold">App Store</span>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl hover:scale-[1.03]">
                <Download className="w-5 h-5 text-[#D1BDEB]" />
                <div className="text-left leading-tight">
                  <span className="text-[10px] uppercase font-bold text-[#E3D5F2]/70 block">GET IT ON</span>
                  <span className="text-sm font-extrabold">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Phone Chat Interface Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] md:max-w-[380px] bg-white rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.4)] border-[8px] border-[#2A1B38] overflow-hidden text-[#382452]">
              
              {/* Status Header */}
              <div className="bg-[#F4EEFB] px-6 py-3 border-b border-[#E3D5F2] flex justify-between items-center text-xs font-bold text-[#382452]">
                <span>9:41</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-600">Online</span>
                </div>
              </div>

              {/* Astrologer Bar */}
              <div className="bg-white px-5 py-3 border-b border-[#E3D5F2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#8A64B5]">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop" alt="Astrologer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#382452]">Riya Sharma</h4>
                    <p className="text-[10px] font-semibold text-emerald-600">Vedic Astrologer • Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#8A64B5]">
                  <PhoneCall className="w-4 h-4 cursor-pointer" />
                  <Video className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-5 bg-[#F4EEFB]/60 space-y-4 min-h-[300px] flex flex-col justify-end text-xs">
                {/* Astrologer Message */}
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-[#E3D5F2] max-w-[85%] shadow-sm text-[#382452] font-medium leading-relaxed">
                  Hello! How can I help guide your destiny today? ✨
                  <span className="block text-[9px] text-[#7E6B99] mt-1 text-right">9:41 AM</span>
                </div>

                {/* User Message */}
                <div className="bg-[#8A64B5] text-white p-3.5 rounded-2xl rounded-tr-none max-w-[85%] ml-auto font-medium shadow-md leading-relaxed">
                  I need guidance about my career transition next month.
                  <span className="block text-[9px] text-white/70 mt-1 text-right">9:42 AM ✓✓</span>
                </div>

                {/* Typing Indicator */}
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#E3D5F2] w-fit flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A64B5] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A64B5] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A64B5] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-[#E3D5F2] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#7E6B99] ml-2" />
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-[#F4EEFB] border-none rounded-full px-3 py-2 text-xs focus:outline-none text-[#382452] placeholder:text-[#7E6B99]"
                  readOnly
                  value="Tell me about Jupiter transit..."
                />
                <button className="w-8 h-8 rounded-full bg-[#8A64B5] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Send className="w-4 h-4 fill-white" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


