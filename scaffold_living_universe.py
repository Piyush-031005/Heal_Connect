import os

components = [
    "hero.tsx",          # Section 1: Magical Opening
    "about.tsx",         # Section 2: Constellations
    "zodiac-wheel.tsx",  # Section 3: Zodiac Wheel
    "services.tsx",      # Section 4: Tarot Divination
    "features.tsx",      # Section 5: Aura Reading
    "experts.tsx",       # Section 6: Astrologers (Constellations)
    "horoscope.tsx",     # Section 7: Daily Horoscope
    "compatibility.tsx", # Section 8: Compatibility Engine
    "numerology.tsx",    # Section 9: Numerology
    "birth-chart.tsx",   # Section 10: Birth Chart
    "healing.tsx",       # Section 11: Healing Sanctuary
    "testimonials.tsx",  # Section 12: Cosmic River of reviews
    "pricing.tsx",       # Section 13: Holographic Pricing
    "faq.tsx",           # Section 14: Accordions
    "footer.tsx",        # Section 15: Deep Space Void
    "navigation.tsx",
    "page.tsx"
]

base_dir = "e:/HealConnect/Heal_Connect/web/src/components/experiences/living-universe"
os.makedirs(base_dir, exist_ok=True)

for comp in components:
    filepath = os.path.join(base_dir, comp)
    if not os.path.exists(filepath):
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"// {comp} placeholder\n")

print("Scaffolded living-universe structure")
