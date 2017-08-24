import os
from src.helpers.definitions import html_discard_dir, html_dir
from flask import Flask, request
from bs4 import BeautifulSoup
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


app = Flask(__name__)


@app.route('/html_eval', methods=['PUT', 'DELETE'])
def discard_file():
  filename = 'something.html'  # get from params
  curr_path = '{}/{}'.format(html_dir, filename)

  if request.method == 'PUT':  # Update HTML file contents
    new_html = ''  # get from params

    soup = BeautifulSoup(new_html, 'html.parser')

    with open(curr_path, 'w+') as f:
      f.write(soup.prettify().encode('utf-8'))

  elif request.method == 'DELETE':  # Move file to html_discard directory
    dest_path = '{}/{}'.format(html_discard_dir, filename)

    try:
      os.system('mv {} {}'.format(curr_path, dest_path))
    except BaseException, e:
      print 'Error discarding {}: {}'.format(filename, e.message)

  return {}, 200


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3000, debug=True, use_reloader=True)