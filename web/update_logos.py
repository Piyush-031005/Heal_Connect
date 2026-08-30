import sys

import os
filepath = 'src/components/heros/hero.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace wheel items array
content = content.replace("img: '/12-modalities-updates/astrology.png'", "img: '/final_ensights/astrology.png'")
content = content.replace("img: '/12-modalities-updates/tarot.png'", "img: '/final_ensights/tarot.png'")
content = content.replace("img: '/12-modalities-updates/numerology.png'", "img: '/final_ensights/numerology.png'")
content = content.replace("img: '/12-modalities-updates/palmistry.png'", "img: '/final_ensights/palm reading.png'")
content = content.replace("img: '/12-modalities-updates/vastu.png'", "img: '/final_ensights/space harmony.png'")
content = content.replace("img: '/12-modalities-updates/yoga.png'", "img: '/final_ensights/medidation.png'")
content = content.replace("img: '/12-modalities-updates/meditation.png'", "img: '/final_ensights/medidation.png'")
content = content.replace("img: '/12-modalities-updates/reiki.png'", "img: '/final_ensights/chakra healing.png'")
content = content.replace("img: '/12-modalities-updates/dream.png'", "img: '/final_ensights/dream interpretetion.png'")
content = content.replace("img: '/12-modalities-updates/face.png'", "img: '/final_ensights/face reading.png'")
content = content.replace("img: '/12-modalities-updates/color.png'", "img: '/final_ensights/astrology.png'") # placeholder
content = content.replace("img: '/12-modalities-updates/sound.png'", "img: '/final_ensights/tarot.png'") # placeholder

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

filepath = 'src/components/sections/explore-modalities.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("image: '/12-modalities-updates/astrology.png'", "image: '/final_ensights/astrology.png'")
content = content.replace("image: '/12-modalities-updates/tarot.png'", "image: '/final_ensights/tarot.png'")
content = content.replace("image: '/12-modalities-updates/numerology.png'", "image: '/final_ensights/numerology.png'")
content = content.replace("image: '/12-modalities-updates/palmistry.png'", "image: '/final_ensights/palm reading.png'")
content = content.replace("image: '/12-modalities-updates/vastu.png'", "image: '/final_ensights/space harmony.png'")
content = content.replace("image: '/12-modalities-updates/yoga.png'", "image: '/final_ensights/medidation.png'")
content = content.replace("image: '/12-modalities-updates/meditation.png'", "image: '/final_ensights/medidation.png'")
content = content.replace("image: '/12-modalities-updates/reiki.png'", "image: '/final_ensights/chakra healing.png'")
content = content.replace("image: '/12-modalities-updates/dream.png'", "image: '/final_ensights/dream interpretetion.png'")
content = content.replace("image: '/12-modalities-updates/face.png'", "image: '/final_ensights/face reading.png'")
content = content.replace("image: '/12-modalities-updates/color.png'", "image: '/final_ensights/astrology.png'") # placeholder
content = content.replace("image: '/12-modalities-updates/sound.png'", "image: '/final_ensights/tarot.png'") # placeholder

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated logos")
