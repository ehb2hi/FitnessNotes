import os
from PIL import Image
from tkinter import filedialog, Tk, messagebox

def select_folder(title):
    return filedialog.askdirectory(title=title)

def reduce_png_size(input_path, output_path, resize_max_width=None):
    image = Image.open(input_path).convert("RGBA")

    # Optional resize
    if resize_max_width and image.width > resize_max_width:
        w_percent = resize_max_width / float(image.width)
        h_size = int((float(image.height) * w_percent))
        image = image.resize((resize_max_width, h_size), Image.LANCZOS)

    # Save with optimization (overwrite or save new)
    image.save(output_path, optimize=True)

def main():
    root = Tk()
    root.withdraw()

    input_dir = select_folder("Select folder with PNG images")
    if not input_dir:
        return

    output_dir = select_folder("Select folder to save optimized PNGs")
    if not output_dir:
        return

    same_folder = os.path.samefile(input_dir, output_dir)

    png_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.png')]
    if not png_files:
        messagebox.showinfo("Done", "No PNG files found.")
        return

    for f in png_files:
        input_path = os.path.join(input_dir, f)
        output_path = input_path if same_folder else os.path.join(output_dir, f)
        reduce_png_size(input_path, output_path, resize_max_width=512)
        print(f"Optimized: {f}")

    messagebox.showinfo("Done", f"Processed {len(png_files)} image(s).")

if __name__ == "__main__":
    main()
