import re
with open("web/src/components/heros/new-layouts-hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(
    r'<div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-100">.*?</div>',
    """<div className="flex flex-col sm:flex-row gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-100">
              <Link href="#" className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 text-[#1E2059] transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" className="w-5 h-5 invert brightness-0" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-medium opacity-80">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 text-[#1E2059] transition-all shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play Store" className="w-5 h-5" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-medium opacity-80">GET IT ON</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </Link>
            </div>""",
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<Link href="/horoscope">.*?</Link>',
    '',
    content,
    flags=re.DOTALL
)

with open("web/src/components/heros/new-layouts-hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)