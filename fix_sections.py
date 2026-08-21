import sys

filepath = 'web/src/components/sections/final-hybrid-experts.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add useTheme
if 'useTheme' not in content:
    content = content.replace("import { ChevronRight } from 'lucide-react';", "import { ChevronRight } from 'lucide-react';\nimport { useTheme } from '@/components/theme-provider';")
    content = content.replace("export function FinalHybridExperts() {", "export function FinalHybridExperts() {\n  const { theme } = useTheme();\n  const isNewColor = theme === 'theme-new-color';")

# Section background
content = content.replace("style={{ background: 'linear-gradient(135deg, #B79AE6 0%, #7A48AB 50%, #694091 100%)' }}", "style={isNewColor ? { background: 'linear-gradient(135deg, #F7F3FC 0%, #F2ECFB 45%, #ECE4F7 100%)' } : { background: 'linear-gradient(135deg, #B79AE6 0%, #7A48AB 50%, #694091 100%)' }}")

# Title colors
content = content.replace("className=\"text-4xl md:text-5xl font-serif font-medium text-[#F8F7FA]\"", "className={`text-4xl md:text-5xl font-serif font-medium ${isNewColor ? 'text-foreground' : 'text-[#F8F7FA]'}`}")

# Card background
content = content.replace("className=\"bg-[#2A164B] border border-[#7A48AB]/30 rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all shadow-xl hover:shadow-[0_20px_40px_rgba(42,22,75,0.4)]\"", "className={`${isNewColor ? 'bg-white border-primary/20 shadow-sm' : 'bg-[#2A164B] border-[#7A48AB]/30 shadow-xl'} border rounded-3xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all hover:shadow-[0_20px_40px_rgba(42,22,75,0.4)]`}")

# Name colors
content = content.replace("className=\"font-serif text-xl text-white group-hover:text-[#B79AE6] transition-colors\"", "className={`font-serif text-xl group-hover:text-[#B79AE6] transition-colors ${isNewColor ? 'text-foreground' : 'text-white'}`}")

# View All Experts text
content = content.replace("className=\"text-[#F8F7FA]/80 hover:text-white transition-colors flex items-center gap-2\"", "className={`transition-colors flex items-center gap-2 ${isNewColor ? 'text-primary hover:text-primary/80' : 'text-[#F8F7FA]/80 hover:text-white'}`}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated final-hybrid-experts.tsx")
