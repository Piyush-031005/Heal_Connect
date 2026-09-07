import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MODALITIES_CONTENT } from '@/data/modalities-content';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ModalityHero from '@/components/modalities/ModalityHero';
import ModalityContent from '@/components/modalities/ModalityContent';
import ModalityScrollGallery from '@/components/modalities/ModalityScrollGallery';

// In Next.js 15, params is a Promise. We must await it or access it correctly.
export default async function ModalityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = MODALITIES_CONTENT[resolvedParams.id];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F5FF]">
      <Navbar />
      
      <div className="pt-20">
        <ModalityHero data={data} />
        <ModalityContent data={data} />
        <ModalityScrollGallery data={data} />

        {/* Call to Action Section */}
        <section className="py-20 pb-32 bg-[#F9F5FF] border-t border-primary/10">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-serif text-[#2A1658] mb-6">
              Ready to Dive Deeper?
            </h2>
            <p className="text-lg text-[#6B5C8A] mb-12 font-medium">
              Take the next step in your spiritual journey. Connect with our verified experts and experience the profound benefits of {data.name} firsthand.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/experts"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#9333EA] to-[#C084FC] text-white rounded-full font-bold text-lg shadow-[0_8px_30px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_40px_rgba(147,51,234,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                Book a Consultant
              </Link>
              
              <Link 
                href="/experts"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#9333EA] border-2 border-[#9333EA] rounded-full font-bold text-lg shadow-lg hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                Talk to a Consultant
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

// Generate static params so these pages can be statically generated at build time
export function generateStaticParams() {
  return Object.keys(MODALITIES_CONTENT).map((id) => ({
    id: id,
  }));
}