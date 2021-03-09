from os.path import join, splitext

from config import CORNER, ACTIONS, THUMBNAIL_FRAME, THUMBNAIL_WIDTH
from constants import LEFT_UP, CRAWL_DEFAULTS, SID
from utils import setup_dirs, get_sequence_pattern, set_defaults, write_json


def check_is_registered(token):
    if not token:
        raise Exception('No valid client or session id specified')
    return token[0:3] != SID


def success(action):
    return dict(
        action=action,
        success=True
    )


class Executor:

    def __init__(self, ffmpeg_instance, config):
        self.registered = None
        self.storage = None
        self.resources = None
        self.fonts = None
        self.volatile = None
        self.exec = ffmpeg_instance
        for k, v in config['dirs'].items():
            setattr(self, k, v)

    def get_client_dir(self, registered, dir_names, token):
        dl = []
        for dn in dir_names:
            dl.append(
                join(
                    self.storage,
                    self.registered if registered else self.volatile, token,
                    self.__getattribute__(dn)
                ))
        return tuple(dl)

    def analyse_source(self, source, token, is_widget):
        is_registered = check_is_registered(token)
        target = 'widget' if is_widget else 'source'
        source_dir = self.get_client_dir(is_registered, [target], token)[0]
        self.probe_source(source, source_dir)
        self.thumbnail(source, source_dir)
        return success(ACTIONS.RESOLVE_SOURCE)

    def probe_widget(self, widget, widget_dir):
        widget_path = join(widget_dir, widget)
        pattern = get_sequence_pattern(widget, widget_dir)
        nfo_data = self.exec.probe(pattern)
        nfo_path = join(widget_path, widget + '.json')
        write_json(nfo_path, nfo_data)

    def probe_source(self, source, source_dir):
        source_path = join(source_dir, source)
        nfo_data = self.exec.probe(source_path)
        nfo_path = splitext(source_path)[0] + '.json'
        write_json(nfo_path, nfo_data)

    def thumbnail(self, source_dir, source):
        out = join(source_dir, splitext(source)[0] + '.png')
        (
            self.exec
                .input(join(source_dir, source))
                .filter('select', 'gte(n,{})'.format(THUMBNAIL_FRAME))
                .filter('scale', THUMBNAIL_WIDTH, -1)
                .output(out, vframes=1, format='image2', vcodec='png')
                .run(overwrite_output=True)
        )
        return out

    # crawl text across screen
    def overlay_text(self, token, source, data):

        is_registered = check_is_registered(token)

        source_dir, output_dir = self.get_client_dir(is_registered, ['source', 'output'], token)

        # create dirs if they don't exist
        setup_dirs(output_dir)

        source_path = join(source_dir, source)
        output_path = join(output_dir, source)

        source = self.exec.input(source_path)

        _data = set_defaults(data, CRAWL_DEFAULTS)
        source_text = source.drawtext(data)
        self.exec.output(source_text, output_path).run(overwrite_output=True)

        return success(ACTIONS.CRAWL)

    # widget overlay
    def overlay_widget(self, token, source, widget, corner=LEFT_UP):

        is_registered = check_is_registered(token)

        widget_dir, source_dir, output_dir = self.get_client_dir(
            is_registered,
            ['widget', 'source', 'output'],
            token)

        source_path = join(source_dir, source)
        output_path = join(output_dir, source)

        # create dirs if not already
        setup_dirs(output_dir)

        # find the widget file pattern for ffmpeg input (ex: widget%05d.png)
        widget_pattern = get_sequence_pattern(join(widget_dir, widget))
        widget_arg = join(widget_dir, widget, widget_pattern)

        # prepare the inputs - the widget should loop forever
        source = self.exec.input(source_path, thread_queue_size=512)
        widget = self.exec.input(widget_arg, stream_loop=-1, thread_queue_size=512)

        (
            # overlay until the source ends
            # (widget loops infinitely so, shortest=1 wll stop at source end)
            self.exec.filter([source, widget], 'overlay', CORNER[corner], repeatlast=0, shortest=1)
                .output(output_path)
                .run(overwrite_output=True)
        )

        return success(ACTIONS.OVERLAY)

    # def concat(self, *sources):
    #     base = self.exec.input()
