from PIL import Image
import os

def convert_to_webp(filename, path="images/"):
    extension = filename.split(".")[-1]
    fname = filename.split(".")[0]
    img = Image.open(path + filename)

    if extension == "png":
        img.save((path+fname+".webp"), "webp", lossless=True)

    elif extension == "jpg" or extension == "jpeg":
        img.save((path+fname+".webp"), "webp", quality=85)


def convert_all(path="./public/assets/images/depoimentos"):
    for root, dirs, files in os.walk("./public/assets/images/depoimentos"):
        for imagefile in files:
            if imagefile.endswith(".png") or imagefile.endswith(".jpg") or imagefile.endswith(".jpeg"):
                convert_to_webp(imagefile, os.path.join(root, ""))
                print(f"Convertendo {imagefile} para webp...")


if __name__ == "__main__":  
    convert_all()

