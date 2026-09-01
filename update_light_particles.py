import re

with open("web/src/components/heros/visuals/light-particles.tsx", "r", encoding="utf-8") as f:
    content = f.read()

new_logo_block = """
      {/* Background Image of the Right Side */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/main centre logo/new.png" 
          alt="ZenAuraa" 
          className="absolute w-[800px] h-[800px] max-w-none object-cover scale-[1.3] -translate-y-24"
          style={{
            opacity: 0.85,
            filter: 'brightness(0.9) contrast(1.15) saturate(1.2) drop-shadow(0 0 50px rgba(160,120,255,0.6))',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
            mixBlendMode: 'lighten'
          }}
        />
      </div>
"""

content = re.sub(
    r'\{\/\* Center Logo \*\/\}.*?<\/div>\s*<\/div>\s*<\/div>',
    new_logo_block + '\n    </div>\n  );\n}',
    content,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/light-particles.tsx", "w", encoding="utf-8") as f:
    f.write(content)