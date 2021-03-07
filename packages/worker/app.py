import ffmpeg
import socketio

from config import config
from events import events
from executor import Executor

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
app = socketio.ASGIApp(sio)

executor = Executor(ffmpeg, config)

events(sio, executor)
