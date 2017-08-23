import os
import json

translate_dir = os.path.abspath(os.path.dirname(__file__))


def get_attrs_map():
  return json_map('attrs_map')


def get_attr_vals_map():
  return json_map('attr_values_map')


def get_tags_map():
  return json_map('tags_map')


def json_map(name):
  with open('{}/{}.json'.format(translate_dir, name)) as f:
    return json.load(f)