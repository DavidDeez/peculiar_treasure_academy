import os
from PIL import Image
import glob

image_dir = 'public/images'
for filepath in glob.glob(os.path.join(image_dir, '*.jpg')):
    filename = os.path.basename(filepath)
    name, ext = os.path.splitext(filename)
    webp_path = os.path.join(image_dir, f"{name}.webp")
    print(f"Converting {filename} to {name}.webp")
    with Image.open(filepath) as img:
        img.save(webp_path, 'webp', quality=80)
    # Remove original jpg to force us to update the links
    os.remove(filepath)
    
print("All images converted to WebP.")
