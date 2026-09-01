import re

# 1. Update layout-context.tsx to make layout-10 default
with open("web/src/lib/layout-context.tsx", "r", encoding="utf-8") as f:
    ctx = f.read()
ctx = re.sub(r"useState<LayoutMode>\('layout-\d+'\)", "useState<LayoutMode>('layout-10')", ctx)
with open("web/src/lib/layout-context.tsx", "w", encoding="utf-8") as f:
    f.write(ctx)

# 2. Update new-layouts-hero.tsx to map layout-10 to LightParticles
with open("web/src/components/heros/new-layouts-hero.tsx", "r", encoding="utf-8") as f:
    hero = f.read()

switch_replacement = """switch (layout) {
      case 'layout-1': return <FloatingPebbles />;
      case 'layout-5': return <AuroraBlob />;
      case 'layout-9': return <PeacockBloom />;
      case 'layout-10': return <LightParticles />;
      default: return <LightParticles />;
    }"""
hero = re.sub(r"switch\s*\(layout\)\s*\{[^\}]+\}", switch_replacement, hero)
with open("web/src/components/heros/new-layouts-hero.tsx", "w", encoding="utf-8") as f:
    f.write(hero)

# 3. Fix navbar.tsx Language Button
with open("web/src/components/navbar.tsx", "r", encoding="utf-8") as f:
    nav = f.read()

# Replace the button content
old_btn = r'<span className="text-purple-400">[^<]+</span>\s*<span className=\{isDark \? \'text-gray-400\' : \'text-gray-400\'\}>/</span>\s*<span className=\{isDark \? \'text-gray-200\' : \'text-gray-700\'\}>[^<]+</span>'
new_btn = r'<svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg><span className={isDark ? "text-gray-200 ml-1" : "text-gray-700 ml-1"}>{lang.toUpperCase()}</span>'
nav = re.sub(old_btn, new_btn, nav)

# Replace the dropdown items
old_dropdown = r'\{\(\[\{\s*code:\s*\'en\'[^\}]+.*?\s*sub:\s*\'[^\']+\'\s*\}\]\s*as\s*const\)'
new_dropdown = "{([{ code: 'en', label: 'English', sub: 'EN' }, { code: 'hi', label: 'Hindi (हिन्दी)', sub: 'HI' }, { code: 'es', label: 'Spanish (Español)', sub: 'ES' }, { code: 'fr', label: 'French (Français)', sub: 'FR' }, { code: 'de', label: 'German (Deutsch)', sub: 'DE' }] as const)"
nav = re.sub(old_dropdown, new_dropdown, nav)

with open("web/src/components/navbar.tsx", "w", encoding="utf-8") as f:
    f.write(nav)