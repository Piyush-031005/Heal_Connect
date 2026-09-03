import { useLayout } from '@/lib/layout-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';


// Visual components
import dynamic from 'next/dynamic';


const LoadingVisual = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#1E2059]/20 border-t-[#5F3BA9] rounded-full animate-spin mb-4"></div>
    <p className="text-[#1E2059]/70 font-medium animate-pulse text-sm">Loading 3D Engine...</p>
  </div>
);

const FloatingPebbles = dynamic(() => import('./visuals/floating-pebbles'), { ssr: false, loading: () => <LoadingVisual /> });
const FloatingOrbs = dynamic(() => import('./visuals/floating-orbs'), { ssr: false, loading: () => <LoadingVisual /> });
const LotusPetals = dynamic(() => import('./visuals/lotus-petals'), { ssr: false, loading: () => <LoadingVisual /> });
const LightParticles = dynamic(() => import('./visuals/light-particles'), { ssr: false, loading: () => <LoadingVisual /> });
const AuroraBlob = dynamic(() => import('./visuals/aurora-blob'), { ssr: false, loading: () => <LoadingVisual /> });
const MandalaPetals = dynamic(() => import('./visuals/mandala-petals'), { ssr: false, loading: () => <LoadingVisual /> });
const DharmaWheel = dynamic(() => import('./visuals/dharma-wheel'), { ssr: false, loading: () => <LoadingVisual /> });
const MeditationMudras = dynamic(() => import('./visuals/meditation-mudras'), { ssr: false, loading: () => <LoadingVisual /> });
const PeacockBloom = dynamic(() => import('./visuals/peacock-bloom'), { ssr: false, loading: () => <LoadingVisual /> });
export default function NewLayoutsHero() {
  const { layout } = useLayout();

  const renderVisual = () => {
    switch (layout) {
      case 'layout-1': return <FloatingPebbles />;
      case 'layout-5': return <AuroraBlob />;
      case 'layout-9': return <PeacockBloom />;
      case 'layout-10': return <LightParticles />;
      default: return <AuroraBlob />;
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-20 bg-transparent min-h-[90vh] flex items-center">
      {/* Background Layer for layout-9 */}
      {layout === 'layout-9' && (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 80% 40%, rgba(149,109,255,.18), transparent 45%),
              radial-gradient(circle at 50% 60%, rgba(255,255,255,.5), transparent 55%),
              radial-gradient(circle at 90% 80%, rgba(110,80,255,.12), transparent 45%),
              linear-gradient(180deg, #F7F0FF, #F0E5FF, #E9DBFF)
            `
          }} />
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.03]" style={{
            backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.06) 100%)'
          }} />
        </div>
      )}
      
      {/* Container */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            
            {/* Action Buttons (Yellowish) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-100">
              <Link href="#" className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 text-[#1E2059] transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-5 h-5 invert brightness-0" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-medium opacity-80">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 text-[#1E2059] transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play Store" className="w-5 h-5" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-medium opacity-80">GET IT ON</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </Link>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium not-italic tracking-tight leading-[1] mb-6 animate-in slide-in-from-left duration-1000 text-[#1E2059]">
              <span>Zen</span>
              <span className="text-[#5F3BA9] drop-shadow-md">Auraa.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-[#1E2059]/80 mb-10 max-w-xl animate-in slide-in-from-left duration-1000 delay-150 font-sans font-light leading-relaxed">
              Find trusted guidance for every stage of life.<br/>Connect with verified experts instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in slide-in-from-left duration-1000 delay-300 pointer-events-auto">
              <Link href="/practitioners">
                <Button size="lg" className="bg-[#5F3BA9] hover:bg-[#4D316B] text-white px-10 h-14 text-lg rounded-full font-semibold transition-all shadow-lg shadow-[#5F3BA9]/20">
                  Ask me Anything <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
              </Link>
              
            </div>

            {/* Avatar Review Block */}
            <div className="mt-12 flex items-center gap-4 animate-in slide-in-from-bottom duration-1000 delay-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#D5B6DC] bg-white overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" className="w-full h-full object-cover p-1" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-[#1E2059]">4.9</span>
                  <svg className="w-4 h-4 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-sm text-[#1E2059]/70">Based on 10,000+ reviews</p>
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

