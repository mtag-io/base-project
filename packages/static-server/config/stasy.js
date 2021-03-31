module.exports = ({env}) => ({
  stasyHost: env('STASY_HOST', '127.0.0.1'),
  stasyPort: env('STASY_PORT', 4646)
})
