import os

templates = {
    "features.tsx": """'use client';
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
""",
    "tarot.tsx": """'use client';
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
""",
    "experts.tsx": """'use client';
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
""",
    "footer.tsx": """'use client';
export function LotusFooter() {
  return (
    <footer className="bg-[#2D3A3A] text-[#FAF8F5] py-20 flex flex-col items-center text-center">
      <h2 className="text-4xl font-serif mb-8">HealConnect</h2>
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#E3A8B1]">© 2026. Divine Lotus Edition.</p>
    </footer>
  );
}
"""
}

base_dir = "e:/HealConnect/Heal_Connect/web/src/components/experiences/divine-lotus-monolith"
for comp, content in templates.items():
    with open(os.path.join(base_dir, comp), "w", encoding="utf-8") as f:
        f.write(content)

print("Populated remaining lotus components")
