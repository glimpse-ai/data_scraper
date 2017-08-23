import os

basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

scripts_dir = basedir + '/scripts'

scrape_helpers_dir = basedir + '/scrape_helpers'

data_dir = basedir + '/data'

image_dir = data_dir + '/images'

html_dir = data_dir + '/html'

html_image_error_dir = data_dir + '/html_image_error'

dml_dir = data_dir + '/dml'

WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 625
IMAGE_HEIGHT = WINDOW_HEIGHT * 4