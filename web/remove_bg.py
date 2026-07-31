import os
import sys

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("Installing rembg...")
    os.system(f"{sys.executable} -m pip install rembg onnxruntime")
    from rembg import remove
    from PIL import Image

def process(input_path, output_path):
    print(f"Processing {input_path}")
    try:
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.save(output_path, "PNG")
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

base_dir = r"C:\Users\Piyush Punera\.gemini\antigravity-ide\brain\7d7733c9-b502-438f-b4ab-d441930c2b3c"
out_dir = r"e:\HealConnect\Heal_Connect\web\public\custom"
os.makedirs(out_dir, exist_ok=True)

files = [
    "media__1785509139670.png",
    "media__1785509202085.png",
    "media__1785509231887.png"
]

out_names = ["mystic_hand.png", "sagittarius.png", "virgo.png"]

for f, o in zip(files, out_names):
    in_p = os.path.join(base_dir, f)
    out_p = os.path.join(out_dir, o)
    if os.path.exists(in_p):
        process(in_p, out_p)
    else:
        print(f"File not found: {in_p}")

print("Done!")
