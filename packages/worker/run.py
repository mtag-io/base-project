#!/usr/local/bin/python3

import os

import uvicorn
from app import app
from config import config

cwd = os.path.dirname(os.path.realpath(__file__))
os.chdir(cwd)

# get the worker socket service info
service = config['services']['worker']['default']

# start the webserver
host = "0.0.0.0" if os.environ.get("WORKER_ENV", "") == "DOCKER" else service['host']
uvicorn.run(app=app, port=service['port'], host=host)
