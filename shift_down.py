import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Shift image downwards: replace -translate-y-16 with -translate-y-4
    new_content = content.replace("-translate-y-16", "-translate-y-4")
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(new_content)