import os
from PIL import Image

input_path = r"C:\Users\hp\.gemini\antigravity\brain\15a58d8a-1253-438e-ad82-8b2f9da135e6\.user_uploaded\media_1788347906616.png"
output_path = r"C:\Users\hp\peculiar_treasure_academy\public\images\whatsapp_3d.png"

img = Image.open(input_path)
img = img.convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    # change all white (also shades of white)
    # to transparent
    if item[0] > 220 and item[1] > 220 and item[2] > 220:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(output_path, "PNG")
print("Saved transparent image to", output_path)
