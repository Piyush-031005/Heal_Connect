from PIL import Image
import os
import glob

# Find the file
files = glob.glob(r'E:\HealConnect\Heal_Connect\new templete idea\ChatGPT*.png')
if not files:
    print("File not found.")
    exit()

img_path = files[0]
print("Processing:", img_path)

img = Image.open(img_path).convert("RGBA")
width, height = img.size

# 6 columns, 2 rows
col_w = width // 6
row_h = height // 2

# Output directory
out_dir = r'E:\HealConnect\Heal_Connect\web\public\zodiacs\red'
os.makedirs(out_dir, exist_ok=True)

# Colors: we want to keep red, make black transparent
# A simple way: alpha channel = max(R, G, B) or just luminance.
# Since it's red lines on black, R channel is a good indicator of opacity.
# So new Alpha = R. Then we can set color to pure red, or just keep original RGB and set Alpha = max(R,G,B).

count = 1
for row in range(2):
    for col in range(6):
        left = col * col_w
        top = row * row_h
        right = left + col_w
        bottom = top + row_h
        
        # Crop the card
        card = img.crop((left, top, right, bottom))
        
        # Make black transparent
        data = card.getdata()
        new_data = []
        for item in data:
            r, g, b, a = item
            # use lightness as alpha
            alpha = max(r, g, b)
            # Threshold to clean up background completely if it's very dark
            if alpha < 20:
                new_data.append((r, g, b, 0))
            else:
                # Enhance the red slightly and use alpha
                new_data.append((r, int(g*0.8), int(b*0.8), int(alpha * 1.2) if alpha * 1.2 < 255 else 255))
                
        card.putdata(new_data)
        
        card.save(os.path.join(out_dir, f'red_{count}.png'))
        count += 1

print("Done slicing 12 red cards.")
