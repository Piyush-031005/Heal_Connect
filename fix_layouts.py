import re

# 1. Update new-layouts-hero.tsx to move everything up
with open("web/src/components/heros/new-layouts-hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()
content = re.sub(
    r'<section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-32',
    '<section className="relative overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-32',
    content
)
with open("web/src/components/heros/new-layouts-hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)


# 2. Update peacock-bloom.tsx
with open("web/src/components/heros/visuals/peacock-bloom.tsx", "r", encoding="utf-8") as f:
    pb = f.read()

# Make the girl and background larger, add rotation to lotus
pb = re.sub(
    r'<div className="absolute w-\[700px\] h-\[700px\] rounded-full blur-\[90px\]"',
    '<div className="absolute w-[900px] h-[900px] rounded-full blur-[100px]"',
    pb
)
pb = re.sub(
    r'<div className="absolute w-\[500px\] h-\[500px\] opacity-70 blur-\[70px\] mix-blend-screen"',
    '<div className="absolute w-[700px] h-[700px] opacity-70 blur-[80px] mix-blend-screen"',
    pb
)
# Rotate the lotus group
pb = re.sub(
    r'<motion.div \s*className="absolute flex items-center justify-center bottom-\[150px\]"\s*animate={{ scale: \[1, 1.015, 1\] }}\s*transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}\s*>',
    '<motion.div \n          className="absolute flex items-center justify-center bottom-[150px] scale-[1.3]"\n          animate={{ scale: [1.3, 1.32, 1.3], rotate: [0, 360] }}\n          transition={{ scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 180, repeat: Infinity, ease: "linear" } }}\n        >',
    pb
)
# Increase girl size and fix mask URL
pb = re.sub(
    r'w-\[300px\] h-\[400px\] flex items-end',
    'w-[400px] h-[550px] flex items-end',
    pb
)
pb = re.sub(
    r'w-\[250px\] object-contain',
    'w-[350px] object-contain',
    pb
)
pb = re.sub(
    r'WebkitMaskImage: \'url\(/images/girl_meditating\.png\)\'',
    'WebkitMaskImage: \'url("/main centre logo/girl.png")\'',
    pb
)

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "w", encoding="utf-8") as f:
    f.write(pb)


# 3. Update floating-pebbles.tsx
with open("web/src/components/heros/visuals/floating-pebbles.tsx", "r", encoding="utf-8") as f:
    fp = f.read()

# Replace the white circle background with a large dark silhouette
fp = re.sub(
    r'<div className="absolute z-10 w-28 h-28 rounded-full bg-white shadow-\[0_0_40px_rgba\(255,255,255,0\.9\)\] flex items-center justify-center overflow-hidden">.*?</div>',
    """<div className="absolute z-10 w-64 h-80 flex items-end justify-center pointer-events-none mt-16">
          <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-[200px] object-contain scale-[1.25]" style={{ filter: 'brightness(0.58) contrast(1.2) saturate(0.8) hue-rotate(-8deg) drop-shadow(0 25px 40px rgba(0,0,0,.28))' }} />
        </div>""",
    fp,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/floating-pebbles.tsx", "w", encoding="utf-8") as f:
    f.write(fp)


# 4. Update aurora-blob.tsx
with open("web/src/components/heros/visuals/aurora-blob.tsx", "r", encoding="utf-8") as f:
    ab = f.read()

# Make the girl larger and darker
ab = re.sub(
    r'<div className="relative w-48 h-48 md:w-72 md:h-72 -mt-16 rounded-full flex items-center justify-center pointer-events-auto  overflow-hidden  group transition-transform duration-700 hover:scale-105">.*?</div>',
    """<div className="relative w-[300px] h-[450px] flex items-end justify-center pointer-events-none mt-16 group transition-transform duration-700 hover:scale-105">
          <img src="/main centre logo/girl.png" alt="ZenAuraa" className="w-[300px] object-contain" style={{ filter: 'brightness(0.58) contrast(1.2) saturate(0.8) hue-rotate(-8deg) drop-shadow(0 25px 40px rgba(0,0,0,.28))' }} />
        </div>""",
    ab,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/aurora-blob.tsx", "w", encoding="utf-8") as f:
    f.write(ab)
