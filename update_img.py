import re
import os
import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace girl.png with new.png
    content = content.replace("girl.png", "new.png")
    
    # Apply new blending styles
    # We want opacity 90%, soft glow, etc.
    # Existing style: filter: 'brightness(0.58) contrast(1.2) saturate(0.8) hue-rotate(-8deg) drop-shadow(0 25px 40px rgba(0,0,0,.28))'
    # Let's replace the existing style filter with the new blending requested.
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)