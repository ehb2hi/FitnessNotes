import os
import torch
import cv2
import numpy as np
from PIL import Image
from tkinter import filedialog, Tk, messagebox
from torchvision import transforms
from ...MODNet.src.models.modnet import MODNet

# Load MODNet once
def load_modnet():
    model = MODNet(backbone='mobilenetv2')
    state_dict = torch.load('pretrained/modnet_photographic_portrait_matting.ckpt', map_location='cpu')
    model.load_state_dict(state_dict)
    model.eval()
    return model

# Preprocess image
def preprocess(image):
    im = image.convert('RGB')
    im = im.resize((512, 512), Image.BILINEAR)
    im_np = np.array(im) / 255.0
    im_tensor = transforms.ToTensor()(im_np.astype(np.float32))
    return im_tensor.unsqueeze(0), im.size

# Post-process alpha matte
def postprocess(alpha, orig_size):
    alpha_np = alpha.squeeze().detach().cpu().numpy()
    alpha_np = cv2.resize(alpha_np, orig_size, interpolation=cv2.INTER_LINEAR)
    return (alpha_np * 255).astype(np.uint8)

# Apply MODNet to image and save output
def process_image(image_path, output_path, model):
    orig = Image.open(image_path)
    input_tensor, orig_size = preprocess(orig)

    with torch.no_grad():
        _, _, matte = model(input_tensor, True)

    alpha = postprocess(matte, orig.size)

    # Combine with original image
    orig_rgba = orig.convert("RGBA")
    alpha_img = Image.fromarray(alpha).convert("L")
    orig_rgba.putalpha(alpha_img)
    orig_rgba.save(output_path)

def gui_select_folder(title):
    return filedialog.askdirectory(title=title)

def main():
    model = load_modnet()
    root = Tk()
    root.withdraw()

    input_dir = gui_select_folder("Select input folder with JPGs")
    if not input_dir:
        return

    output_dir = gui_select_folder("Select output folder for transparent PNGs")
    if not output_dir:
        return

    jpg_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.png')]
    if not jpg_files:
        messagebox.showinfo("Done", "No JPG images found.")
        return

    for filename in jpg_files:
        input_path = os.path.join(input_dir, filename)
        output_name = os.path.splitext(filename)[0] + '.png'
        output_path = os.path.join(output_dir, output_name)
        print(f"Processing: {filename}")
        process_image(input_path, output_path, model)

    messagebox.showinfo("Done", f"Processed {len(jpg_files)} image(s).")

if __name__ == '__main__':
    main()
