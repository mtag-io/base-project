module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DB_HOST', '127.0.0.1'),
        port: env.int('DB_PORT', 3306),
        database: env('STATIC_DB', 'static_server'),
        username: env('DB_USERNAME', 'root'),
        password: env('DB_PASSWORD', 'secret'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
