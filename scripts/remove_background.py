import os
from rembg import remove
from PIL import Image
import tkinter as tk
from tkinter import filedialog, messagebox

def select_input_folder():
    return filedialog.askdirectory(title="Select Input Folder")

def select_output_folder():
    return filedialog.askdirectory(title="Select Output Folder")

def remove_backgrounds(input_folder, output_folder):
    jpg_files = [f for f in os.listdir(input_folder) if f.lower().endswith('.png')]
    if not jpg_files:
        messagebox.showwarning("No JPGs Found", "No .png images found in the selected folder.")
        return

    for filename in jpg_files:
        input_path = os.path.join(input_folder, filename)
        output_filename = os.path.splitext(filename)[0] + '.png'
        output_path = os.path.join(output_folder, output_filename)

        with open(input_path, 'rb') as inp_file:
            input_data = inp_file.read()
            output_data = remove(input_data)

        with open(output_path, 'wb') as out_file:
            out_file.write(output_data)

    messagebox.showinfo("Done", f"Removed background from {len(jpg_files)} image(s).")

# === GUI App ===
def run_gui():
    root = tk.Tk()
    root.withdraw()  # Hide root window

    input_folder = select_input_folder()
    if not input_folder:
        return

    output_folder = select_output_folder()
    if not output_folder:
        return

    remove_backgrounds(input_folder, output_folder)

if __name__ == "__main__":
    run_gui()
