import os
import re
from definitions import data_dir, dml_dir
from translators import get_attr_vals_map

classes = {v: 1 for v in get_attr_vals_map().get('class').values()}

blacklisted_attrs = {
  "translate3d(0, 0, 0)": 1,
  "auto, cover": 1,
  "rgba(0, 0, 0, 0) none 0": 1,
  "scale(1, 1)": 1,
  "13px/16px arial,sans-serif": 1,
  "right 289.8px top 43px, right 1495.8px top 43px, right 2701.8px top 43px, right 3907.8px top 43px, right 5113.8px top 43px": 1,
  '[object Object]': 1
}

replace_map = {
  'none,0': 'none',
  'normal,400': '400',
  '0,0 0,0 0 0,0 0 0 0': '0'
}


def replace_invalid_bg_props(dml, f):
  bg_matches = re.finditer(" aa='(.*)'", dml)
  
  if bg_matches:
    for m in bg_matches:
      val = m.groups()[0]
      color = val.split(' ').pop()
      replace_with = ''
      
      if color and color.startswith('#'):
        replace_with = ' aa="{}"'.format(color)
      
      dml = dml.replace(' aa=\'{}\''.format(val), replace_with)
  
  return dml


def replace_calcs(dml, f):
  calc_matches = re.finditer('(calc\(.*?\))', dml)
  
  if calc_matches:
    for m in calc_matches:
      val = m.groups()[0]
      pct = re.search('([0-9]+%)', val)
      
      if pct:
        dml = dml.replace(val, pct.group(0))
      else:
        dml = dml.replace(val, '')
        
  return dml


def replace_attr_vals(dml, f):
  matches = re.finditer(' (([a-z]+)="(.*?)")', dml)

  if matches:
    for m in matches:
      attr = m.group(2)
      attr_val = m.group(3)
      replaced = False
      
      for k, v in replace_map.iteritems():
        if attr_val == k:
          dml = dml.replace(m.group(0), ' {}="{}"'.format(attr, v))
          replaced = True
          break
          
      if not replaced and attr in ['xx', 'aaa']:
        v = attr_val.split(',')[0]
        dml = dml.replace(m.group(0), ' {}="{}"'.format(attr, v))
    
  return dml


def remove_blacklisted(dml, f):
  matches = re.finditer(' (([a-z]+)="(.*?)")', dml)
  
  if matches:
    for m in matches:
      attr = m.group(2)
      attr_val = m.group(3)
      
      if blacklisted_attrs.get(attr_val) or (attr == 'k' and attr_val.startswith('none solid')) or 'gradient' in attr_val:
        dml = dml.replace(m.group(0), '')
  
  return dml


def remove_invalid_classes(dml, f):
  matches = re.finditer(' t="(.*?)"', dml)
  
  if matches:
    for m in matches:
      attr_val = m.groups()[0]
      accepted_classes = [c.strip() for c in attr_val.split(',') if classes.get(c.strip())]
      
      if accepted_classes:
        replacement = ' t="{}"'.format(','.join(accepted_classes))
      else:
        replacement = ''

      dml = dml.replace(' t="{}"'.format(attr_val), replacement)
  
  return dml


def remove_url_vals(dml, f):
  matches = re.finditer("( [a-z]+='url\(\"(.*?)')", dml)
  
  if matches:
    for m in matches:
      dml = dml.replace(m.group(0), '')
  
  return dml


def log_upper_case_chars(dml, f):
  clone = dml
  colors = re.finditer('(#[0-9a-zA-Z]+)\w', clone)
  
  for c in colors:
    clone = clone.replace(c.groups()[0], '')
  
  if re.match('[A-Z]', clone):
    print 'Uppercase Found: {}'.format(f)
  
  return dml


def replace_double_spaces(dml, f):
  return dml.replace('  ', ' ')


def remove_plusses(dml, f):
  matches = re.finditer(' (([a-z]+)="(.*?)")', dml)
  
  if matches:
    for m in matches:
      attr_val = m.group(3)
      
      if '+' in attr_val:
        dml = dml.replace(m.group(0), '')
        
  return dml


def main():
  dml_dir = data_dir + '/dml2'
  files = [f for f in os.listdir(dml_dir) if f.endswith('.dml')]
  
  i = 0
  for f in files:
    if not i % 50:
      print 'Done with {} of {}'.format(i, len(files))
    
    with open('{}/{}'.format(dml_dir, f)) as dml_f:
      dml = dml_f.read()

    cleaners = [
      replace_invalid_bg_props,
      replace_calcs,
      replace_attr_vals,
      remove_blacklisted,
      remove_invalid_classes,
      remove_url_vals,
      log_upper_case_chars,
      replace_double_spaces,
      remove_plusses
    ]

    for cleaner in cleaners:
      dml = cleaner(dml, f)
      
    with open('{}/{}'.format(dml_dir, f), 'w+') as d:
      d.write(dml.lower())
    
    i += 1


if __name__ == '__main__':
  main()