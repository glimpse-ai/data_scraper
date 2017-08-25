import os
from bs4 import BeautifulSoup, Tag, NavigableString
from src.helpers.definitions import html_dir, permutations_dir
from random import shuffle, sample
from itertools import permutations

MAX_PERMS_PER_FILE = 10
ROOT_ID = 'SECTIONS_ROOT'

html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]


def is_nav_section(el):
  return 'nav' in [c.name for c in el.recursiveChildGenerator() if type(c) == Tag]


def new_soup(contents):
  return BeautifulSoup(contents, 'html.parser')


def shuffled(l):
  new_l = [v for v in l]
  shuffle(new_l)
  return new_l


def new_orders(v):
  val = v
  
  if val > 10:
    val = 10
  
  l = range(val)[1:]
  orders = [list(o) for o in permutations(l) if list(o) != l]
  
  if v > 10:
    suffix = range(v)[val:]
    orders = [(o + suffix) for o in orders]
  
  if len(orders) < MAX_PERMS_PER_FILE:
    return orders
  
  return sample(orders, MAX_PERMS_PER_FILE - 1)
  

if __name__ == '__main__':
  count = 1
  for f in html_files:
    if not count % 50:
      print 'Done with {}'.format(count)
    
    html_path = '{}/{}'.format(html_dir, f)
    
    with open(html_path) as html_file:
      html = html_file.read()
      soup = new_soup(html)
  
    elements = [el for el in soup.body.recursiveChildGenerator() if type(el) == Tag]
    elements = [soup.body] + elements
    
    groups = {}
    j = 0
    for el in elements:
      contents = []
      for c in el.contents:
        if type(c) == NavigableString and c.strip() in ['', '\n']:
          continue
        else:
          contents.append(c)
          
      section_children = []
      i = 0
      for c in contents:
        if type(c) != Tag:
          if len(section_children) >= 2:
            break
          else:
            section_children = []
        
        if c.name == 'section':
          if (i == 0 or contents[i - 1].name == 'section') and not is_nav_section(c):
            section_children.append(c)
        else:
          if len(section_children) >= 2:
            break
          else:
            section_children = []
            
      if len(section_children) > 1:
        groups[str(j)] = section_children
    
    if groups:
      most_sections = max([len(v) for v in groups.values()])
      
      for v in groups.values():
        if len(v) == most_sections:
          og_sections = v
  
      root = soup.new_tag('div', id=ROOT_ID)
  
      og_sections[0].insert_before(root)
      
      sections = {}
      index = 1
      for s in og_sections:
        sections[str(index)] = s.extract()
        index += 1
      
      orders = new_orders(index)
      
      for order in orders:
        root_soup = soup.__copy__()
        curr_el = root_soup.body.find(attrs={'id': ROOT_ID})
        
        for i in order:
          new_sibling = sections[str(i)]
          curr_el.insert_after(new_sibling)
          curr_el = new_sibling
        
        file_suffix = '-'.join([str(i) for i in order]) + '.html'
        new_file_path = '{}/{}-{}'.format(permutations_dir, f[:-5], file_suffix)
        
        with open(new_file_path, 'w+') as new_file:
          new_file.write(root_soup.encode('utf-8'))
    
    count += 1