import sys

filepath = 'web/src/components/sections/zen-cosmos-sections.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure useTheme is imported
if 'useTheme' not in content:
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\nimport { useTheme } from '@/components/theme-provider';")

if "const isNewColor = theme === 'theme-new-color';" not in content:
    content = content.replace(
        "export function YourNextDiscovery() {\n  const [hovered, setHovered] = useState<string | null>('explore');",
        "export function YourNextDiscovery() {\n  const { theme } = useTheme();\n  const isNewColor = theme === 'theme-new-color';\n  const [hovered, setHovered] = useState<string | null>('explore');"
    )

# Section background
content = content.replace(
    "style={{ background: 'linear-gradient(135deg, #EDF8FC 0%, #CDE9F4 40%, #9FD6EE 100%)' }}",
    "style={isNewColor ? { background: 'linear-gradient(135deg, #F7F3FC 0%, #F2ECFB 40%, #ECE4F7 100%)' } : { background: 'linear-gradient(135deg, #EDF8FC 0%, #CDE9F4 40%, #9FD6EE 100%)' }}"
)

# Text colors for titles and subtext
content = content.replace(
    "className=\"text-5xl mb-4 text-[#12527F]/15\"",
    "className={`text-5xl mb-4 ${isNewColor ? 'text-primary/15' : 'text-[#12527F]/15'}`}"
)
content = content.replace(
    "className=\"text-[10px] font-black uppercase tracking-[0.3em] text-[#1A92C6]\"",
    "className={`text-[10px] font-black uppercase tracking-[0.3em] ${isNewColor ? 'text-primary' : 'text-[#1A92C6]'}`}"
)
content = content.replace(
    "className=\"text-4xl md:text-6xl font-serif font-medium text-[#12527F]\"",
    "className={`text-4xl md:text-6xl font-serif font-medium ${isNewColor ? 'text-foreground' : 'text-[#12527F]'}`}"
)
content = content.replace(
    "className=\"text-[#17619A]/70 mt-4 text-base font-medium max-w-xl mx-auto\"",
    "className={`mt-4 text-base font-medium max-w-xl mx-auto ${isNewColor ? 'text-muted-foreground' : 'text-[#17619A]/70'}`}"
)

# Fix background of cards inside YourNextDiscovery
content = content.replace(
    "className={`relative rounded-[2.5rem] p-8 md:p-12 transition-all duration-700 overflow-hidden ${isHov ? 'bg-white shadow-2xl scale-[1.02] -translate-y-2' : 'bg-white/40 hover:bg-white/60'}`}",
    "className={`relative rounded-[2.5rem] p-8 md:p-12 transition-all duration-700 overflow-hidden ${isHov ? 'bg-white shadow-2xl scale-[1.02] -translate-y-2' : (isNewColor ? 'bg-white/60 hover:bg-white/80 border border-primary/10' : 'bg-white/40 hover:bg-white/60')}`}"
)

# Fix text inside cards
content = content.replace(
    "className={`font-black text-[10px] tracking-[0.2em] uppercase mb-4 ${isHov ? 'text-[#1A92C6]' : 'text-[#12527F]/50'}`}",
    "className={`font-black text-[10px] tracking-[0.2em] uppercase mb-4 ${isHov ? (isNewColor ? 'text-primary' : 'text-[#1A92C6]') : (isNewColor ? 'text-muted-foreground' : 'text-[#12527F]/50')}`}"
)
content = content.replace(
    "className={`font-serif text-3xl mb-4 transition-colors ${isHov ? 'text-[#12527F]' : 'text-[#17619A]'}`}",
    "className={`font-serif text-3xl mb-4 transition-colors ${isHov ? 'text-foreground' : (isNewColor ? 'text-foreground/80' : 'text-[#17619A]')}`}"
)
content = content.replace(
    "className={`text-sm leading-relaxed ${isHov ? 'text-[#17619A]' : 'text-[#12527F]/60'}`}",
    "className={`text-sm leading-relaxed ${isHov ? (isNewColor ? 'text-muted-foreground' : 'text-[#17619A]') : (isNewColor ? 'text-muted-foreground/70' : 'text-[#12527F]/60')}`}"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated zen-cosmos-sections.tsx for YourNextDiscovery')
