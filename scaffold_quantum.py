import os

components = [
    "hero.tsx",
    "webgl-canvas.tsx",
    "features.tsx",
    "data-viz.tsx",
    "footer.tsx",
    "page.tsx"
]

base_dir = "e:/HealConnect/Heal_Connect/web/src/components/experiences/ai-future"
os.makedirs(base_dir, exist_ok=True)

for comp in components:
    filepath = os.path.join(base_dir, comp)
    if not os.path.exists(filepath):
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"// {comp} placeholder\n")

print("Scaffolded ai-future structure")
