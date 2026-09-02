nav_path = "web/src/components/navbar.tsx"
with open(nav_path, "r", encoding="utf-8") as f:
    nav = f.read()

# Fix syntax error from escaped quotes
nav = nav.replace("\\'", "'")

with open(nav_path, "w", encoding="utf-8") as f:
    f.write(nav)