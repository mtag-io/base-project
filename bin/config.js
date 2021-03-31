const {resolve} = require('path')

const commandsDir = '@commands'
const commandsGlob = `**/index.js`
const envPath = resolve(__dirname, '../../../@env-vault')

module.exports = {
    envPath,
    commandsDir,
    commandsGlob
}