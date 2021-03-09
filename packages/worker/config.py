from os import getenv

from utils import read_json, DictClass
from os.path import join
from dotenv import load_dotenv
load_dotenv()

# Hardcoded global config source
CONFIG_ROOT = '__config__'
CONFIG_GLOBAL = 'global.json'

config = read_json(join(CONFIG_ROOT, CONFIG_GLOBAL))
config['worker'] = read_json(join(CONFIG_ROOT, config["config"]["worker"]))
DB_HOST = getenv('DB_HOST')

ACTIONS = DictClass(read_json(join(CONFIG_ROOT, config['config']['actions'])))
DIRS = DictClass(config['dirs'])

THUMBNAIL_FRAME = 35
THUMBNAIL_WIDTH = config['worker']["thumb_width"]

PAD_X = 10
PAD_Y = 10

SPEED = [
    "w-n*15",
    "w-n*10",
    "w-n*5"
]

POSITION = [
    "50+th",
    "h/2-th",
    "w-50-th"
]

CORNER = [
    f"{PAD_X}", f"{PAD_Y}",
    f"{PAD_X}", f"main_h-overlay_h-{PAD_Y}",
    f"main_w-overlay_w-{PAD_X}", f"{PAD_Y}",
    f"main_w-overlay_w-{PAD_X}", f"main_h-overlay_h-{PAD_Y}"
]
