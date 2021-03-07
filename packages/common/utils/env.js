module.exports = {
    isProd: () => process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith("prod"),
    isTest: () => process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith('test'),
    isDev: () => !process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase().startsWith("dev")
}
