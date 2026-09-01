import re
import glob

components = glob.glob("web/src/components/heros/visuals/*.tsx")

for comp in components:
    with open(comp, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace className="absolute w-[800px] h-[800px] max-w-none object-cover scale-[1.3] -translate-y-24"
    # With className="absolute w-[700px] h-[700px] max-w-none object-cover scale-[1.05] -translate-y-16"
    
    old_class = 'className="absolute w-[800px] h-[800px] max-w-none object-cover scale-[1.3] -translate-y-24"'
    new_class = 'className="absolute w-[750px] h-[750px] max-w-none object-cover scale-[1.0] -translate-y-16"'
    
    content = content.replace(old_class, new_class)
    
    with open(comp, "w", encoding="utf-8") as f:
        f.write(content)