import unittest
from os.path import join, exists

import ffmpeg

import utils
from config import config
from executor import Executor

source = 'test-fixpics.mp4'
widget = "logo"
token = '60310fef5667a8d94ce284c8'
source_dir = "__storage__/registered/60310fef5667a8d94ce284c8/src"
widget_dir = "__storage__/registered/60310fef5667a8d94ce284c8/wdg"


class TestExecutor(unittest.TestCase):

    def setUp(self):
        self.utils = utils
        self.executor = Executor(ffmpeg, config)


class TestProbeSource(TestExecutor):

    def test_write_nfo(self):
        self.executor.probe_source(source, source_dir)
        expected = utils.read_json(join(source_dir, "test-fixpics.json"))
        self.assertIsInstance(expected['streams'], list)


class TestThumbnail(TestExecutor):

    def test_thumbnail(self):
        self.executor.thumbnail(source_dir, source)
        self.assertTrue(exists(join(source_dir, "test-fixpics.png")))


class TestProbeWidget(TestExecutor):

    def test_probe_widget(self):
        self.executor.probe_widget(widget, widget_dir)
        self.assertTrue(exists(join(widget_dir, widget, "logo.json")))


if __name__ == '__main__':
    unittest.main()
