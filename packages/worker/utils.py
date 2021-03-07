import json
import re
from glob import glob
from os import mkdir
from os.path import isdir, join, splitext, basename

from constants import SEQUENCE_REGEXP


class DictClass:
    def __init__(self, act):
        for k, v in act.items():
            setattr(self, k, v)


def read_json(pth):
    with open(pth) as fl:
        return json.load(fl)


def write_json(pth, data):
    with open(pth, 'w+') as outfile:
        json.dump(data, outfile)


def setup_dirs(*args):
    for d in args:
        if not isdir(d):
            mkdir(d)


def get_sequence_pattern(widget, widget_dir):
    fl = glob(join(widget_dir, widget, widget + '*'))
    if not len(fl):
        raise Exception(f'Widget {widget} not found')
    base = basename(fl[0]) if splitext(fl[0])[1] == ".json" else fl[1]
    digits = re.search(SEQUENCE_REGEXP, base)
    if not digits:
        raise Exception(f'Widget {widget} is not a valid file sequence.')
    start, end = digits.span()
    widget_name = base[0: start]
    _, ext = splitext(fl[0])
    return f'{widget_name}%0{end - start - 1}d{ext}'

def set_defaults(source, defaults):
    for k in defaults:
        if not source.get(k):
            source[k] = defaults[k]
    return source
