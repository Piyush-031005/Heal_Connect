import re

hero_path = "web/src/components/heros/new-layouts-hero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

# Replace the first button to match the second one with a new lighter yellow #FAD058
old_chat_btn = """              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#F5C84C] bg-[#F5C84C]/10 hover:bg-[#F5C84C]/20 text-[#F5C84C] text-sm font-semibold transition-all">"""
new_chat_btn = """              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FAD058] hover:bg-[#F0C240] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#FAD058]/20">"""
hero = hero.replace(old_chat_btn, new_chat_btn)

old_call_btn = """              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#F5C84C] hover:bg-[#E5B83C] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#F5C84C]/20">"""
new_call_btn = """              <button className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FAD058] hover:bg-[#F0C240] text-[#2A1658] text-sm font-bold transition-all shadow-lg shadow-[#FAD058]/20">"""
hero = hero.replace(old_call_btn, new_call_btn)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)