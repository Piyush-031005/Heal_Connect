import { useLayout } from '@/lib/layout-context';
import Link from 'next/link';

// Visual components
import dynamic from 'next/dynamic';

const FloatingPebbles = dynamic(() => import('./visuals/floating-pebbles'), { ssr: false });
const FloatingOrbs = dynamic(() => import('./visuals/floating-orbs'), { ssr: false });
const LotusPetals = dynamic(() => import('./visuals/lotus-petals'), { ssr: false });
const LightParticles = dynamic(() => import('./visuals/light-particles'), { ssr: false });
const AuroraBlob = dynamic(() => import('./visuals/aurora-blob'), { ssr: false });
const MandalaPetals = dynamic(() => import('./visuals/mandala-petals'), { ssr: false });
const DharmaWheel = dynamic(() => import('./visuals/dharma-wheel'), { ssr: false });
const MeditationMudras = dynamic(() => import('./visuals/meditation-mudras'), { ssr: false });
const PeacockBloom = dynamic(() => import('./visuals/peacock-bloom'), { ssr: false });











export default function NewLayoutsHero() {
  const { layout } = useLayout();

  const renderVisual = () => {
    switch (layout) {
      case 'layout-1': return <FloatingPebbles />;
      case 'layout-2': return <FloatingOrbs />;
      case 'layout-3': return <LotusPetals />;
      case 'layout-4': return <LightParticles />;
      case 'layout-5': return <AuroraBlob />;
      case 'layout-6': return <MandalaPetals />;
      case 'layout-7': return <DharmaWheel />;
      case 'layout-8': return <MeditationMudras />;
      case 'layout-9': return <PeacockBloom />;
      default: return null;
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-transparent min-h-[90vh] flex items-center">
      {/* Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-[#1E2059] text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E2059] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E2059]"></span>
              </span>
              Find Your Guide
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1E2059] mb-6 leading-[1.1] tracking-tight">
              Align Your <br />
              <span className="text-[#1E2059]">Inner Cosmos.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-[#1E2059]/80 mb-10 max-w-xl font-light leading-relaxed">
              Discover vetted astrologers, energy healers, and spiritual guides.
              Reconnect with the universe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#1E2059]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Find your guide..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/50 border border-white/40 text-[#1E2059] placeholder:text-[#1E2059]/50 focus:outline-none focus:ring-2 focus:ring-[#1E2059]/20 transition-all shadow-sm backdrop-blur-md"
                />
                <div className="absolute inset-y-2 right-2">
                  <button className="h-full px-6 bg-[#1E2059] hover:bg-[#2A1658] text-white rounded-xl font-medium transition-colors shadow-lg shadow-[#1E2059]/20">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#D5B6DC] bg-white overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-[#1E2059]/80">
                <span className="text-xl font-serif text-[#1E2059] font-bold flex items-center gap-1">
                  4.9 
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                Based on 10,000+ reviews
              </div>
            </div>
          </div>

          {/* Right Content - Visual Switcher */}
          <div className="relative hidden lg:flex justify-center items-center h-[600px]">
            {renderVisual()}
          </div>
        </div>
      </div>
    </section>
  );
}
