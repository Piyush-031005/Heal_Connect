import re

login_path = "web/src/app/login/page.tsx"
with open(login_path, "r", encoding="utf-8", errors="ignore") as f:
    login = f.read()

# Fix Back to login arrow
login = login.replace("+? Back to login", "&larr; Back to login")
login = login.replace("+? Back to login", "&larr; Back to login")

# Fix Copyright symbol
login = login.replace("Ac 2026", "&copy; 2026")

# Fix Password dots (which got corrupted)
login = login.replace('placeholder=""', 'placeholder="********"')

# Remove any stray replacement characters like 
login = login.replace("", "")

with open(login_path, "w", encoding="utf-8") as f:
    f.write(login)