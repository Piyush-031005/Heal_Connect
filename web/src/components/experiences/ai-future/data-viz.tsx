'use client';
export function QuantumDataViz() {
  return (
    <section className="bg-[#FAFAFA] py-32 text-center">
      <h3 className="text-4xl md:text-5xl font-black text-[#111111] mb-12 tracking-tight">The Neural Map</h3>
      <div className="max-w-5xl mx-auto h-[300px] flex items-end justify-center gap-2 px-8">
        {[40, 70, 45, 90, 60, 100, 85, 30, 50, 80].map((h, i) => (
          <div key={i} className="w-12 bg-gradient-to-t from-[#4F46E5] to-[#06B6D4] rounded-t-lg transition-all duration-1000 hover:opacity-80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </section>
  );
}
