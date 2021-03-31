module.exports = ({ env }) => ({
  host: env('STATIC_HOST', '0.0.0.0'),
  port: env.int('STATIC_PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a5308e6837ee11af0b025bbd17a249ab'),
    },
  },
});
