#!/usr/local/bin/node

import {collector} from'./lib/collector'
import {cli} from'./lib/cli'
import chalk from'chalk'
import {version} from'./package.json'

cli.version(version, '-v, --ver', 'display the current ver')

collector().forEach(
    comData => cli.addCommand(comData)
)

console.log(chalk.blue('Clipper- house keeper project manager - (C) 2020 by bitbrother'))
cli.parse(process.argv)