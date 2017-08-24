import os
from src.helpers.utils import image_for_html
from src.helpers.definitions import image_dir, html_dir, html_discard_dir
from src.exceptions import ScreenshotException, ResizeImageError


if __name__ == '__main__':
  # Create map of images already taken
  saved_images = {f[:-4]: True for f in os.listdir(image_dir) if f.endswith('.png')}

  # Determine which html files haven't been image-captured
  new_html_files = [f for f in os.listdir(html_dir) if f.endswith('.html') and not saved_images.get(f[:-5])]

  print 'Found {} new html files.'.format(len(new_html_files))

  i = 1
  for f in new_html_files:
    if not i % 10:
      print 'Done with {} of {}'.format(i, len(new_html_files))

    err = False
    try:
      image_for_html(f)
    except KeyboardInterrupt:
      print 'Bye Bye'
      exit(0)
    except (ScreenshotException, ResizeImageError, SystemError), e:
      print e.message
      err = True
    except BaseException, e:
      print 'Unrecognized Exception: {}'.format(e.message)
      err = True

    if err:
      # If an error occurred taking a screenshot of this html file, move it into the html_image_error dir
      os.system('mv {}/{} {}/{}'.format(html_dir, f, html_discard_dir, f))

    i += 1