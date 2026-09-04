import os

filepath = "web/src/app/signup/page.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        '<div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans relative overflow-hidden">',
        '<div className="min-h-screen bg-gradient-to-br from-[#301368] via-[#5F3BA9] to-[#D5B6DC] text-white flex flex-col md:flex-row font-sans relative overflow-hidden">'
    ),
    (
        '<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">\n        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,180,107,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />\n        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(46,196,182,0.1)_0%,rgba(0,0,0,0)_70%)] blur-[120px]" />\n      </div>',
        ''
    ),
    (
        '<span className="text-2xl font-extrabold text-foreground tracking-wide uppercase">ZenAuraa</span>',
        '<span className="text-2xl font-extrabold text-white tracking-wide uppercase">ZenAuraa</span>'
    ),
    (
        '<h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">\n            Begin your journey <br /> <span className="text-primary">to inner peace.</span>\n          </h1>',
        '<h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">\n            Begin your journey <br /> <span className="text-[#FAD058]">to inner peace.</span>\n          </h1>'
    ),
    (
        '<p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-12">',
        '<p className="text-lg text-white/90 max-w-md leading-relaxed mb-12">'
    ),
    (
        '<p className="text-foreground font-semibold text-lg tracking-wide">100% Private & Secure</p>',
        '<p className="text-white font-semibold text-lg tracking-wide">100% Private & Secure</p>'
    ),
    (
        '<p className="text-sm text-muted-foreground mt-1">Your data and conversations are encrypted.</p>',
        '<p className="text-sm text-white/80 mt-1">Your data and conversations are encrypted.</p>'
    ),
    (
        '<p className="text-foreground font-semibold text-lg tracking-wide">Verified Experts</p>',
        '<p className="text-white font-semibold text-lg tracking-wide">Verified Experts</p>'
    ),
    (
        '<p className="text-sm text-muted-foreground mt-1">Rigorous 5-step background checks.</p>',
        '<p className="text-sm text-white/80 mt-1">Rigorous 5-step background checks.</p>'
    ),
    (
        "role === 'user' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(214,180,107,0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'",
        "role === 'user' ? 'bg-[#5F3BA9] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'"
    ),
    (
        "role === 'expert' ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(214,180,107,0.4)]' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'",
        "role === 'expert' ? 'bg-[#5F3BA9] text-white shadow-lg' : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'"
    ),
    (
        '<Button type="submit" disabled={loading || !!success} className="w-full h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300">',
        '<Button type="submit" disabled={loading || !!success} className="w-full py-6 text-base font-bold rounded-md border-0 shadow-lg transition-all duration-300 bg-[#FAD058] hover:bg-[#F0C240] text-[#2A1658]">'
    ),
    (
        '<div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(46,196,182,0.2)]">\n                <ShieldCheck className="w-6 h-6 text-accent" />\n              </div>',
        '<div className="w-12 h-12 rounded-full bg-white/10 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(214,180,107,0.2)]">\n                <ShieldCheck className="w-6 h-6 text-[#FAD058]" />\n              </div>'
    ),
    (
        '<div className="w-12 h-12 rounded-full bg-white/5 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(214,180,107,0.2)]">\n                <Star className="w-6 h-6 text-primary" />\n              </div>',
        '<div className="w-12 h-12 rounded-full bg-white/10 border border-border flex items-center justify-center shadow-[0_0_15px_rgba(214,180,107,0.2)]">\n                <Star className="w-6 h-6 text-[#FAD058]" />\n              </div>'
    )
]

for old, new in replacements:
    content = content.replace(old, new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated {filepath}")