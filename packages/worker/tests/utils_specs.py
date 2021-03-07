import unittest

import utils


class TestUtils(unittest.TestCase):

    def setUp(self):
        self.utils = utils


class TestSetDefaults(TestUtils):
    def test_source_empty(self):
        source = dict()
        defaults = dict(
            def_val="def_val1",
            def_val3="def_val3"
        )
        actual = self.utils.set_defaults(source, defaults)
        self.assertDictEqual(actual, defaults)

    def test_interpolate_defaults(self):
        source = dict(
            val="val"
        )
        defaults = dict(
            def_val="def_val1",
            def_val3="def_val3"
        )
        expected = dict(
            def_val="def_val1",
            val="val",
            def_val3="def_val3"
        )
        actual = self.utils.set_defaults(source, defaults)
        self.assertDictEqual(actual, expected)

    def test_empty_defaults(self):
        source = dict(
            val1="val",
            val2="val2",
            val3="val3"
        )
        defaults = dict()
        actual = self.utils.set_defaults(source, defaults)
        self.assertDictEqual(actual, source)


class TestGetSequencePattern(TestUtils):

    def test_get_5d_pattern(self):
        def mock_glob(_):
            return [
                'widget_00001.png',
                'widget_00002.png',
                'widget_00003.png',
                'widget_00004.png',
                'widget_00005.png'
            ]

        self.utils.glob = mock_glob
        actual = self.utils.get_sequence_pattern("whatever", "whatever")
        expected = "widget_%05d.png"
        self.assertEqual(actual, expected)

    def test_get_3d_pattern(self):
        def mock_glob(_):
            return [
                'widget_001.png',
                'widget_002.png',
                'widget_003.png',
                'widget_004.png',
                'widget_005.png'
            ]

        self.utils.glob = mock_glob
        actual = self.utils.get_sequence_pattern("whatever", "whatever")
        expected = "widget_%03d.png"
        self.assertEqual(actual, expected)


if __name__ == '__main__':
    unittest.main()
