import os

def replace_in_file(filepath, replacements):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in replacements:
            content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed to update {filepath}: {e}")

# 1. globals.css
replace_in_file("web/src/app/globals.css", [
    ("#2B2D31", "#240E4E"), # Grey to Dark Purple
    ("#9bc9d5", "#FAD058")  # Light Blue to Yellow/Gold
])

# 2. expert dashboard
replace_in_file("web/src/app/expert/dashboard/page.tsx", [
    ("bg-gradient-to-r from-primary/20 via-primary/10 to-transparent", "bg-gradient-to-r from-[#301368] via-[#5F3BA9] to-[#D5B6DC] text-white"),
    ('text-foreground">Hello, {firstName}', 'text-white">Hello, {firstName}'),
    ('bg-gradient-to-r from-white/5 to-white/10', 'bg-gradient-to-r from-[#301368] via-[#5F3BA9] to-[#D5B6DC]'),
    ('text-muted-foreground text-sm mt-2', 'text-white/80 text-sm mt-2')
])

# 3. Navbar
replace_in_file("web/src/components/navbar.tsx", [
    ("#9bc9d5", "#FAD058"),
    ('text-purple-300">Auraa', 'text-[#D5B6DC]">Auraa'),
    ('text-[#2D1B69]', 'text-[#1C0D40]') # make darker
])

# 4. Other components
replace_in_file("web/src/components/optical-wheel.tsx", [("#9bc9d5", "#5F3BA9")])
replace_in_file("web/src/components/heros/visuals/aurora-blob.tsx", [("#9bc9d5", "#5F3BA9")])
replace_in_file("web/src/components/heros/visuals/light-particles.tsx", [("#9bc9d5", "#D5B6DC")])
replace_in_file("web/src/components/heros/visuals/lotus-petals.tsx", [("#9bc9d5", "#D5B6DC")])
replace_in_file("web/src/components/heros/visuals/meditation-mudras.tsx", [("#9bc9d5", "#D5B6DC")])
replace_in_file("web/src/components/sections/final-hybrid-experts.tsx", [("#2B2D31", "#1E1144")])
replace_in_file("web/src/app/page.tsx", [("#9bc9d5", "#D5B6DC")])
