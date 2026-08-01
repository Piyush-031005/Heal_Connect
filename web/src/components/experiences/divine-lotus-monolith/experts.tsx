'use client';
export function LotusExperts() {
  return (
    <section className="bg-[#FAF8F5] py-32 border-t border-[#E3A8B1]/20">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h3 className="text-4xl md:text-5xl font-serif text-[#2D3A3A] mb-16">Awakened Guides</h3>
        <div className="flex justify-center gap-12 flex-wrap">
          {[1, 2].map(i => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                <div className="w-full h-full bg-[#E3A8B1]/20" />
              </div>
              <h4 className="text-xl font-serif text-[#2D3A3A]">Master Sage</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
