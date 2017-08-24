import re
import sys
from bs4 import BeautifulSoup, NavigableString, Tag
from src.translators import get_attrs_map, get_attr_vals_map, get_tags_map
reload(sys)
sys.setdefaultencoding('utf-8')


attrs_map = get_attrs_map()
attr_vals_map = get_attr_vals_map()
tags_map = get_tags_map()


def strip_nav_str(nav_string):
  return re.sub(r'\n\s*\n', r'\n\n', nav_string.strip(), flags=re.M)


def rounded_str_length(s, base=5):
  length = len(s)
  
  if length < base:
    return base
  
  return int(base * round(float(length) / base))


def create_style_map(style):
  style_map = {}
  
  for g in style.split(';'):
    try:
      col_idx = g.index(':')
    except ValueError:
      continue
    
    style_map[g[:col_idx]] = g[col_idx + 1:].strip()
  
  return style_map


def convert_styles_to_attrs(el):
  style = el.attrs.get('style')
  
  if not style:
    if style is not None:
      el.attrs.pop('style')
    
    return
  
  style_map = create_style_map(style)
  
  for k, v in style_map.iteritems():
    el.attrs[k] = v
  
  el.attrs.pop('style')


def encode_attr_val(val, attr=None):
  if attr_vals_map.get(attr) and attr_vals_map[attr].get(val):
    return attr_vals_map[attr][val]
  
  return val


def cloned_attrs(og_attrs):
  attrs = {}
  for k, v in og_attrs.iteritems():
    if k in ['background', 'list-style']:
      if re.search('url\((.*?)\)', v.strip(), re.I):
        new_v = re.sub('url\((.*?)\)', '', v.strip(), flags=re.I).strip()
        
        if not og_attrs.get('{}-image'.format(k)):
          attrs['{}-image'.format(k)] = 'true'
        
        v = new_v
    
    elif k in ['background-image', 'list-style-image']:
      v = 'true'

    attrs[k] = v
  
  return attrs


def all_els_border_box(soup):
  return 'body * {' in soup.head.find('style').encode('utf-8')


def encode_attrs(el):
  if not el.attrs:
    return
  
  convert_styles_to_attrs(el)
  
  attrs = cloned_attrs(el.attrs)
  
  for k, v in attrs.iteritems():
    # if not even on the el as an attribute, ignore it
    if not el.attrs.get(k):
      continue
    
    # If allowed attr, encode it
    if attrs_map.get(k):
      encoded_attr_name = attrs_map.get(k)
      
      if k == 'class':
        el.attrs[encoded_attr_name] = ','.join([encode_attr_val(c, attr=k) for c in v])
      else:
        el.attrs[encoded_attr_name] = encode_attr_val(v, attr=k)
    
    # pop off the og attr
    el.attrs.pop(k)
    
  
def translate(html):
  soup = BeautifulSoup(html, 'html.parser')

  elements = [el for el in soup.body.recursiveChildGenerator() if type(el) == Tag]
  elements.reverse()
  elements.append(soup.body)

  for el in elements:
    # Encode attr names and values
    encode_attrs(el)
    
    # Don't encode body tag name
    if el.name == 'body':
      continue
    
    encoded_tag_name = tags_map.get(el.name)
    
    # Extract any elements not in tags map
    if not encoded_tag_name:
      el.extract()
    
    # Encode tag_name
    el.name = encoded_tag_name
    
  if all_els_border_box(soup):
    soup.body.attrs['all-bb'] = 'true'
  
  # Find all navigable strings in the body
  strings = [s for s in soup.body.recursiveChildGenerator() if type(s) == NavigableString]
  
  for s in strings:
    clean_string = strip_nav_str(s)
    
    if clean_string:
      new_s = soup.new_string('t({})'.format(rounded_str_length(clean_string)))
      s.replace_with(new_s)
    else:
      s.extract()

  return soup.body.encode('utf-8')