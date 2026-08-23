import sys
import os

filepath = 'src/components/heros/hero.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("img: '/12-modalities-updates/breathwork.png'", "img: '/final_ensights/breathwork.png'")
content = content.replace("img: '/final_ensights/tarot.png',            label: 'Sound Healing'", "img: '/final_ensights/sound healing.png',            label: 'Sound Healing'")
content = content.replace("img: '/12-modalities-updates/spiritual.png'", "img: '/final_ensights/spiritual  guidance.png'")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

filepath = 'src/components/sections/explore-modalities.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("image: '/12-modalities-updates/breathwork.png'", "image: '/final_ensights/breathwork.png'")
content = content.replace("image: '/final_ensights/tarot.png'", "image: '/final_ensights/sound healing.png'") # Actually let's manually find and replace sound healing, or maybe I already did.
# In explore-modalities.tsx, I replaced the placeholders with tarot/astrology before. 
# So let's check explore-modalities directly using a different method to avoid destroying the actual tarot entry.

print("Done with hero.tsx")
