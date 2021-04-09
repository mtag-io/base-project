#!/usr/local/bin/node

const commandsData = require('./lib/collector')
const cli = require('./lib/cli')
const chalk = require('chalk')
const {version} = require('./package.json')

cli.version(version, '-v, --ver', 'display the current ver')

commandsData.forEach(
    comData => cli.addCommand(comData)
)

console.log(chalk.blue('Clipper- house keeper project manager - (C) 2020 by bitbrother'))
cli.parse(process.argv)