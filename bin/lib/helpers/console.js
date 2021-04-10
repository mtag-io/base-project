import chalk from 'chalk'
import {DEVERR, RUNERR} from '../constants'

const {magenta, red, yellow} = chalk

/**
 * @name noMsg
 * @description throws an error if an exception without message is raised
 */
export const noMsg = () => {
    throw new Error(`${magenta(DEVERR)}: Raised error without message`)
}

/**
 * @name throwErr
 * @description throws an error logging the msg
 * @param {String} msg
 * @param {String?} kind
 */
export const throwErr = (msg, kind = RUNERR) => {
    if (!msg.trim()) noMsg()
    throw new Error(`${red(kind)}: ${msg}`)
}

/**
 * @name warn
 * @description warns by logging the msg
 * @param {String} msg
 */
export const warn = msg => {
    if (!msg.trim()) noMsg()
    console.log(`${yellow('WARN:')} ${msg}`)
}