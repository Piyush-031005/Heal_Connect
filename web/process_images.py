import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Installing...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

def process_image(filepath):
    print(f"Processing {filepath}...")
    img = Image.open(filepath).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        luminance = 0.299 * r + 0.587 * g + 0.114 * b
        
        if luminance > 25:
            alpha = int(min(255, luminance * 2.0))
            new_data.append((214, 180, 107, alpha))
        else:
            new_data.append((214, 180, 107, 0))
            
    img.putdata(new_data)
    img.save(filepath, "PNG")

directory = r"e:\HealConnect\Heal_Connect\web\public\zodiac"
for filename in os.listdir(directory):
    if filename.endswith(".png"):
        process_image(os.path.join(directory, filename))

print("Done processing all images!")
