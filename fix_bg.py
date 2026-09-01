import re

with open("web/src/components/heros/new-layouts-hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

bg_layer = """
      {/* Background Layer for layout-9 */}
      {layout === 'layout-9' && (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 80% 40%, rgba(149,109,255,.18), transparent 45%),
              radial-gradient(circle at 50% 60%, rgba(255,255,255,.5), transparent 55%),
              radial-gradient(circle at 90% 80%, rgba(110,80,255,.12), transparent 45%),
              linear-gradient(180deg, #F7F0FF, #F0E5FF, #E9DBFF)
            `
          }} />
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.03]" style={{
            backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.06) 100%)'
          }} />
        </div>
      )}
      
      {/* Container */}
"""

content = re.sub(
    r'<section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-transparent min-h-\[90vh\] flex items-center">\s*{\/\* Container \*\/}',
    f'<section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32 bg-transparent min-h-[90vh] flex items-center">{bg_layer}',
    content
)

with open("web/src/components/heros/new-layouts-hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)


with open("web/src/components/heros/visuals/peacock-bloom.tsx", "r", encoding="utf-8") as f:
    pb = f.read()

pb = re.sub(
    r'<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" style={{ width: \'100vw\', left: \'50%\', transform: \'translateX\(-50%\)\' }}>.*?</div>\s*{/\* Hero Visual Container \*/}',
    '{/* Hero Visual Container */}',
    pb,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "w", encoding="utf-8") as f:
    f.write(pb)