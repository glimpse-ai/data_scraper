import re
import sys
import os
import json
from PIL import Image
from definitions import *
from src.exceptions import ScreenshotException, ResizeImageError


# Convert a url into a valid filename (no ext)
def filename_for_url(url, max_char=200):
  url = url.rstrip('/')
  name = re.sub('[^a-zA-Z0-9\.\-]', '.', url.replace('https://', '').replace('http://', ''))
  return name[:max_char]


def which_os():
  platform = sys.platform.lower()

  if 'darwin' in platform:
    return 'mac'
  elif 'linux' in platform:
    return 'linux'
  elif 'windows' in platform:
    print 'May God have mercy on your soul.'
    return 'windows'

  return None


# Get JS script by name from the script/ dir
def get_script(filename):
  with open('{}/{}.js'.format(scripts_dir, filename)) as f:
    return f.read()


# Get a JSON helper file for scraping purposes
def get_scrape_helper(filename):
  with open('{}/{}.json'.format(scrape_helpers_dir, filename)) as f:
    return json.load(f)


# Screenshot an html file and downsample it
def image_for_html(html_filename):
  html_file_path = '{}/{}'.format(html_dir, html_filename)

  if not os.path.exists(html_file_path):
    raise SystemError('File not found at path: {}'.format(html_file_path))

  filename = html_filename[:-5]  # remove .html

  try:
    os.system('webkit2png --ignore-ssl-check --timeout=30 -F -W {} -H {} -D {} -o {} file://{}'.format(
      WINDOW_WIDTH,   # width
      WINDOW_HEIGHT,  # height
      image_dir,      # destination dir
      filename,       # output filename (no ext)
      html_file_path  # input html file
    ))
  except BaseException:
    raise ScreenshotException()

  # webkit2png tacks '-full' onto the filename for fullscreen images
  full_image_path = '{}/{}-full.png'.format(image_dir, filename)

  # We're gonna rename it without the '-full'
  final_image_path = '{}/{}.png'.format(image_dir, filename)

  # webkit2png saves images as 2x the requested size
  px_density = 2

  # Image crop dimensions
  crop_width = WINDOW_WIDTH * px_density
  crop_height = IMAGE_HEIGHT * px_density

  downsample_factor = 4

  try:
    image = Image.open(full_image_path)  # open image webkit2png saved
    image = image.crop((0, 0, crop_width, crop_height))  # crop it to specified size
    image = image.resize((crop_width / downsample_factor, crop_height / downsample_factor), Image.ANTIALIAS)  # downsample it
    image.save(final_image_path)  # save it to new path
    os.remove(full_image_path)  # remove old path
  except BaseException:
    # if an error occurred, remove the image webkit2png saved
    if os.path.exists(full_image_path):
      os.remove(full_image_path)

    raise ResizeImageError()