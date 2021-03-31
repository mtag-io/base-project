const {join} = require('path')
const fs = require('fs')
const {PKG} = require('./constants')

/**
 * @typedef {object} Pkg
 * @property {string[]} workspaces
 */

/**
 * @param {object} opts
 * @param {}
 * @returns {[Pkg, string]}
 */
const getRoot = (opts={}) => {
    let root = process.cwd()
    while(root !== '/') {
        const pkgPth = join(root, '/package.json')
        if (fs.existsSync(pkgPth)) {
            const pkg = require(pkgPth)
            if (pkg['workspaces']) return [pkg, root]
        }
        root = resolve(root, '../')
    }
}

/**
 * @param {string[]} packages
 * @returns {Object.<string, string>}
 */
const createDestPaths = packages => {
    const [pkg, pth] = getRoot()
    return pkg['workspaces'].reduce(
        (acc, ws) => {
            if(ws[ws.length -1]==='*'){
                packages.forEach(
                    pk => {
                        if(fs.lstatSync(join(pth, ws.slice(0, -1), pk)).isDirectory())
                            acc[pk] = join(pth, ws.slice(0, -1), pk)
                    }
                )
            }
            return acc
        }, {}
    )
}

/**
 * @name getPackage
 * @description gets a single package.json
 * @param {String?} root
 * @return {Package}
 */
const getPackage = (root = process.cwd()) => {
    const rootPkg = join(root, PKG)
    try {
        return {
            path: root,
            data: JSON.parse(
                fs.readFileSync(rootPkg, 'utf8')
            )
        }
    } catch (err) {
        throwErr(`Couldn't read/find any valid ${PKG} in ${rootPkg}. Reason: ${err.message}`)
    }
}

/**
 * @name getPackages
 * @description gets multiple package.json`s
 * @param {String | Object?} root
 * @param {Object?} opts
 * @return {Package[]}
 */
const getPackages = (root = process.cwd(), opts = {}) => {

    if (typeof root !== 'string') {
        root = process.cwd()
        opts = root
    }
    const verbose = opts && opts.verbose

    log('Retrieving package data...', NONE, verbose)

    const rootPkg = getPackage(root)

    let pkgRoots = ''

    if (rootPkg.data[PACKAGES_ROOT] && rootPkg.data[PACKAGES_ROOT].length)
        pkgRoots = rootPkg.data[PACKAGES_ROOT]
    else return [rootPkg]

    return pkgRoots.reduce(
        (acc, pkr) => {
            const pth = path.join(root, pkr)
            const packagesPath = glob.sync(`${pth}/**/${PKG}`, {absolute: true, dir: true})

            inline(`Processing ${pkr}...`, NONE, verbose)
            acc.push(...packagesPath.map(pth => getPackage(path.dirname(pth))))
            log('OK', GREEN, verbose)
            return acc
        }, [rootPkg])
}

/**
 * @name putPackages
 * @description writes a package.json file
 * @param {Package} pkg
 */
const putPackage = pkg => {
    try {
        fs.writeFileSync(path.join(pkg.path, PKG), JSON.stringify(pkg.data, null, 2))
    } catch (err) {
        throwErr(`Couldn't save staki config in ${pkg.path}/${PKG}. reason: ${err.message}`)
    }
}

module.exports = {
    createDestPaths,
    getRoot,
    getPackage,
    putPackage,
    getPackages
}