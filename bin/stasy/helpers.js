const {join, resolve} = require('path')
const fs = require('fs')

const findCwd = () => {
    let root = process.cwd()
    while(root !== '/') {
        const pkgPth = join(root, '/package.json')
        if (fs.existsSync(pkgPth)) {
            // noinspection JSFileReferences
            const pkg = require(pkgPth)
            if (pkg['workspaces']) return [pkg, root]
        }
        root = resolve(root, '../')
    }
}

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
    findCwd,
    createDestPaths
}