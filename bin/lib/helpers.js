const {join} = require('path')
const chalk = require('chalk')
const glob = require('glob')
const inquirer = require('inquirer')
const {STAKI} = require('./constants')
const {NONE, GREEN, PKG, PACKAGES_ROOT} = require('./constants')

/**
 * @typedef {Object} Package
 * @property {String} path
 * @property {Object} data
 */


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
            const pth = join(root, pkr)
            const packagesPath = glob.sync(`${pth}/**/${PKG}`, {absolute: true, dir: true})

            inline(`Processing ${pkr}...`, NONE, verbose)
            acc.push(...packagesPath.map(pth => getPackage(path.dirname(pth))))
            log('OK', GREEN, verbose)
            return acc
        }, [rootPkg])
}


/**
 * @name confirm
 * @description performs an interactive (inquirer) confirmation dialog
 * @param {String} message
 * @returns {Promise<*>}
 */
const confirm = async message => {

    const query = {
        type: 'confirm',
        name: 'ok',
        default: true
    }
    query.message = message
    try {
        const {ok} = await inquirer.prompt(query)
        return ok
    } catch (err) {
        interactiveFail(err)
    }
}

/**
 * @name setupDir
 * @description interactively creates a directory
 * @param {String} root
 * @param {String?} target
 * @return {Promise<Boolean>}
 */
const setupDir = async (root, target = 'source') => {
    const parts = root.indexOf(path.sep) !== -1
        ? root.split(path.sep)
        : [root]
    if (!path.isAbsolute(parts[0])) parts[0] = join(process.cwd(), parts[0])
    if (!fs.existsSync(parts[0])) {
        warn(`"${root}" doesn't look like a valid ${target} directory.`)
        const ok = await confirm(`Would you like staki to create the ${root} for you?`)
        if (!ok) {
            warn(`You should manually setup the ${target} dir in your ${STAKI} section of the ${PKG}`)
            return false
        }
        parts.reduce((acc, part) => {
            acc = join(acc, part)
            mkDir(acc)
            inline(`${root} created...`)
            logOK()

            return acc
        }, '')
    }
}

/**
 * @name mkDir
 * @description creates the requested directories (src | dest)
 * @param {String} root
 * @param {String?} target
 */
const mkDir = (root, target = 'source') => {
    const pth = path.isAbsolute(root) ? root : join(process.cwd(), root)
    try {
        fs.mkdirSync(pth)
    } catch (err) {
        throwErr(`Couldn't create ${target} directory. Reason: ${err.message}`)
    }
}


/**
 * @name interactiveFail
 * @description Logs a 'whatever' message when shit happens
 * @param {Error} err
 */
const interactiveFail = err => {
    console.error(`System failure while processing interactive data collection. \nReason ${err.message}`)
    process.exit(1)
}

/**
 * @name findPackage
 * @description checks for a package.json in the "root" directory
 * @param {String} root
 * @param {Boolean?} throwError
 * @returns {boolean}
 */
const findPackage = (root, throwError = true) => {
    if (!fs.existsSync(join(root, PKG))) {
        if (throwError) throwErr(` No valid ${PKG} file found in ${root}.`)
        else return false
    }
    return true
}

/**
 * @name cond
 * @description if v2 is a functions, returns the result of v2(v1)
 * if v2 is falsy, it returns truthiness of v1
 * else returns the equality
 * @param {String | Number | Boolean ?} v1
 * @param {String | Number | Boolean | Function ?} v2
 * @return {boolean}
 */
const cond = (v1, v2) => {
    if (!v1) return false
    if (typeof v2 === 'function') return v2(v1)
    return v2 ? v1 === v2 : !!v1
}

/**
 *
 * @param {Object?} opts
 * @param {String?} opts.root
 * @param {String?} opts.key
 * @param {Function | String | Number | Boolean ?} opts.value
 * @param {Boolean?} opts.package
 * @param {Boolean?} opts.throwErr
 * @returns {string | object | boolean}
 */
const pkgTreeUp = (opts = {}) => {

    let cursor = opts.root || process.cwd()

    do {
        if (findPackage(cursor, false)) {
            const pkg = readJson(join(cursor, PKG), PKG)
            if (
                (!opts.key) ||
                (opts.key && !opts.value && pkg[opts.key]) ||
                (cond(pkg[opts.key], opts.value))
            ) return opts.package ? pkg : cursor
        }
        cursor = path.dirname(cursor)
    }
    while (cursor !== '/')
    if (opts.throwErr === false) return false
    if (!opts.key)
        throwErr(`Couldn't find recursively, starting from ${opts.root} directory, any valid ${PKG} file.`)
    if (opts.value)
        throwErr(`Couldn't find recursively, starting from ${opts.root} directory, any ${PKG} whose ${opts.key}` +
            ` key satisfies the ${opts.value} condition.`)
    else throwErr(`Couldn't find recursively, starting from ${opts.root} directory, any ${PKG} ` +
        `containing the ${opts.key} key.`)
}

/**
 *
 * @param {String} msg
 * @param {String?} color
 * @param {Boolean?} verbose
 */
const inline = (msg, color, verbose = true) => {
    if (!msg.trim()) noMsg()
    if (!verbose) return
    if (color) msg = chalk[color](msg)
    process.stdout.write(msg)
}

/**
 *
 * @param {String} msg
 * @param {String?} color
 * @param {Boolean?} verbose
 */
const log = (msg, color, verbose = true) => {
    if (!msg.trim()) noMsg()
    if (!verbose) return
    if (color) msg = chalk[color](msg)
    console.log(msg)
}

/**
 * @name logOk
 */
const logOK = () => {
    log('OK', GREEN)
}


/**
 * @name silentMkDir
 * @description creates a directory if it doesn't exist
 * @param {string} d
 * @param {Boolean} verbose
 */
const silentMkDir = (d, verbose = false) => {
    const destDir = path.isAbsolute(d) ? d : join(process.cwd(), d)
    if (!fs.existsSync(d)) {
        const displayDest = path.isAbsolute(d) ? path.relative(process.cwd(), d) : d
        if (verbose) warn(`${displayDest} doesn't exists. It will be automatically created.`)
        fs.mkdirSync(destDir)
    }
}

module.exports = {
    readJson,
    writeJson,
    findPackage,
    findProjectRoot: pkgTreeUp,
    interactiveFail,
    pkgTreeUp,
    throwErr,
    noMsg,
    warn,
    inline,
    log,
    logOK,
    mkDir,
    silentMkDir
}