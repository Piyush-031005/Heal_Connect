import re

ctx_path = "web/src/lib/layout-context.tsx"
with open(ctx_path, "r", encoding="utf-8") as f:
    ctx = f.read()

# Force layout-5 as the default and remove local storage override
ctx = re.sub(r"useState<LayoutMode>\('[^']+'\)", "useState<LayoutMode>('layout-5')", ctx)
ctx = ctx.replace("setLayoutState(stored);", "// setLayoutState(stored); // Disabled to force default layout")

with open(ctx_path, "w", encoding="utf-8") as f:
    f.write(ctx)

hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

# Make sure layout-5 renders what it's supposed to (AuroraBlob) or whatever is the default
switch_replacement = """switch (layout) {
      case 'layout-1': return <FloatingPebbles />;
      case 'layout-5': return <AuroraBlob />;
      case 'layout-9': return <PeacockBloom />;
      case 'layout-10': return <LightParticles />;
      default: return <AuroraBlob />;
    }"""
hero = re.sub(r"switch\s*\(layout\)\s*\{[^\}]+\}", switch_replacement, hero)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)
