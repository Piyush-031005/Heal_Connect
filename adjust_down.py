import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Shift image further downwards: replace translate-y-8 with translate-y-24
    content = content.replace("translate-y-8", "translate-y-28")
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)