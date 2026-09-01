import re
import glob

blend_style = """style={{
                opacity: 0.88,
                filter: 'brightness(0.95) contrast(1.1) saturate(1.1) drop-shadow(0 0 40px rgba(160,120,255,0.4))',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
                maskImage: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
                mixBlendMode: 'normal'
              }}"""

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace any existing style={{ filter: ... }} on the image
    content = re.sub(
        r'style=\{\{\s*filter:\s*\'[^\']+\'\s*\}\}',
        blend_style,
        content
    )
    
    # For light-particles.tsx which might not have a filter yet
    if "light-particles.tsx" in comp:
        content = re.sub(
            r'(<img src="/main centre logo/new.png" alt="ZenAuraa" className="[^"]+") />',
            r'\1\n        ' + blend_style + '\n      />',
            content
        )
        
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)