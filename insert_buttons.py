import re

hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

btn_group = """            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-200 pointer-events-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#F5C84C] bg-[#F5C84C]/10 hover:bg-[#F5C84C]/20 text-[#F5C84C] text-sm font-semibold transition-all">
                <MessageCircle className="w-4 h-4" />
                <span>Start Chat</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F5C84C] hover:bg-[#E5B83C] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#F5C84C]/20">
                <Phone className="w-4 h-4" />
                <span>Start Calling</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in slide-in-from-left duration-1000 delay-300 pointer-events-auto">"""

if "Start Chat" not in hero:
    hero = hero.replace('            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in slide-in-from-left duration-1000 delay-300 pointer-events-auto">', btn_group)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)

lp_path = "web/src/components/heros/visuals/light-particles.tsx"
with open(lp_path, "r", encoding="utf-8") as f:
    lp = f.read()

lp = lp.replace("translate-y-36", "translate-y-32")
lp = lp.replace("translate-y-48", "translate-y-32")

with open(lp_path, "w", encoding="utf-8") as f:
    f.write(lp)