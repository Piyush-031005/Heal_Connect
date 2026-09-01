import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Shift image downwards: replace -translate-y-4 with translate-y-8
    content = content.replace("-translate-y-4", "translate-y-8")
    
    # Make rotating names darker: replace text-[#1E2059]/60 with text-[#1E2059]/90
    content = content.replace("text-[#1E2059]/60", "text-[#1E2059]/90")
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)