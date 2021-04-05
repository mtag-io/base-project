const {join} = require('path')
const {existsSync, lstatSync} = require('fs')
const glob = require('glob')
const {PKG} = require('./constants')

/**
 * @typedef {object} Pkg
 * @property {string[]} workspaces
 */

/**
 * @returns {[Pkg, string]}
 */
const getRoot = () => {
    let root = process.cwd()
    while (root !== '/') {
        const pkgPth = join(root, '/package.json')
        if (existsSync(pkgPth)) {
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
            if (ws[ws.length - 1] === '*') {
                packages.forEach(
                    pk => {
                        if (lstatSync(join(pth, ws.slice(0, -1), pk)).isDirectory())
                            acc[pk] = join(pth, ws.slice(0, -1), pk)
                    }
                )
            }
            return acc
        }, {}
    )
}

const isPkg = pth => existsSync(join(pth, PKG))

const pkgList = pth => {
    glob('*/', {cwd: pth})
        .filter(d => isPkg(join(pth, d)))
        .map(d => join(pth, d))
}


/**
 * @name scanPkg
 * @description
 */
const scanPkg = () => {
    const [rootPkg, root] = getRoot()
    rootPkg['workspace'].reduce((acc, pk) => {
        if(pk.endsWith('*'))
    })
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