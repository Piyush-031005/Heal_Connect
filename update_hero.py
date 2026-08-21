import sys

filepath = 'web/src/components/heros/hero.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the function body of FinalHybridHero using a robust split.
start_marker = '// --- FINAL HYBRID HERO (Amethyst/Gold with Classic Typography) ---'
end_marker = '// --- MAIN EXPORT ---'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Could not find markers')
    sys.exit(1)

new_hero = """// --- FINAL HYBRID HERO (Amethyst/Gold with Classic Typography) ---
function FinalHybridHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { theme } = useTheme();
  const currentLogo = theme === 'theme-royal-indigo' ? '/new_center_logo_dark.png' : '/new_center_logo.png';
  const isNewColor = theme === 'theme-new-color';

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section 
      ref={containerRef}
      className={`relative pt-32 pb-24 lg:pt-48 lg:pb-32 transition-colors duration-500 min-h-[95vh] flex items-center justify-center overflow-hidden ${isNewColor ? 'bg-stats-gradient' : 'bg-background'}`}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#694091]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B79AE6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Typography & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 z-20"
          >
            {/* Start Chat / Start Calling Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/practitioners"
                className={`${isNewColor ? 'bg-white/20 text-white border-white/40 hover:bg-white/30' : 'bg-primary/20 text-primary border-primary/40 hover:bg-primary/30'} px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center border gap-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Start Chat
              </Link>
              <Link
                href="/practitioners"
                className={`${isNewColor ? 'bg-white text-[#5E3DA7] hover:bg-white/90' : 'bg-primary text-primary-foreground hover:brightness-110'} px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all flex items-center gap-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Start Calling
              </Link>
            </div>

            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-8 backdrop-blur-sm ${isNewColor ? 'bg-white/10 border-white/30' : 'bg-primary/10 border-primary/30'}`}>
              <Sparkles className={`w-4 h-4 ${isNewColor ? 'text-white' : 'text-primary'}`} />
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${isNewColor ? 'text-white' : 'text-primary'}`}>Premium Consultation</span>
            </div>

            {/* Typography from very old layout */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`text-6xl md:text-8xl font-serif font-medium tracking-tight mb-6 leading-[1.1] transition-colors duration-500 ${isNewColor ? 'text-white' : 'text-foreground'}`}
            >
              Guidance.<br/>
              Clarity.<br/>
              <span className={`${isNewColor ? 'text-white/90' : 'text-primary'} italic transition-colors duration-500`}>Confidence.</span>
            </motion.h1>

            {/* RIGHT: Cosmic Wheel Graphic (Adapted to Half-Arc) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex lg:hidden relative w-full items-center justify-center z-0 my-8 overflow-visible"
          >
            {/* Lavender glow */}
            <div className={`absolute top-1/2 lg:right-0 lg:translate-x-[30%] -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl z-0 ${isNewColor ? 'bg-hero-glow' : 'bg-[radial-gradient(circle,rgba(183,154,230,0.15)_0%,rgba(105,64,145,0.25)_50%,transparent_70%)]'}`} />

            {/* Wheel Container - Bottom Arc on Mobile, Right Arc on Desktop */}
            <div className={`relative lg:absolute left-1/2 -translate-x-1/2 lg:left-auto lg:top-1/2 lg:right-0 translate-y-[20%] lg:-translate-y-1/2 lg:translate-x-[25%] flex items-center justify-center rounded-full z-10 pointer-events-none mb-8 lg:mb-0 ${isNewColor ? 'w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px]' : 'w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] md:w-[750px] md:h-[750px] lg:w-[900px] lg:h-[900px]'}`}>
              
              {/* Outer Dashed Ring */}
              <div className={`absolute w-[95%] h-[95%] rounded-full border border-dashed pointer-events-none ${isNewColor ? 'border-white/40' : 'border-[#B79AE6]/30'}`} />
              
              {/* Inner Thin Ring */}
              <div className={`absolute w-[75%] h-[75%] rounded-full border pointer-events-none ${isNewColor ? 'border-white/20' : 'border-[#B79AE6]/20'}`} />

              {/* THE REVOLVING ORBIT — the whole ring spins, icons counter-rotate to stay upright */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
                className="absolute w-[95%] h-[95%] rounded-full transition-colors duration-500 pointer-events-none"
              >
                {[
                  { img: '/12-modalities-updates/astrology.png',       label: 'Astrology',     id: 'astrology' },
                  { img: '/12-modalities-updates/tarot.png',            label: 'Tarot',         id: 'tarot' },
                  { img: '/12-modalities-updates/facereading.png',      label: 'Face Reading',  id: 'face-reading' },
                  { img: '/12-modalities-updates/plamreading.png',      label: 'Palm Reading',  id: 'palm-reading' },
                  { img: '/12-modalities-updates/sound.png',            label: 'Sound Healing', id: 'sound-healing' },
                  { img: '/12-modalities-updates/medidation.png',       label: 'Meditation',    id: 'meditation' },
                  { img: '/12-modalities-updates/spiritual.png',        label: 'Spiritual',     id: 'spiritual' },
                  { img: '/12-modalities-updates/chakrahealing.png',    label: 'Chakra',        id: 'chakra-healing' },
                  { img: '/12-modalities-updates/breathwork.png',       label: 'Breathwork',    id: 'breathwork' },
                  { img: '/12-modalities-updates/dream_prediction.png', label: 'Dreams',        id: 'dreams' },
                  { img: '/12-modalities-updates/space_harmony.png',    label: 'Space Harmony', id: 'space-harmony' },
                  { img: '/12-modalities-updates/numerology.png',       label: 'Numerology',    id: 'numerology' },
                ].map((mod, i, arr) => {
                  const angle = (i * 360) / arr.length;
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex justify-center items-start origin-center pointer-events-none"
                      initial={{ rotate: angle }}
                    >
                      {/* Counter-rotate the icon so it always faces upright */}
                      <motion.div
                        initial={{ rotate: -angle }}
                        animate={{ rotate: -(360 + angle) }}
                        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
                        className="flex flex-col items-center -mt-12 md:-mt-16 group cursor-pointer pointer-events-auto"
                      >
                        <Link href={`/modalities/${mod.id}`} className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center transition-all duration-500 hover:scale-110 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.8)]">
                          <img src={mod.img} alt={mod.label} className={`w-full h-full object-contain group-hover:brightness-125 transition-all ${isNewColor ? 'invert brightness-0' : ''}`} style={isNewColor ? { filter: 'brightness(0) invert(1)' } : {}} />
                        </Link>
                        <span className={`text-[14px] md:text-[16px] font-bold mt-3 tracking-wide whitespace-nowrap drop-shadow-md transition-colors duration-500 ${isNewColor ? 'text-white' : 'text-foreground'}`}>{mod.label}</span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Central Logo Area */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute w-[28%] h-[28%] rounded-full flex items-center justify-center z-20 pointer-events-auto"
              >
                {/* Geometric Star Pattern Behind Logo */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className={`absolute inset-0 w-full h-full border rotate-0 rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                  <div className={`absolute inset-0 w-full h-full border rotate-[30deg] rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                  <div className={`absolute inset-0 w-full h-full border rotate-[60deg] rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                </motion.div>

                {/* Glowing Aura without Black Ring */}
                <div className="absolute w-[80%] h-[80%] rounded-full flex items-center justify-center">
                  
                  {/* The Logo */}
                  <div className="relative w-full h-full z-10 flex items-center justify-center">
                    <Image
                      src={currentLogo}
                      alt="HealConnect Logo"
                      fill
                      className="object-contain drop-shadow-[0_10px_20px_rgba(var(--primary),0.6)] hover:scale-105 hover:drop-shadow-[0_15px_30px_rgba(var(--primary),0.8)] transition-all duration-500 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className={`text-lg md:text-xl font-medium max-w-md mb-12 leading-relaxed transition-colors duration-500 ${isNewColor ? 'text-white/80' : 'text-muted-foreground'}`}
            >
              Find trusted guidance for every stage of life. Connect with verified experts instantly.
            </motion.p>

            {/* Stats row from screenshot 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className={`flex items-center gap-3 sm:gap-6 lg:gap-8 pt-8 border-t transition-colors duration-500 w-full overflow-x-auto scrollbar-hide pb-2 ${isNewColor ? 'border-white/30' : 'border-primary/30'}`}
            >
              <div className="shrink-0">
                <p className={`text-xl md:text-2xl font-serif ${isNewColor ? 'text-white' : 'text-foreground'}`}>4.9★</p>
                <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isNewColor ? 'text-white/70' : 'text-muted-foreground'}`}>Rating</p>
              </div>
              <div className={`w-px h-8 shrink-0 ${isNewColor ? 'bg-white/30' : 'bg-primary/30'}`} />
              <div className="shrink-0">
                <p className={`text-xl md:text-2xl font-serif ${isNewColor ? 'text-white' : 'text-foreground'}`}>100k+</p>
                <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isNewColor ? 'text-white/70' : 'text-muted-foreground'}`}>Consultations</p>
              </div>
              <div className={`w-px h-8 shrink-0 ${isNewColor ? 'bg-white/30' : 'bg-primary/30'}`} />
              <div className="shrink-0">
                <p className={`text-xl md:text-2xl font-serif ${isNewColor ? 'text-white' : 'text-foreground'}`}>500+</p>
                <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isNewColor ? 'text-white/70' : 'text-muted-foreground'}`}>Experts</p>
              </div>
              <div className={`w-px h-8 shrink-0 ${isNewColor ? 'bg-white/30' : 'bg-primary/30'}`} />
              <div className="shrink-0">
                <p className={`text-xl md:text-2xl font-serif ${isNewColor ? 'text-white' : 'text-foreground'}`}>24x7</p>
                <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isNewColor ? 'text-white/70' : 'text-muted-foreground'}`}>Availability</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Cosmic Wheel Graphic (Adapted to Half-Arc) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-6 absolute inset-y-0 right-0 w-full h-full pointer-events-none items-center justify-center z-0"
          >
            {/* Lavender glow */}
            <div className={`absolute top-1/2 lg:right-0 lg:translate-x-[30%] -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl z-0 ${isNewColor ? 'bg-hero-glow' : 'bg-[radial-gradient(circle,rgba(183,154,230,0.15)_0%,rgba(105,64,145,0.25)_50%,transparent_70%)]'}`} />

            {/* Wheel Container - Bottom Arc on Mobile, Right Arc on Desktop */}
            <div className={`relative lg:absolute left-1/2 -translate-x-1/2 lg:left-auto lg:top-1/2 lg:right-0 translate-y-[20%] lg:-translate-y-1/2 lg:translate-x-[25%] flex items-center justify-center rounded-full z-10 pointer-events-none mb-8 lg:mb-0 ${isNewColor ? 'w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px]' : 'w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] md:w-[750px] md:h-[750px] lg:w-[900px] lg:h-[900px]'}`}>
              
              {/* Outer Dashed Ring */}
              <div className={`absolute w-[95%] h-[95%] rounded-full border border-dashed pointer-events-none ${isNewColor ? 'border-white/40' : 'border-[#B79AE6]/30'}`} />
              
              {/* Inner Thin Ring */}
              <div className={`absolute w-[75%] h-[75%] rounded-full border pointer-events-none ${isNewColor ? 'border-white/20' : 'border-[#B79AE6]/20'}`} />

              {/* THE REVOLVING ORBIT — the whole ring spins, icons counter-rotate to stay upright */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
                className="absolute w-[95%] h-[95%] rounded-full transition-colors duration-500 pointer-events-none"
              >
                {[
                  { img: '/12-modalities-updates/astrology.png',       label: 'Astrology',     id: 'astrology' },
                  { img: '/12-modalities-updates/tarot.png',            label: 'Tarot',         id: 'tarot' },
                  { img: '/12-modalities-updates/facereading.png',      label: 'Face Reading',  id: 'face-reading' },
                  { img: '/12-modalities-updates/plamreading.png',      label: 'Palm Reading',  id: 'palm-reading' },
                  { img: '/12-modalities-updates/sound.png',            label: 'Sound Healing', id: 'sound-healing' },
                  { img: '/12-modalities-updates/medidation.png',       label: 'Meditation',    id: 'meditation' },
                  { img: '/12-modalities-updates/spiritual.png',        label: 'Spiritual',     id: 'spiritual' },
                  { img: '/12-modalities-updates/chakrahealing.png',    label: 'Chakra',        id: 'chakra-healing' },
                  { img: '/12-modalities-updates/breathwork.png',       label: 'Breathwork',    id: 'breathwork' },
                  { img: '/12-modalities-updates/dream_prediction.png', label: 'Dreams',        id: 'dreams' },
                  { img: '/12-modalities-updates/space_harmony.png',    label: 'Space Harmony', id: 'space-harmony' },
                  { img: '/12-modalities-updates/numerology.png',       label: 'Numerology',    id: 'numerology' },
                ].map((mod, i, arr) => {
                  const angle = (i * 360) / arr.length;
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex justify-center items-start origin-center pointer-events-none"
                      initial={{ rotate: angle }}
                    >
                      {/* Counter-rotate the icon so it always faces upright */}
                      <motion.div
                        initial={{ rotate: -angle }}
                        animate={{ rotate: -(360 + angle) }}
                        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
                        className="flex flex-col items-center -mt-12 md:-mt-16 group cursor-pointer pointer-events-auto"
                      >
                        <Link href={`/modalities/${mod.id}`} className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center transition-all duration-500 hover:scale-110 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.8)]">
                          <img src={mod.img} alt={mod.label} className={`w-full h-full object-contain group-hover:brightness-125 transition-all ${isNewColor ? 'invert brightness-0' : ''}`} style={isNewColor ? { filter: 'brightness(0) invert(1)' } : {}} />
                        </Link>
                        <span className={`text-[14px] md:text-[16px] font-bold mt-3 tracking-wide whitespace-nowrap drop-shadow-md transition-colors duration-500 ${isNewColor ? 'text-white' : 'text-foreground'}`}>{mod.label}</span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Central Logo Area */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute w-[28%] h-[28%] rounded-full flex items-center justify-center z-20 pointer-events-auto"
              >
                {/* Geometric Star Pattern Behind Logo */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className={`absolute inset-0 w-full h-full border rotate-0 rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                  <div className={`absolute inset-0 w-full h-full border rotate-[30deg] rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                  <div className={`absolute inset-0 w-full h-full border rotate-[60deg] rounded-sm ${isNewColor ? 'border-white/30' : 'border-primary/30'}`} />
                </motion.div>

                {/* Glowing Aura without Black Ring */}
                <div className="absolute w-[80%] h-[80%] rounded-full flex items-center justify-center">
                  
                  {/* The Logo */}
                  <div className="relative w-full h-full z-10 flex items-center justify-center">
                    <Image
                      src={currentLogo}
                      alt="HealConnect Logo"
                      fill
                      className="object-contain drop-shadow-[0_10px_20px_rgba(var(--primary),0.6)] hover:scale-105 hover:drop-shadow-[0_15px_30px_rgba(var(--primary),0.8)] transition-all duration-500 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"""

final_content = content[:start_idx] + new_hero + '\n' + content[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(final_content)

print("Successfully replaced FinalHybridHero")
