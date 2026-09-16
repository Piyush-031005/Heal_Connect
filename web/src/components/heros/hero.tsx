'use client';
import GhostFibers from '@/components/GhostFibers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, MessageSquare, Phone } from 'lucide-react';
import AuroraBlob from '@/components/heros/visuals/aurora-blob';

// --- PRIMARY LAYOUT HERO (Locked) ---
function PrimaryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-32 min-h-[90vh] flex items-center" style={{ background: 'linear-gradient(180deg, #F9F5FF 0%, #E9D5FF 25%, #D8B4FE 50%, #B794F4 75%, #9333EA 100%)', color: '#1e1b4b' }}>
      <GhostFibers className="opacity-25 mix-blend-screen" lineColor="#FFFFFF" glowColor="#E9D5FF" speed={0.2} scale={2} rotation={0} rotationSpeed={0.25} layers={4} waveAmplitude={0.022} waveFrequency={4} waveSpeed={0.18} layerSpeed={0.1} twist={0.15} twistFrequency={7} twistSpeed={1.5} lineFrequency={10} lineSpacing={1.0} lineSharpness={13} glowFalloff={7} glowIntensity={2.5} brightness={3.0} blueBoost={1.5} vignette={0.5} grain={0.04} dpr={1} lightMode={false} fps={60} paused={false} />
      

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* LEFT: Typography & CTA */}
          <div className="lg:col-span-5 z-20 flex flex-col justify-center">

            {/* App Badges */}
            <div className="flex gap-4 mb-8">
              <div className="bg-white/90 rounded-3xl px-5 py-2.5 flex items-center gap-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <svg viewBox="0 0 384 512" className="w-5 h-5 fill-black"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                <div className="flex flex-col">
                  <span className="text-[9px] leading-none text-gray-500 font-medium">Download on the</span>
                  <span className="text-xs font-bold leading-tight text-black">App Store</span>
                </div>
              </div>
              <div className="bg-white/90 rounded-3xl px-5 py-2.5 flex items-center gap-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-black"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                <div className="flex flex-col">
                  <span className="text-[9px] leading-none text-gray-500 font-medium">GET IT ON</span>
                  <span className="text-xs font-bold leading-tight text-black">Google Play</span>
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight mb-6">
              <span className="text-[#1a1532]">Zen</span><span className="text-[#6B46C1]">Auraa.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#4A3B69] mb-10 max-w-lg font-normal leading-snug">
              Find trusted guidance for every stage of life. Connect with verified experts instantly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center gap-4">
                <Button className="bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1e1b4b] rounded-[24px] px-6 py-5 text-sm font-bold shadow-sm transition-all border-none">
                  <MessageSquare className="w-4 h-4 mr-2" /> Chat
                </Button>
                <Button className="bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1e1b4b] rounded-[24px] px-6 py-5 text-sm font-bold shadow-sm transition-all border-none">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
              
              <Link href="/practitioners">
                <Button className="bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-[28px] px-8 py-6 text-base font-semibold shadow-md transition-all w-fit group">
                  Ask me Anything <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* RATING STRIP with real avatars */}
              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                  ].map((url, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#F9F5FF] overflow-hidden shadow-sm bg-white" style={{ zIndex: 4 - i }}>
                      <img
                        src={url}
                        alt={`Expert ${i+1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base font-bold text-[#1e1b4b]">4.9</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <p className="text-xs text-[#4A3B69] font-medium opacity-80">Based on 10,000+ reviews</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Ring + Image (AuroraBlob handles everything) */}
          <div className="lg:col-span-7 relative h-[600px] flex items-center justify-end">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <AuroraBlob />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN EXPORT ---
export default function Hero() {
  return <PrimaryHero />;
}