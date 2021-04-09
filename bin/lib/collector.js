const glob = require('glob')
const {commandsGlob, commandsDir} = require('../config')

/**
 * @returns {string[]}
 */

const collector = () => glob
    .sync(commandsGlob , {cwd: commandsDir, absolute: true})
    .map(pth => require(pth))

module.exports = collector()