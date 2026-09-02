import os
from PIL import Image

image_path = r"C:\Users\hp\peculiar_treasure_academy\public\images\whatsapp_3d.png"

img = Image.open(image_path)
img = img.convert("RGBA")
datas = img.getdata()

# A much more vibrant, brighter green
target_color = (0, 220, 80)

new_data = []
for item in datas:
    # item is (R, G, B, A)
    # Since it's a black line art on transparent, the non-transparent pixels are mostly black/gray.
    # Let's replace any pixel that is not fully transparent with the green color, 
    # but keep its original alpha channel so anti-aliasing remains smooth.
    if item[3] > 0:
        # It's part of the line art.
        # We can just tint it green. If it's pure black, we make it pure green.
        # If it has some transparency, we keep the transparency.
        # Actually, since it might be anti-aliased gray, replacing RGB entirely with green works best.
        new_data.append((target_color[0], target_color[1], target_color[2], item[3]))
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(image_path, "PNG")
print("Recolored to green:", image_path)
