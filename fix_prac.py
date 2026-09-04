import re

prac_path = "web/src/app/practitioners/page.tsx"
with open(prac_path, "r", encoding="utf-8", errors="ignore") as f:
    prac = f.read()

# Fix corrupted Star symbol
prac = re.sub(r'\?\s*\{filters\.minRating\}\+', r'&#9733; {filters.minRating}+', prac)

# Fix corrupted Rupee symbol in Max Rate badge
prac = re.sub(r'%\s*,1\{filters\.maxRate\}/min', r'&#8377; {filters.maxRate}/min', prac)

# Fix corrupted Rupee symbol in Max Rate label
prac = prac.replace('Max ?/min', 'Max &#8377;/min')

with open(prac_path, "w", encoding="utf-8") as f:
    f.write(prac)