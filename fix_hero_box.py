import re

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "r", encoding="utf-8") as f:
    pb = f.read()

# 1. Remove the problematic Layer 8 entirely (which causes the box)
pb = re.sub(
    r'\{\/\* Layer 8: Color Matching Overlay \*\/}.*?\}\} \/>',
    '',
    pb,
    flags=re.DOTALL
)

# 2. Make the lotus design larger (1.3 -> 1.7)
pb = re.sub(
    r'scale-\[1\.3\]',
    'scale-[1.7]',
    pb
)
pb = re.sub(
    r'animate=\{\{ scale: \[1\.3, 1\.32, 1\.3\]',
    'animate={{ scale: [1.7, 1.72, 1.7]',
    pb
)

# 3. Make the girl larger (350px -> 420px)
pb = re.sub(
    r'w-\[400px\] h-\[550px\]',
    'w-[500px] h-[650px]',
    pb
)
pb = re.sub(
    r'w-\[350px\] object-contain',
    'w-[420px] object-contain',
    pb
)

# 4. Remove the background floor reflection which might also cause a box if it fails
pb = re.sub(
    r'\{\/\* Layer 10: Reflection Floor \*\/}.*?<\/div>',
    '',
    pb,
    flags=re.DOTALL
)

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "w", encoding="utf-8") as f:
    f.write(pb)


# Also move everything even higher up in new-layouts-hero.tsx
with open("web/src/components/heros/new-layouts-hero.tsx", "r", encoding="utf-8") as f:
    hero = f.read()

hero = re.sub(
    r'pt-16 pb-16 lg:pt-24 lg:pb-32',
    'pt-8 pb-12 lg:pt-12 lg:pb-20',
    hero
)

with open("web/src/components/heros/new-layouts-hero.tsx", "w", encoding="utf-8") as f:
    f.write(hero)
