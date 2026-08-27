import { notFound } from 'next/navigation';
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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20"> {/* Offset for fixed navbar */}
        <ModalityHero data={data} />
        <ModalityContent data={data} />
        <ModalityScrollGallery data={data} />
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
