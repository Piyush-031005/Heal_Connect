'use client';
export function QuantumFeatures() {
  return (
    <section className="bg-white py-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-[#3730A3] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Crystal Clear</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#111111] mb-6 tracking-tight">Data beyond the stars.</h3>
          <p className="text-[#666666] leading-relaxed">
            We map your astrological profile into complex geometric data structures that resonate with universal energy frequencies.
          </p>
        </div>
        <div className="h-[400px] w-full rounded-3xl bg-gradient-to-tr from-[#EEF2FF] to-[#ECFEFF] border border-[#E0E7FF] shadow-2xl shadow-[#4F46E5]/10 flex items-center justify-center p-8">
           <div className="w-full h-full border border-dashed border-[#4F46E5]/30 rounded-2xl flex items-center justify-center">
             <div className="w-16 h-16 bg-[#4F46E5]/10 rounded-full animate-ping" />
           </div>
        </div>
      </div>
    </section>
  );
}
