import os
from src.translators import html2dml
from src.helpers.definitions import html_dir, dml_dir


if __name__ == '__main__':
  files = [f for f in os.listdir(html_dir) if f.endswith('.html')]

  count = 1
  for f in files:
    if not count % 50:
      print 'Done with {} of {}'.format(count, len(files))

    try:
      # Get HTML from file
      with open('{}/{}'.format(html_dir, f)) as html_file:
        html = html_file.read()

      # Translate HTML to DML
      dml = html2dml.translate(html)

      # Write DML to file
      with open('{}/{}.dml'.format(dml_dir, f[:-5]), 'w+') as dml_file:
        dml_file.write(dml)

    except KeyboardInterrupt:
      print 'Bye Bye.'
      exit(0)
    except BaseException, e:
      print 'Error encoding HTML file {} with error: {}'.format(f, e.message)

    count += 1