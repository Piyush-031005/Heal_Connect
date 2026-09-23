import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function FreeServicesPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#1C0D40] mb-6 tracking-tight">
            COMING SOON
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            We are building amazing free services like horoscopes, tarot reading, and numerology calculators. Stay tuned!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
