import re
import sys
import json
from definitions import scripts_dir, scrape_helpers_dir


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
