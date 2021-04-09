const {join} = require('path')
const fs = require('fs')
const {findCwd} = require('../../lib/helpers/fs')


const createDestPaths = (config) => {
    const [pkg, pth] = findCwd()
    return pkg['workspaces'].reduce(
        (acc, ws) => {
            if(ws[ws.length -1]==='*'){
                config['packages'].forEach(
                    pk => {
                        if(fs.lstatSync(join(pth, ws.slice(0, -1), pk)).isDirectory())
                            acc.push(join(ws.slice(0, -1), pk))
                    }
                )
            }
            return acc
        }, []
    )
}

module.exports = {
    createDestPaths
}