const {resolve, join, sep} = require('path')
const fs = require('fs')
const glob = require('glob')
const {throwErr} = require('./console')
const {PKG, DEVERR, WORKSPACE} = require('../constants')

/**
 * @name readJson
 * @description safely reads a json file
 * @param {String} pth
 * @param {String?} target
 * @return {Object}
 */
const readJson = (pth, target = 'target') => {
    if (!fs.existsSync(pth))
        throwErr(`Couldn't locate the ${target} file in ${pth}.`)
    let raw = ''
    try {
        raw = fs.readFileSync(pth, 'utf8')
    } catch (err) {
        throwErr(`Couldn't read the ${target} file in ${pth}.Reason: ${err.message}`, DEVERR)
    }
    try {
        return JSON.parse(raw)
    } catch (err) {
        throwErr(`Invalid JSON format in the ${target} file located in ${pth}.`, DEVERR)
    }
}

/**
 * @name writeJson
 * @description safely writes a json file
 * @param {String} pth
 * @param {Object} data
 * @param {String?} target
 */
const writeJson = (pth, data, target = 'target') => {
    let raw = ''
    try {
        raw = JSON.stringify(data, null, 2)
    } catch (err) {
        throwErr(`Unable to stringify ${target} to JSON. Reason: ${err.message}`, DEVERR)
    }
    try {
        fs.writeFileSync(pth, raw)
    } catch (err) {
        throwErr(`Unable to write ${target} file in ${pth}. Reason: ${err.message}`, DEVERR)
    }
}

/**
 * @name getPackage
 * @description gets a single package.json
 * @param {String?} root
 * @return {object}
 */
const getPackage = root => {
    try {
        return JSON.parse(fs.readFileSync(root, 'utf8'))
    } catch (err) {
        throwErr(`Couldn't read/find any valid ${PKG} in ${root}. Reason: ${err.message}`)
    }
}

/**
 * @name putPackages
 * @description writes a package.json file
 * @param {Object} pkg
 * @param {String} root
 */
const putPackage = (pkg, root) => {
    try {
        fs.writeFileSync(join(root, PKG), JSON.stringify(pkg, null, 2))
    } catch (err) {
        throwErr(`Couldn't save ${PKG} in ${root}. reason: ${err.message}`)
    }
}

/**
 * @description find a package json uproot, if ws find the root monorepo package
 * @param {boolean|string} ws
 * @returns {[Object, string]}
 */
const findRoot = ws => {
    let root = process.cwd()
    while (root !== '/') {
        const pkgPth = join(root, PKG)
        if (fs.existsSync(pkgPth)) {
            const pkg = getPackage(pkgPth)
            if(!ws) return [pkg, root]
            if (pkg[WORKSPACE]) return [pkg, root]
        }
        root = resolve(root, '../')
    }
    throwErr(`Couldn't find the workspace root package in ${root}.`)
}

/**
 * @description creates a map package name: package absolute [ath for mono-repos
 * @param {Object} pkg
 * @param {String} root
 */
const mapPackages = (pkg, root) => pkg[WORKSPACE].reduce((acc, ws) => {
        if (ws[ws.length - 1] === '*')
            glob.sync('*/', {
                cwd: join(root, ws.slice(0, -1)),
                absolute: true
            })
                .forEach(d => {acc[d.split(sep).pop()] = d})
        return acc
    }, {})

/**
 * @description add a key to the monorepo root package json containing all the
 * packages and their respective absolute paths
 */
const updateRootPkg = () => {
    const ws = true
    const [pkg, root] = findRoot(ws)
    pkg.wsMap = mapPackages(pkg, root)
    putPackage(pkg, root)
}


module.exports = {
    findRoot,
    mapPackages,
    updateRootPkg,
    putPackage
}