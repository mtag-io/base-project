/**
 * @module initialize
 * @category command
 * @description staki specific project initialization cli tool
 * @file ini/index.js
 */

const path = require('path')
const inquirer = require('inquirer')
const queries = require('./queries')
const {log, interactiveFail} = require('../../lib/helpers')
const {GREEN} = require('../../lib/constants')

module.exports = {
    short: 'ini',
    long: 'initialize',
    command: 'ini [dir]',
    description: [
        'ini command',
        {
            dir: 'project directory. (if omitted, current directory will be assumed)',
        }],

    /**
     * @name action
     * @description project initialisation command utility
     * @param {String} dir
     * @return {Promise<void>}
     */
    action: async dir => {
        log('Initializing new project...', GREEN)
        let queryData = null
        try {
            queryData = await inquirer.prompt(queries)
        } catch (err) {
            interactiveFail(err)
        }

        const root = setupDir(dir)

        getGit(dir, tpl)

        const pkgs = getPackages(root)

        updatePackages(pkgs, queryData)

        log('Setup ready.', GREEN)
        if (root !== process.cwd()) log(`cd into ${path.basename(path.dirname(root))}`)
        log('Run "yarn install" to proceed')
    }
}