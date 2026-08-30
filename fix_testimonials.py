import sys

filepath = 'web/src/components/sections/testimonials.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure useTheme is imported
if 'useTheme' not in content:
    content = content.replace("import { useLayout } from '@/lib/layout-context';", "import { useLayout } from '@/lib/layout-context';\nimport { useTheme } from '@/components/theme-provider';")

if "const isNewColor = theme === 'theme-new-color';" not in content:
    content = content.replace(
        "const { layout } = useLayout();",
        "const { layout } = useLayout();\n  const { theme } = useTheme();\n  const isNewColor = theme === 'theme-new-color';"
    )

# Disable the dark background if isNewColor
content = content.replace(
    "className={`py-24 relative z-10 ${isFinalHybrid ? 'bg-fixed bg-center bg-cover border-none' : 'bg-card border-t border-border'}`}",
    "className={`py-24 relative z-10 ${(isFinalHybrid && !isNewColor) ? 'bg-fixed bg-center bg-cover border-none' : (isNewColor ? 'bg-background border-t border-primary/20' : 'bg-card border-t border-border')}`}"
)

content = content.replace(
    "style={isFinalHybrid ? { backgroundImage: \"url('/hands-star-bg.png')\" } : {}}",
    "style={(isFinalHybrid && !isNewColor) ? { backgroundImage: \"url('/hands-star-bg.png')\" } : {}}"
)

content = content.replace(
    "{isFinalHybrid && <div className=\"absolute inset-0 bg-[#4D316B]/80 backdrop-blur-[2px] z-0\" />}",
    "{(isFinalHybrid && !isNewColor) && <div className=\"absolute inset-0 bg-[#4D316B]/80 backdrop-blur-[2px] z-0\" />}"
)

# Fix header texts if needed. Since they use `text-foreground`, they might be dark in light theme (which is correct). But in the original isFinalHybrid they were supposed to be white!
# Wait, if they were dark purple in the screenshot, it's because text-foreground is dark purple.
# In original FinalHybrid with dark background, they should have been white. Let's fix that for !isNewColor.
content = content.replace(
    "className=\"text-4xl md:text-5xl font-serif font-medium mb-4 text-foreground\"",
    "className={`text-4xl md:text-5xl font-serif font-medium mb-4 ${(isFinalHybrid && !isNewColor) ? 'text-white' : 'text-foreground'}`}"
)

content = content.replace(
    "className=\"text-muted-foreground text-lg\"",
    "className={`text-lg ${(isFinalHybrid && !isNewColor) ? 'text-white/80' : 'text-muted-foreground'}`}"
)

# Fix card background
content = content.replace(
    "className={`w-[280px] md:w-[400px] shrink-0 snap-start rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border hover:-translate-y-1 transition-all duration-500 group flex flex-col ${isFinalHybrid ? 'bg-[#7A48AB]/40 backdrop-blur-xl border-[#694091] shadow-xl hover:bg-[#7A48AB]/60 hover:border-[#B79AE6]/50' : 'bg-background border-border shadow-sm hover:shadow-lg hover:border-primary/30'}`}",
    "className={`w-[280px] md:w-[400px] shrink-0 snap-start rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border hover:-translate-y-1 transition-all duration-500 group flex flex-col ${(isFinalHybrid && !isNewColor) ? 'bg-[#7A48AB]/40 backdrop-blur-xl border-[#694091] shadow-xl hover:bg-[#7A48AB]/60 hover:border-[#B79AE6]/50' : 'bg-white border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40'}`}"
)

# Fix text inside cards
content = content.replace(
    "className=\"text-foreground/80 leading-relaxed font-light mb-6 md:mb-8 flex-1 text-sm md:text-lg\"",
    "className={`leading-relaxed font-light mb-6 md:mb-8 flex-1 text-sm md:text-lg ${(isFinalHybrid && !isNewColor) ? 'text-white/90' : 'text-foreground/80'}`}"
)

content = content.replace(
    "className=\"font-bold text-foreground text-sm\"",
    "className={`font-bold text-sm ${(isFinalHybrid && !isNewColor) ? 'text-white' : 'text-foreground'}`}"
)

content = content.replace(
    "className=\"text-muted-foreground text-xs uppercase tracking-wider mt-0.5\"",
    "className={`text-xs uppercase tracking-wider mt-0.5 ${(isFinalHybrid && !isNewColor) ? 'text-white/70' : 'text-muted-foreground'}`}"
)

# Fix Global Impact label
content = content.replace(
    "className=\"text-[10px] font-black uppercase tracking-[0.3em] text-[#B79AE6]\"",
    "className={`text-[10px] font-black uppercase tracking-[0.3em] ${(isFinalHybrid && !isNewColor) ? 'text-[#B79AE6]' : 'text-primary'}`}"
)

content = content.replace(
    "className=\"w-8 h-[2px] bg-[#B79AE6]\"",
    "className={`w-8 h-[2px] ${(isFinalHybrid && !isNewColor) ? 'bg-[#B79AE6]' : 'bg-primary'}`}"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated testimonials.tsx')
