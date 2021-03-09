import unittest

from db import Db

userId = '60310fef5667a8d94ce284c8'
test_preset = 'test_preset'


class TestDb(unittest.TestCase):

    def setUp(self):
        config = dict(
            user="root",
            password="secret",
            database="devdb",
            host="127.0.0.1"
        )
        self.db = Db(**config)
        self.preset_id = -1

    def find_preset_id(self):
        cursor = self.db.conn.cursor()
        cursor.execute('SELECT _id FROM preset WHERE name=%s', (test_preset,))
        return cursor.fetchone()[0]


class TestUser(TestDb):

    def test_find_user(self):
        is_registered = self.db.check_user(userId)
        self.assertTrue(is_registered)

    def test_create_preset(self):
        _id = self.db.create_preset(test_preset, dict(
            test_data='test-data2'
        ))
        self.assertTrue(type(_id) is int and _id >= 0)

    def test_get_preset(self):
        _id = self.find_preset_id()
        preset = self.db.get_preset(_id)
        self.assertEqual(preset[1], test_preset)

    def test_get_presets(self):
        presets = self.db.get_presets()
        self.assertEqual(presets[0][1], test_preset)

    def test_update_preset_all(self):
        data = dict(test_preset="test-data2")
        name = 'test-preset2'
        row = self.db.update_preset(self.preset_id, name, data)
        self.assertTrue(type(row) is int and row >= 0)

    def test_update_preset_name(self):
        data = None
        name = 'test-preset2'
        row = self.db.update_preset(self.preset_id, name, data)
        self.assertTrue(type(row) is int and row >= 0)

    def test_register_worker_job(self):
        _id = self.db.register_worker_job(dict(
            token=userId,
            preset_id=self.find_preset_id()
        ))
        self.assertTrue(type(_id) is int and _id >= 0)

    def test_delete_preset(self):
        _id = self.db.delete_preset(
            self.find_preset_id()
        )
        self.assertTrue(type(_id) is int and _id >= 0)


if __name__ == '__main__':
    unittest.main()
