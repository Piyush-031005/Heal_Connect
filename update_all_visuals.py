import re
import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the img tag with new.png
    # Replace its className and style entirely
    
    pattern = r'<img\s+src="/main centre logo/new\.png"\s+alt="ZenAuraa"\s+className="[^"]+"\s+style=\{\{[\s\S]*?\}\}\s*\/>'
    
    new_img = """<img 
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
        />"""
        
    content = re.sub(pattern, new_img, content)
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)