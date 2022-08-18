"""
Pipeline script to automatically generate og images for documentation pages.
"""
import os
import html
import textwrap
from PIL import Image, ImageFont, ImageDraw

IMG_LOC = "img/og/"

template = Image.open(IMG_LOC + "og-template.png")


def write_page(img, title, submenu, subtitle, font_path):
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
    submenu = textwrap.fill(submenu, width=26)
    subtitle = textwrap.fill(subtitle, width=38)
    title_font = ImageFont.truetype(font_path + "AlegreyaSans-Regular.ttf", 50)
    submenu_font = ImageFont.truetype(font_path + "AlegreyaSans-Regular.ttf", 50)
    subtitle_font = ImageFont.truetype(font_path + "AlegreyaSans-ExtraBold.ttf", 64)
    image_editable = ImageDraw.Draw(img)
    xloc = 320
    xdist = 160
    image_editable.text((112, 180), title + '  >', (255, 255, 255), font=title_font)
    image_editable.text(
        (xloc + xdist, 180), submenu, (255, 255, 255), font=submenu_font
    )
    if print_subtitle:
        image_editable.multiline_text(
            (112, 244),
            subtitle,
            (255, 255, 255),
            font=subtitle_font,
        )


def gen_image_info(file, filetype):
    """Collect image info from markdown frontmatter.

    Args:
        file (str): File path to read from.

    Returns:
        tuple[str]: Length 2 tuple containing page title and sub-menu.
    """
    if filetype == "documentation":
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
    if filetype == "blog":
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
                if line.startswith("author:"):
                    sub_menu = line.split("author: ")[1]
        return title, sub_menu
    return None, None


def gen_og_doc_images():
    """Function to locate all documentation pages and generate og images.
    For the DOCS

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
            img_info = gen_image_info(loc + "/" + file, "documentation")
            img = template.copy()
            write_page(img, "Documentation", img_info[1], img_info[0], "../../../_python/alegreya-sans-ht-full-pack-ttf/")
            if not os.path.exists(new_img_loc + "og-documentation"):
                os.mkdir(new_img_loc + "og-documentation")
            rgb_im = img.convert('RGB')
            rgb_im.save(new_img_loc + "og-documentation/" + loc_name + "-" + name + ".jpg", dpi=(600, 600))

def gen_og_blog_images():
    """Function to locate all documentation pages and generate og images.
    For the DOCS

    Returns:
        None
    """
    os.chdir("_posts/blog")
    walk = [(w[0], w[2]) for w in os.walk(".")]
    new_img_loc = "../../" + IMG_LOC
    for loc, files in walk:
        loc_name = "-".join(loc.split("/")[1:])
        for file in files:
            if file[0] == ".":
                continue
            name = file.split(".")[0]
            name = name.replace("_", "-")
            name = name.replace(" ", "-")
            name = name[11:]
            img_info = gen_image_info(loc + "/" + file, "blog")
            img = template.copy()
            write_page(img, "Blog", ' ', img_info[0], "../../_python/alegreya-sans-ht-full-pack-ttf/")
            if not os.path.exists(new_img_loc + "og-blog"):
                os.mkdir(new_img_loc + "og-blog")
            rgb_im = img.convert('RGB')
            rgb_im.save(new_img_loc + "og-blog/" + name + ".jpg", dpi=(600, 600))


if __name__ == "__main__":
    current_dir = os.getcwd()
    gen_og_doc_images()
    os.chdir(current_dir)
    gen_og_blog_images()
