import glob
import re
import os

# Recursively find all tsx files
files = []
for root, dirs, filenames in os.walk("web/src"):
    for filename in filenames:
        if filename.endswith(".tsx"):
            files.append(os.path.join(root, filename))

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # Replace orange and amber tailwind classes with purple and indigo
    # Using a clever regex to only replace the color names if they are part of a standard tailwind class
    # e.g., bg-orange-500, text-amber-400, border-orange-200, from-orange-300, to-amber-500, etc.
    
    # We will replace:
    # orange -> purple
    # amber -> indigo
    
    # Simple replace is usually safe for Tailwind colors, but let's just make sure it's surrounded by a hyphen or quote
    
    # First, let's just do a naive replace of orange and amber in classNames
    content = content.replace("orange", "purple")
    content = content.replace("amber", "indigo")
    
    # Also if there are any specific bg-[#F59E0B] hex colors, replace them with our purple #694091 or indigo #4F46E5
    content = content.replace("#f97316", "#694091") # orange-500
    content = content.replace("#fb923c", "#8b5cf6") # orange-400
    content = content.replace("#f59e0b", "#4f46e5") # amber-500
    content = content.replace("#fbbf24", "#6366f1") # amber-400
    content = content.replace("#fff7ed", "#f3e8ff") # orange-50
    content = content.replace("#fef3c7", "#e0e7ff") # amber-100

    if original != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)