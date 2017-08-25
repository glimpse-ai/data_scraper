import re
from src.translators import get_attr_vals_map

classes = {v: 1 for v in get_attr_vals_map().get('class').values()}


def replace_invalid_bg_props(dml):
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


def replace_double_spaces(dml):
  return dml.replace('  ', ' ')


def clean(dml):
  cleaners = [
    replace_invalid_bg_props,
    remove_invalid_classes,
    replace_double_spaces
  ]

  for cleaner in cleaners:
    dml = cleaner(dml)

  return dml