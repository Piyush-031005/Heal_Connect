'use client';
export function LotusFeatures() {
  return (
    <section className="bg-[#FAF8F5] py-32 border-t border-[#E3A8B1]/20">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-[#E3A8B1] text-[10px] uppercase tracking-[0.4em] mb-4">Cosmic Alignment</h2>
        <h3 className="text-4xl md:text-5xl font-serif text-[#2D3A3A] mb-16">The Petals of Knowledge</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 border border-[#E3A8B1]/10">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-6 text-[#E3A8B1]">✦</div>
              <h4 className="text-xl font-serif text-[#2D3A3A] mb-4">Vedic Accuracy</h4>
              <p className="text-[#6C7A7A] text-sm">Discover the most precise astrological insights wrapped in an elegant interface.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
