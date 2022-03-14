"""
Pipeline script to automatically generate og images for documentation pages.
"""
import os
import html
import textwrap
from PIL import Image, ImageFont, ImageDraw

IMG_LOC = "img/og/"

template = Image.open(IMG_LOC + "og-template.png")


def write_page(img, title, submenu, subtitle):
    """Function to write page data onto og image template.

    Args:
        img (Image): Template image.
        title (str): Header for the og image (e.g. 'Documentation'.
        submenu (str): Section title to write.
        subtitle (str): Page title to write.

    Returns:
        None
    """
    title = html.unescape(title)
    submenu = html.unescape(submenu)
    subtitle = html.unescape(subtitle)
    print_subtitle = False
    if submenu != subtitle:
        print_subtitle = True
    submenu = textwrap.fill(submenu, width=22)
    subtitle = textwrap.fill(subtitle, width=18)
    font_path = "../../../python/alegreya-sans-ht-full-pack-ttf/"
    title_font = ImageFont.truetype(font_path + "AlegreyaSans-ExtraBold.ttf", 70)
    submenu_font = ImageFont.truetype(font_path + "AlegreyaSans-Bold.ttf", 50)
    subtitle_font = ImageFont.truetype(font_path + "AlegreyaSans-Regular.ttf", 50)
    image_editable = ImageDraw.Draw(img)
    yloc = 180
    ydist = 80
    xloc = 320
    xdist = 60
    image_editable.text((xloc, yloc), title, (56, 214, 17), font=title_font)
    image_editable.text(
        (xloc + xdist, yloc + ydist), submenu, (56, 214, 17), font=submenu_font
    )
    dist_n = submenu.count("\n")
    if print_subtitle:
        image_editable.multiline_text(
            (xloc + 2 * xdist, yloc + 2 * ydist + dist_n * 50),
            subtitle,
            (56, 214, 17),
            font=subtitle_font,
        )


def gen_image_info(file):
    """Collect image info from markdown frontmatter.

    Args:
        file (str): File path to read from.

    Returns:
        tuple[str]: Length 2 tuple containing page title and sub-menu.
    """
    with open(file, "r") as rfile:
        title = None
        sub_menu = None
        for _ in range(20):
            line = rfile.readline()
            if line.startswith("title:"):
                if "404" in line:
                    title = "404"
                else:
                    title = line.split("title: ")[1]
            if line.startswith("sub-menu:"):
                sub_menu = line.split("sub-menu: ")[1]

    return title, sub_menu


def gen_og_images():
    """Function to locate all documentation pages and generate og images.

    Returns:
        None
    """
    os.chdir("developers/weaviate/current")
    walk = [(w[0], w[2]) for w in os.walk(".")]
    new_img_loc = "../../../" + IMG_LOC
    for loc, files in walk:
        if loc == ".":
            continue
        loc_name = "-".join(loc.split("/")[1:])
        for file in files:
            name = file.split(".")[0]
            name = name.replace("_", "-")
            name = name.replace(" ", "-")
            img_info = gen_image_info(loc + "/" + file)
            img = template.copy()
            write_page(img, "Documentation", img_info[1], img_info[0])
            img.save(new_img_loc + "og-documentation/" + loc_name + "-" + name + ".jpg")


if __name__ == "__main__":
    gen_og_images()
