import sys

filepath = 'web/src/components/sections/explore-modalities.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make the icons solid color so they are visible
content = content.replace(
    'className="w-full h-full object-contain rounded-full brightness-90 group-hover:brightness-110 transition-all"',
    'className={`w-full h-full object-contain rounded-full transition-all ${isNewColor ? "brightness-0 opacity-60 group-hover:opacity-100 group-hover:brightness-0" : "brightness-90 group-hover:brightness-110"}`}'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated explore-modalities.tsx image classes')
