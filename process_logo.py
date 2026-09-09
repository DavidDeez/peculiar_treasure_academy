from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

input_path = r"C:\Users\hp\.gemini\antigravity\brain\15a58d8a-1253-438e-ad82-8b2f9da135e6\logo_concept_2_1788962524583.jpg"
output_path = r"C:\Users\hp\peculiar_treasure_academy\public\images\logo.png"

img = Image.open(input_path).convert("RGBA")

# Trim whitespace
trimmed_img = trim(img)

# Also make white background transparent just in case
datas = trimmed_img.getdata()
new_data = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

trimmed_img.putdata(new_data)
trimmed_img.save(output_path, "PNG")
print("Saved cropped and transparent logo to", output_path)
