import re

with open("web/src/components/heros/visuals/light-particles.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the extra div at the end
fixed = content.replace("      </div>\n    </div>\n  );\n}", "    </div>\n  );\n}")

with open("web/src/components/heros/visuals/light-particles.tsx", "w", encoding="utf-8") as f:
    f.write(fixed)