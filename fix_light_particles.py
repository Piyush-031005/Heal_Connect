import re

with open("web/src/components/heros/visuals/light-particles.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the Center Logo div
# Old div starts with: <div className="absolute z-20 w-28 h-28 rounded-full...
# and ends with: </div>
# We will use regex to replace that whole block.

new_logo_block = """
      {/* Center Logo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img 
          src="/main centre logo/new.png" 
          alt="ZenAuraa" 
          className="w-[600px] object-contain"
          style={{
            opacity: 0.95,
            filter: 'brightness(1.05) contrast(1.1) saturate(1.2) drop-shadow(0 0 50px rgba(160,120,255,0.6))',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 65%)',
            mixBlendMode: 'normal'
          }}
        />
      </div>
"""

content = re.sub(
    r'\{\/\* Center Logo \*\/\}.*?(?=\s*<\/div>\s*<\/div>\s*\)\s*;)',
    new_logo_block,
    content,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/light-particles.tsx", "w", encoding="utf-8") as f:
    f.write(content)