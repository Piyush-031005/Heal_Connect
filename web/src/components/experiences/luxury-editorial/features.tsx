'use client';
export function LuxuryFeatures() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto border-t border-[#2A231C]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl italic mb-8">The Private Collection</h2>
          <p className="font-sans text-sm tracking-widest uppercase leading-loose opacity-60">Exclusive access to world-renowned astrologers, normally reserved for the elite.</p>
        </div>
        <div className="space-y-12">
          {['Vedic Mastery', 'Tarot Divination', 'Aura Reading'].map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b border-[#2A231C]/10 pb-4 group cursor-pointer">
              <span className="text-2xl group-hover:italic transition-all">{item}</span>
              <span className="font-sans text-xs tracking-widest">Explore</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
