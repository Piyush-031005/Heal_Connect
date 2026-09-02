import glob
import re
import os

# 1. Global Logo Replacement
for root, dirs, filenames in os.walk("web/src"):
    for filename in filenames:
        if filename.endswith(".tsx"):
            file_path = os.path.join(root, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            if '"/logo.png"' in content or "'/logo.png'" in content:
                content = content.replace('"/logo.png"', '"/center_logo_final.png"').replace("'/logo.png'", "'/center_logo_final.png'")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)

# 2. Navbar Fixes (Logo Text + Login/Register Yellow)
nav_path = "web/src/components/navbar.tsx"
with open(nav_path, "r", encoding="utf-8") as f:
    nav = f.read()

# Logo Text
nav = nav.replace('tracking-wide transition-all hover:scale-105">ZenAuraa</span>', 'tracking-wide transition-all hover:scale-105"><span className="text-white">Zen</span><span className="text-purple-300">Auraa</span></span>')
nav = nav.replace('text-[#2D1B69] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-wide">ZenAuraa</span>', 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] tracking-wide">Zen<span className="text-purple-300">Auraa</span></span>')

# Login Button
nav = re.sub(
    r'<Link href="/login" className={`hidden md:block text-sm font-medium transition-colors px-2[^`]+`}>[\s\S]*?Login[\s\S]*?</Link>',
    r'<Link href="/login" className={`hidden md:block text-sm font-bold px-4 py-1.5 rounded-full transition-colors ${isFinalHybrid ? \'text-[#2A1658] bg-[#F5C84C] hover:bg-[#E5B83C]\' : \'text-primary bg-[#F5C84C] hover:bg-[#E5B83C]\'}`}>\n                  Login\n                </Link>',
    nav
)
# Register Button
nav = re.sub(
    r'<Link href="/register" className="hidden md:block text-sm font-semibold text-\[#4D316B\] bg-\[#B79AE6\] hover:bg-\[#c9a000\] transition-colors px-4 py-1.5 rounded-full ml-1">[\s\S]*?Register[\s\S]*?</Link>',
    r'<Link href="/register" className="hidden md:block text-sm font-bold text-[#2A1658] bg-[#F5C84C] hover:bg-[#E5B83C] transition-colors px-4 py-1.5 rounded-full ml-1 shadow-sm">\n                    Register\n                  </Link>',
    nav
)

with open(nav_path, "w", encoding="utf-8") as f:
    f.write(nav)

# 3. New Layouts Hero Fix (Add 2 Buttons)
hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

btn_group = """              <div className="flex items-center gap-4 mb-6 animate-in slide-in-from-left duration-1000 delay-200 pointer-events-auto">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#5F3BA9]/30 bg-[#5F3BA9]/10 hover:bg-[#5F3BA9]/20 text-[#5F3BA9] text-sm font-semibold transition-all">
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Chatting</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5F3BA9] hover:bg-[#4D316B] text-white text-sm font-bold transition-all shadow-lg shadow-[#5F3BA9]/20">
                  <Phone className="w-4 h-4" />
                  <span>Start Calling</span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-12"""
hero = hero.replace('              <div className="flex flex-col sm:flex-row gap-4 mb-12', btn_group)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)

# 4. Optical Wheel Fixes
wheel_path = "web/src/components/optical-wheel.tsx"
with open(wheel_path, "r", encoding="utf-8") as f:
    wheel = f.read()

# Fix Modalitiy names
wheel = wheel.replace("{ id: 'spiritual',      name: 'Spiritual',", "{ id: 'spiritual',      name: 'Spiritual Guidance',")
wheel = wheel.replace("{ id: 'dreams',         name: 'Dream Predict',", "{ id: 'dreams',         name: 'Dream Prediction',")

# Router import and hook
if "import { useRouter }" not in wheel:
    wheel = wheel.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { useRouter } from 'next/navigation';")
if "const router = useRouter();" not in wheel:
    wheel = wheel.replace("const { theme } = useTheme();", "const { theme } = useTheme();\n  const router = useRouter();")

# Reverse spin
# Main wheel spin
wheel = wheel.replace("animation: 'spin 180s linear infinite'", "animation: 'spin 180s linear infinite reverse'")
# Nodes counter-spin
wheel = wheel.replace("animation: 'spin 180s linear infinite reverse reverse'", "animation: 'spin 180s linear infinite'") # in case of double reverse
# if it was already reversed we need to handle that, but let's just do a smarter replace
import re
wheel = re.sub(r"animation:\s*'spin 180s linear infinite',\s*transformOrigin:\s*'600px 600px'", "animation: 'spin 180s linear infinite reverse', transformOrigin: '600px 600px'", wheel)
wheel = re.sub(r"animation:\s*'spin 180s linear infinite reverse',\s*animationPlayState:\s*playState,\s*transformOrigin:\s*'0px 0px'", "animation: 'spin 180s linear infinite', animationPlayState: playState, transformOrigin: '0px 0px'", wheel)

# Replace ScrollTo with router.push to remove lag during scrolling
wheel = wheel.replace("onClick={() => handleScrollTo(mod.id)}", "onClick={() => router.push('/modalities/' + mod.id)}")

with open(wheel_path, "w", encoding="utf-8") as f:
    f.write(wheel)

print("Updates completed successfully.")