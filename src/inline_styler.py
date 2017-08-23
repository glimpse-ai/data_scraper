from helpers.definitions import html_dir, WINDOW_WIDTH, WINDOW_HEIGHT
from helpers.utils import filename_for_url, which_os, get_script, get_scrape_helper
from helpers.driver import get_driver
from src.exceptions import *
from bs4 import BeautifulSoup
from pyvirtualdisplay import Display
from time import sleep
import urllib2
import signal
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


class InlineStyler:
  BATCH_SIZE = 50  # Number of elements in a styling batch
  MAX_BATCHES_ALLOWED = 50  # Max number of element batches allowed without rejecting the URL (take too long)
  BATCHES_HALFWAY_TIME_REQ = 3600  # Batches must be halfway done after this much time (ms)

  SCRIPTS = [
    'replaceLinkWithStyle',         # Replace <link> tag with <style type="text/css">provided css</style>
    'removeUnwantedTags',           # Strip out any tags we don't want (by tag name)
    'removeComments',               # Strip out all HTML comments
    'removeModals',                 # Remove any modals (simple class search)
    'removeAllButOneSelectOption',  # Remove all but the first <option> tag inside all <select> dropdowns
    'removeNoHeightNoChildrenEls',  # Remove all elements with height of 0 or no children
    'clipBodyToHeight',             # Remove any HTML elements whose tops start below a specified pixel height
    'checkForPseudoAfter',          # Assign special class to els whose :after pseudo element has clear:both CSS prop
    'colorUtils',                   # Assign color utility methods to window
    'numUtils',                     # Assign number utility methods to window
    'CSSUtilities',                 # Make CSSUtilities class globally available
    'getCSSProps',                  # Assign CSS props to each element as style attribute
    'removeAsyncScriptTags',        # Remove script tags that got added to the page later
    'removeUnseenElements',         # Remove invisible elements
    'removeUnwantedClasses',        # Remove classes that aren't in accepted class map
    'removeUnwantedAttrs',          # Remove attributes not in accepted attributes map
    'removeGivenElements',          # Remove any elements passed in
    'pullBorderBoxFromHTML',        # Give <body> box-sizing property if <html> has it
    'inheritProps',                 # Inherit CSS props up the DOM tree to avoid 'inherited' or 'initial' values
    'borderBoxCheck',               # Check to see if all elements have box-sizing:border-box
    'removePropRedundancy'          # Due to CSS property inheritance, remove redundant CSS style props
  ]

  def __init__(self):
    self.real_loc = None
    
    # Selenium Webdriver
    self.driver = None

    # Use a virtual display if on Linux (since that means cloud server for me)
    if which_os() == 'linux':
      self.start_display()
    
    # Get accepted CSS properties and info about them
    self.css_props_info = get_scrape_helper('props')

    # Get accepted HTML attributes
    self.accepted_attrs_map = get_scrape_helper('accepted_attrs_map')

    # Get accepted HTML classes
    self.accepted_classes_map = self.accepted_classes()

    # Get our URL "host" blacklist for sites we don't even wanna bother scraping from
    self.host_blacklist = get_scrape_helper('host_blacklist')

    # Get our URL "element" blacklist to remove els we know we don't want from specific urls
    self.url_el_blacklist = get_scrape_helper('url_el_blacklist')
    
    # Create a scripts map of name --> contents to avoid multiple reads from disk
    self.scripts = {s: get_script(s) for s in self.SCRIPTS}
    
    # Batch-progress-related variables
    self.batch_index = 0
    self.num_batches = 0
    self.batch_progress_ok = True
  
  def style_url(self, url, fetch_external_css=True):
    # Init Chrome Selenium WebDriver
    self.driver = self.driver or get_driver()

    print 'Fetching {}...'.format(url)
    self.driver.get(url)

    print 'Done. Waiting for any lazy loads...'
    sleep(3)

    # Get real url location (after any redirects)
    self.real_loc = self.driver.execute_script('return document.location;')

    # Ensure the site has DNS record
    self.ensure_has_dns()

    # Ensure the URL isn't blacklisted (by us)
    self.ensure_not_blacklisted()

    # If user wants to fetch external CSS from <link> tags and pull it into <style> tags...
    if fetch_external_css:
      self.fetch_external_css()

    # Remove elements before styling
    self.pre_styling_el_removal()

    # Clip HTML body height
    self.driver.execute_script(self.scripts.get('clipBodyToHeight'), WINDOW_HEIGHT * 4)

    # Check on :after elements' "clear" property
    self.driver.execute_script(self.scripts.get('checkForPseudoAfter'))

    # Add some utility methods to window
    self.store_utils_on_window()

    body = self.driver.find_element_by_tag_name('body')

    # Get CSS props for each element and style them accordingly
    self.style_elements(body)

    # Remove elements post styling
    self.post_styling_el_removal()

    # Gather blacklisted elements for this url (if any) for future removal
    blacklisted_els = self.get_blacklisted_els(body, url)

    # Remove unwanted classes
    self.driver.execute_script(self.scripts.get('removeUnwantedClasses'), self.accepted_classes_map)

    # Remove unwanted attributes
    self.driver.execute_script(self.scripts.get('removeUnwantedAttrs'), self.accepted_attrs_map)

    all_body_children = body.find_elements_by_tag_name('*')

    # Ensure body still has children at this point...
    if not all_body_children:
      raise NoChildrenInBody()

    # Use selenium's check for is_displayed() to make sure our JS didn't miss undisplayed els
    undisplayed_children = [el for el in all_body_children if not el.is_displayed()]

    # Remove all blacklisted and undisplayed elements
    self.remove_els(undisplayed_children + blacklisted_els)

    # Inherit CSS props (if needed) working backwards up the DOM tree
    self.inherit_props()

    # Check if all elements have box-sizing:border-box
    all_els_border_box = self.driver.execute_script(self.scripts.get('borderBoxCheck'))

    # Remove prop redundancy now that we've inherited CSS props
    self.driver.execute_script(self.scripts.get('removePropRedundancy'), all_els_border_box)

    # Determine which html template to use based on border-box result
    wrapper_template = self.get_body_wrapper(all_els_border_box)

    self.write_styled_html_to_file(body, wrapper_template)

  def ensure_has_dns(self):
    if self.driver.find_elements_by_css_selector('#t.neterror'):
      raise NoDNSRecordFoundException()
  
  def ensure_not_blacklisted(self):
    if self.host_blacklist.get(self.real_loc.get('host')):
      raise URLBlacklistedException()

  def fetch_external_css(self):
    print 'Checking for any external stylesheets...'

    # Get all external stylesheet els
    link_els = self.driver.find_elements_by_css_selector('link[rel="stylesheet"]')

    if not link_els:
      return

    for link in link_els:
      try:
        href = link.get_attribute('href')
      except AttributeError:
        continue

      if not href:
        continue

      # Assign protocol to href if not there
      if href.startswith('//'):
        href = self.real_loc.get('protocol') + href

      # Must be an http(s) link
      if not href.startswith('http'):
        continue

      # Can't be of same origin as page url (CSS will already be in effect)
      if href.startswith(self.real_loc.get('origin')):
        continue

      # Don't pull any font files (hack)
      if 'font' in href:
        continue

      try:
        print 'Pulling in external CSS from {}'.format(href)

        # Fetch the remote CSS content
        css = urllib2.urlopen(href).read()

        # Replace the <link> tag with a <style> tag containing the fetched CSS
        self.driver.execute_script(self.scripts.get('replaceLinkWithStyle'), link, css)
      except BaseException:
        continue

  def pre_styling_el_removal(self):
    print 'Running initial removal scripts...'
    [self.driver.execute_script(self.scripts.get(s)) for s in [
      'removeUnwantedTags',
      'removeComments',
      'removeModals',
      'removeNoHeightNoChildrenEls',
      'removeAllButOneSelectOption',
    ]]

  def store_utils_on_window(self):
    [self.driver.execute_script(self.scripts.get(s)) for s in [
      'colorUtils',
      'numUtils'
    ]]

    self.driver.execute_script(self.scripts.get('CSSUtilities'), self.css_props_info, WINDOW_WIDTH)

  def style_elements(self, body):
    # Avoid any async script tags
    els = body.find_elements_by_css_selector('*:not(script)')

    # Break up elements into batches that can be fed into our next script
    batches = [els[x:(x + self.BATCH_SIZE)] for x in xrange(0, len(els), self.BATCH_SIZE)]

    self.num_batches = len(batches)

    if self.num_batches > self.MAX_BATCHES_ALLOWED:
      raise TooManyElementsException('Too many element batches ({}).'.format(self.num_batches))

    print 'Number of Batches: {}'.format(self.num_batches)

    # Set alarm to ensure batches are halfway done by BATCHES_HALFWAY_TIME_REQ
    signal.signal(signal.SIGALRM, self.ensure_batches_halfway)
    signal.alarm(self.BATCHES_HALFWAY_TIME_REQ)

    self.batch_index = 0
    for batch in batches:
      if not self.batch_progress_ok:
        raise BatchesTooSlow()

      print 'Formatting Batch {} of {}'.format(self.batch_index + 1, self.num_batches)

      if self.batch_index == 0:
        batch = [body] + batch  # add <body> to first batch

      self.driver.execute_script(self.scripts.get('getCSSProps'), batch)

      self.batch_index += 1

    # Done with all batches. Turn off alarm.
    signal.alarm(0)

  def post_styling_el_removal(self):
    [self.driver.execute_script(self.scripts.get(s)) for s in [
      'removeAsyncScriptTags',
      'removeUnseenElements'
    ]]

  def get_blacklisted_els(self, body, url):
    blacklist_css_selectors = self.url_el_blacklist.get(url.rstrip('/')) or []
    blacklisted_els = []

    for selector in blacklist_css_selectors:
      bl_els = body.find_elements_by_css_selector(selector) or []

      for e in bl_els:
        blacklisted_els.append(e)

    return blacklisted_els

  def remove_els(self, els):
    for child in els:
      try:
        self.driver.execute_script(self.scripts.get('removeGivenElements'), [child])
      except BaseException:
        print 'Element not attached to the document anymore.'

  def inherit_props(self):
    [self.driver.execute_script(self.scripts.get(s)) for s in [
      'pullBorderBoxFromHTML',
      'inheritProps'
    ]]

  def get_body_wrapper(self, all_els_border_box):
    if all_els_border_box:
      wrapper_template = 'body_wrapper_border_box.html'
    else:
      wrapper_template = 'body_wrapper.html'

    with open(wrapper_template) as f:
      wrapper = f.read()

    return wrapper

  def write_styled_html_to_file(self, body, wrapper_template):
    url_href = self.real_loc.get('href')
    html_filename = filename_for_url(url_href)
    html_filepath = '{}/{}.html'.format(html_dir, html_filename)

    body_style = self.driver.execute_script("return document.body.getAttribute('style');") or ''
    body_contents = body.get_attribute('innerHTML')

    try:
      html = wrapper_template \
        .replace('BODY_STYLE', body_style) \
        .replace('BODY_CONTENTS', body_contents) \
        .replace('PAGE_TITLE', url_href)
    except AttributeError:
      html = None

    if not html:
      return

    print 'Writing HTML to {}.html'.format(html_filename)

    with open(html_filepath, 'w+') as f:
      soup = BeautifulSoup(html, 'html.parser')
      f.write(soup.prettify().encode('utf-8'))

  def ensure_batches_halfway(self, signum, frame):
    if (self.batch_index + 1) < int(round(self.num_batches / 2)):
      self.batch_progress_ok = False
  
  def reset(self):
    if self.driver:
      self.driver.quit()
      self.driver = None
    
    signal.alarm(0)
    self.batch_progress_ok = True

  def accepted_classes(self):
    # Get all FontAwesome classes
    classes = get_scrape_helper('fa_classes_map')

    # Add custom classes on top
    classes['clear-both-after'] = '1'

    return classes

  @staticmethod
  def start_display():
    display = Display(visible=0, size=(WINDOW_WIDTH, WINDOW_HEIGHT))
    display.start()