import re

# 1. layout-context.tsx
ctx_path = "web/src/lib/layout-context.tsx"
with open(ctx_path, "r", encoding="utf-8") as f:
    ctx = f.read()

ctx = re.sub(r"useState<LayoutMode>\('[^']+'\)", "useState<LayoutMode>('layout-10')", ctx)
with open(ctx_path, "w", encoding="utf-8") as f:
    f.write(ctx)

# 2. new-layouts-hero.tsx
hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

hero = re.sub(r"default: return <[^>]+>;", "default: return <LightParticles />;", hero)

btn_group = """              <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-200 pointer-events-auto">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F5C84C] bg-[#F5C84C]/10 hover:bg-[#F5C84C]/20 text-[#F5C84C] text-sm font-semibold transition-all">
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Chat</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F5C84C] hover:bg-[#E5B83C] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#F5C84C]/20">
                  <Phone className="w-4 h-4" />
                  <span>Start Calling</span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-12"""

# Add buttons if they are not already there
if "Start Chat" not in hero:
    hero = hero.replace('              <div className="flex flex-col sm:flex-row gap-4 mb-12', btn_group)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)

# 3. light-particles.tsx
lp_path = "web/src/components/heros/visuals/light-particles.tsx"
with open(lp_path, "r", encoding="utf-8") as f:
    lp = f.read()

# Fix modality names
lp = lp.replace("{id:'spiritual',name:'Spiritual'}", "{id:'spiritual',name:'Spiritual Guidance'}")
lp = lp.replace("{id:'dreams',name:'Dream Predict'}", "{id:'dreams',name:'Dream Prediction'}")

# Clockwise rotation for constellation lines
lp = lp.replace("groupRef.current.rotation.z += delta * 0.05;", "groupRef.current.rotation.z -= delta * 0.05;")

# Clockwise rotation for text
lp = lp.replace("animation: 'spin 80s linear infinite'", "animation: 'TEMP_SPIN'")
lp = lp.replace("animation: 'spin 80s linear infinite reverse'", "animation: 'spin 80s linear infinite'")
lp = lp.replace("animation: 'TEMP_SPIN'", "animation: 'spin 80s linear infinite reverse'")

# Shift image down
lp = lp.replace("translate-y-28", "translate-y-48")

# Fix lag by using hard navigation
lp = lp.replace("onClick={() => router.push(`/modalities/${mod.id}`)}", "onClick={() => window.location.href = `/modalities/${mod.id}`}")
lp = lp.replace("3000", "1500") # Reduce particles slightly for better performance

with open(lp_path, "w", encoding="utf-8") as f:
    f.write(lp)

print("Updates successful")