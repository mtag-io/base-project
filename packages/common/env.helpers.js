export const isProd = () => process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith("prod")
export const isTest = () => process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().startsWith('test')
export const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase().startsWith("dev")

