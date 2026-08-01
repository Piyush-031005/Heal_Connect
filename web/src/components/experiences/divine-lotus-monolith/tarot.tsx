'use client';
export function LotusTarot() {
  return (
    <section className="bg-white py-32 flex flex-col items-center text-center">
      <h2 className="text-[#E3A8B1] text-[10px] uppercase tracking-[0.4em] mb-4">Divination</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2D3A3A] mb-12">The Oracle's Touch</h3>
      <div className="flex gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-[200px] h-[320px] bg-[#FAF8F5] rounded-xl border border-[#E3A8B1]/20 flex items-center justify-center shadow-lg transform hover:-translate-y-4 transition-transform duration-500">
            <div className="text-4xl text-[#E3A8B1]">🎴</div>
          </div>
        ))}
      </div>
    </section>
  );
}
