import json

from mysql import connector


class Db:
    def __init__(self, **kwargs):
        self.conn = connector.connect(**kwargs)
        self.upsert_presets_table()
        self.upsert_worker_table()

    def check_user(self, uid):
        cursor = self.conn.cursor()
        q = "SELECT _id FROM user WHERE userId=%s"
        cursor.execute(q, (uid,))
        _id = cursor.fetchone()
        cursor.close()
        return _id is not None

    def register_worker_job(self, job):
        cursor = self.conn.cursor()
        q = "INSERT INTO worker (userId, presetId) VALUES (%s, %s)"
        args = (job['token'], job['preset_id'])
        cursor.execute(q, args)
        self.conn.commit()
        row_id = cursor.lastrowid
        cursor.close()
        return row_id

    def upsert_worker_table(self):
        cursor = self.conn.cursor()
        q = """
            CREATE TABLE IF NOT EXISTS worker(
                _id INT AUTO_INCREMENT PRIMARY KEY,
                userId VARCHAR(256) NOT NULL,
                presetId INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId)
                    REFERENCES user(userId)
                    ON UPDATE RESTRICT ON DELETE CASCADE,
                FOREIGN KEY (presetId)
                    REFERENCES preset(_id)
                    ON UPDATE RESTRICT ON DELETE CASCADE
            ) ENGINE=INNODB;
        """
        cursor.execute(q)
        self.conn.commit()
        cursor.close()

    def upsert_presets_table(self):
        cursor = self.conn.cursor()
        q = """
            CREATE TABLE IF NOT EXISTS preset(
                _id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20) UNIQUE,
                data JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )ENGINE=INNODB;
        """
        cursor.execute(q)
        self.conn.commit()
        cursor.close()

    def create_preset(self, name, data):
        cursor = self.conn.cursor()
        q = "INSERT INTO preset (name, data) VALUES (%s, %s) ON DUPLICATE KEY UPDATE data=%s"
        args = (name, json.dumps(data), json.dumps(data))
        cursor.execute(q, args)
        self.conn.commit()
        _id = cursor.lastrowid
        cursor.close()
        return _id

    def delete_preset(self, _id):
        cursor = self.conn.cursor()
        q = "DELETE FROM preset WHERE _id=%s"
        args = (_id,)
        cursor.execute(q, args)
        row = cursor.lastrowid
        self.conn.commit()
        cursor.close()
        return row

    def update_preset(self, _id, name, data):
        cursor = self.conn.cursor()
        q = "UPDATE preset SET name=IF(%s='',preset.name, %s) , data=IF(%s=NULL,preset.data, %s) WHERE _id=%s"
        args = (name, name, json.dumps(data), json.dumps(data), _id)
        cursor.execute(q, args)
        row = cursor.lastrowid
        self.conn.commit()
        cursor.close()
        return row

    def get_preset(self, _id):
        cursor = self.conn.cursor()
        q = "SELECT * FROM preset WHERE _id=%s"
        args = (_id, )
        cursor.execute(q, args)
        presets = cursor.fetchone()
        cursor.close()
        return presets

    def get_presets(self):
        cursor = self.conn.cursor()
        q = "SELECT * FROM preset"
        cursor.execute(q)
        presets = cursor.fetchall()
        cursor.close()
        return presets

    # TODO - create cleaning cron job
