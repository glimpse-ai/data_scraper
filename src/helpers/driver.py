import os
from selenium import webdriver
from definitions import WINDOW_HEIGHT, WINDOW_WIDTH


def get_driver(browser='chrome'):
  print 'Initializing driver...'

  if browser == 'chrome':
    driver = webdriver.Chrome(os.environ.get('CHROMEDRIVER'))
  elif browser == 'firefox':
    driver = webdriver.Firefox()
  else:
    driver = webdriver.PhantomJS()

  driver.set_page_load_timeout(30)
  driver.set_window_size(WINDOW_HEIGHT, WINDOW_WIDTH)

  return driver
