import os
from src.helpers.definitions import html_discard_dir, html_dir
from flask import Flask, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


app = Flask(__name__)
CORS(app)


@app.route('/html_eval', methods=['PUT', 'DELETE'])
def html_eval():
  args = dict(request.form.items())
  file_path = args.get('filePath')

  if not file_path:
    return ''

  # Update HTML file contents in place
  if request.method == 'PUT':
    new_html = args.get('html')

    if not new_html:
      return ''

    soup = BeautifulSoup(new_html, 'html.parser')

    with open(file_path, 'w+') as f:
      f.write(soup.prettify().encode('utf-8'))

  # Move file to html_discard directory
  elif request.method == 'DELETE':
    file_name = file_path.split('/').pop()
    dest_path = '{}/{}'.format(html_discard_dir, file_name)

    try:
      os.system('mv {} {}'.format(file_path, dest_path))
    except BaseException, e:
      print 'Error discarding {}: {}'.format(file_name, e.message)

  return ''


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3000, debug=True, use_reloader=True)