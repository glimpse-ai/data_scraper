import re
import sys
import os
import json
from PIL import Image
from definitions import *
from src.exceptions import ScreenshotException, ResizeImageError


def filename_for_url(url):
  url = url.rstrip('/')
  name = re.sub('[^a-zA-Z0-9\.\-]', '.', url.replace('https://', '').replace('http://', ''))
  return name[:200]


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


def get_script(filename):
  with open('{}/{}.js'.format(scripts_dir, filename)) as f:
    return f.read()


def get_scrape_helper(filename):
  with open('{}/{}.json'.format(scrape_helpers_dir, filename)) as f:
    return json.load(f)


# TODO: Comment this up
def image_for_html(html_filename):
  html_file_path = '{}/{}'.format(html_dir, html_filename)

  if not os.path.exists(html_file_path):
    raise SystemError('File not found at path: {}'.format(html_file_path))

  filename = html_filename[:-5]

  try:
    os.system('webkit2png --ignore-ssl-check --timeout=30 -F -W {} -H {} -D {} -o {} file://{}'.format(
      WINDOW_WIDTH,
      WINDOW_HEIGHT,
      image_dir,
      filename,
      html_file_path
    ))
  except BaseException:
    raise ScreenshotException()

  full_image_path = '{}/{}-full.png'.format(image_dir, filename)
  final_image_path = '{}/{}.png'.format(image_dir, filename)

  px_density = 2
  crop_width = WINDOW_WIDTH * px_density
  crop_height = IMAGE_HEIGHT * px_density
  downsample_factor = 4

  try:
    image = Image.open(full_image_path)
    image = image.crop((0, 0, crop_width, crop_height))
    image = image.resize((crop_width / downsample_factor, crop_height / downsample_factor), Image.ANTIALIAS)
    image.save(final_image_path)
    os.remove(full_image_path)
  except BaseException:
    if os.path.exists(full_image_path):
      os.remove(full_image_path)

    raise ResizeImageError()
