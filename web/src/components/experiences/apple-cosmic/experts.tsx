'use client';

export function AppleCosmicExperts() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center mb-20">The minds behind the magic.</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-105 border-4 border-gray-50">
                <img src={`/avatars/astrologer_${i}.jpg`} alt="Expert" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <h4 className="text-lg font-semibold tracking-tight">Dr. Sarah Orion</h4>
              <p className="text-sm text-gray-500">Vedic Master</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
