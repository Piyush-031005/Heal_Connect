import re

# 1. footer.tsx
footer_path = "web/src/components/footer.tsx"
with open(footer_path, "r", encoding="utf-8") as f:
    footer = f.read()

footer = re.sub(r"Zen<span className=\{`\$\{isNewDesign1 \? 'text-\[#1A92C6\]' : 'text-\[#5F3BA9\]'\} drop-shadow-md`\}>Auraa\.</span>",
                "Zen<span className={`text-white drop-shadow-md`}>Auraa.</span>", footer)
footer = re.sub(r"'text-foreground'\}\}`\}", "'text-white'}`}", footer)

with open(footer_path, "w", encoding="utf-8") as f:
    f.write(footer)

# 2. new-layouts-hero.tsx
hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

btn_group = """              <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-in slide-in-from-left duration-1000 delay-200 pointer-events-auto">
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#F5C84C] bg-[#F5C84C]/10 hover:bg-[#F5C84C]/20 text-[#F5C84C] text-sm font-semibold transition-all">
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Chat</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F5C84C] hover:bg-[#E5B83C] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#F5C84C]/20">
                  <Phone className="w-4 h-4" />
                  <span>Start Calling</span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-12"""

if "Start Chat" not in hero:
    hero = hero.replace('              <div className="flex flex-col sm:flex-row gap-4 mb-12', btn_group)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)

# 3. light-particles.tsx
lp_path = "web/src/components/heros/visuals/light-particles.tsx"
with open(lp_path, "r", encoding="utf-8") as f:
    lp = f.read()

# Image shift up
lp = lp.replace("translate-y-48", "translate-y-36")

# Rotation fixes: We want the container to rotate CLOCKWISE.
# Assuming standard `spin` is clockwise (0 -> 360).
# Let's check what's currently in the file.
# Container: style={{ animation: 'spin 80s linear infinite reverse' }} -> change to 'spin 120s linear infinite'
# Items: style={{ animation: 'spin 80s linear infinite' }} -> change to 'spin 120s linear infinite reverse'

lp = re.sub(r"animation:\s*'spin 80s linear infinite reverse'", "animation: 'spin 120s linear infinite'", lp)
lp = re.sub(r"animation:\s*'spin 80s linear infinite'", "animation: 'spin 120s linear infinite reverse'", lp)

# Make sure ConstellationLines is also -= delta * 0.05
lp = lp.replace("groupRef.current.rotation.z += delta * 0.05;", "groupRef.current.rotation.z -= delta * 0.05;")

with open(lp_path, "w", encoding="utf-8") as f:
    f.write(lp)

print("Updates successful")