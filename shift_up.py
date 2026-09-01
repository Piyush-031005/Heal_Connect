import re

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "r", encoding="utf-8") as f:
    pb = f.read()

# Floor shadow
pb = re.sub(r'bottom-\[20px\]', 'bottom-[120px]', pb)

# Lotus Glow missing positioning, let's center it
pb = re.sub(
    r'<div className="absolute w-\[700px\] h-\[700px\] opacity-70 blur-\[80px\] mix-blend-screen"',
    '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-70 blur-[80px] mix-blend-screen"',
    pb
)

# Lotus group and magic formula petals
pb = re.sub(r'bottom-\[150px\]', 'bottom-[250px]', pb)

# Girl image container
pb = re.sub(r'bottom-\[50px\]', 'bottom-[150px]', pb)

# Let's also check Modalities circle. It is `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`.
# But wait, it's rotating. It looks centered on the whole right pane.

with open("web/src/components/heros/visuals/peacock-bloom.tsx", "w", encoding="utf-8") as f:
    f.write(pb)