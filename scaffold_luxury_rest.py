import os

templates = {
    "numerology.tsx": """'use client';
export function LuxuryNumerology() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center">
      <h2 className="text-[#E8A359] text-[10px] uppercase tracking-[0.4em] mb-4">The Mathematics of Soul</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] mb-12">Numerology</h3>
      <div className="text-[20vw] font-serif text-[#2A2A2A]/5 leading-none">11:11</div>
    </section>
  );
}
""",
    "kundli.tsx": """'use client';
export function LuxuryKundli() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center">
      <h2 className="text-[#E8A359] text-[10px] uppercase tracking-[0.4em] mb-4">Vedic Blueprint</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] mb-12">Kundli Engine</h3>
      <div className="w-[300px] h-[300px] border border-[#E8A359] rotate-45 flex items-center justify-center mb-12">
        <div className="w-[280px] h-[280px] border border-[#E8A359]/50" />
      </div>
    </section>
  );
}
""",
    "compatibility.tsx": """'use client';
export function LuxuryCompatibility() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center">
      <h2 className="text-[#E8A359] text-[10px] uppercase tracking-[0.4em] mb-4">Two Souls</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A]">Compatibility</h3>
    </section>
  );
}
""",
    "tarot.tsx": """'use client';
export function LuxuryTarot() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center">
      <h2 className="text-[#E8A359] text-[10px] uppercase tracking-[0.4em] mb-4">The Cards Speak</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A]">Tarot Reading</h3>
    </section>
  );
}
""",
    "testimonials.tsx": """'use client';
export function LuxuryTestimonials() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center text-center px-8">
      <div className="max-w-3xl">
        <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] italic mb-8">
          "The precision of Aether Gold changed my perspective on destiny. Truly a luxury experience."
        </h3>
        <div className="text-[#E8A359] text-[10px] uppercase tracking-[0.3em]">— Vogue Astrology</div>
      </div>
    </section>
  );
}
""",
    "pricing.tsx": """'use client';
export function LuxuryPricing() {
  return (
    <section className="bg-[#FFF9F2] py-32 border-t border-[#E8A359]/20 flex flex-col items-center">
      <h2 className="text-[#E8A359] text-[10px] uppercase tracking-[0.4em] mb-4">Membership</h2>
      <h3 className="text-4xl md:text-5xl font-serif text-[#2A2A2A] mb-12">Aether Society</h3>
      <button className="border border-[#2A2A2A] px-12 py-4 text-[#2A2A2A] uppercase text-xs tracking-widest hover:bg-[#2A2A2A] hover:text-[#FFF9F2] transition-colors">Join Now</button>
    </section>
  );
}
""",
    "footer.tsx": """'use client';
export function LuxuryFooter() {
  return (
    <footer className="bg-[#2A2A2A] text-[#FFF9F2] py-20 flex flex-col items-center text-center">
      <h2 className="text-4xl font-serif mb-8">HealConnect</h2>
      <p className="text-[10px] uppercase tracking-[0.4em] text-[#E8A359]">© 2026. Aether Gold Edition.</p>
    </footer>
  );
}
"""
}

base_dir = "e:/HealConnect/Heal_Connect/web/src/components/experiences/luxury-editorial"
for comp, content in templates.items():
    with open(os.path.join(base_dir, comp), "w", encoding="utf-8") as f:
        f.write(content)

print("Populated remaining luxury components")
