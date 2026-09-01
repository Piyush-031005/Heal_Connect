import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Add a strong text shadow and make the text completely opaque
    content = content.replace("text-[#1E2059]/90", "text-[#1E2059] font-black drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]")
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)