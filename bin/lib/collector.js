import * as glob from'glob'
import {COMMAND_GLOB, COMMAND_DIR} from'../config'

/**
 * @returns {string[]}
 */

export const collector = () => glob
    .sync(COMMAND_GLOB , {cwd: COMMAND_DIR, absolute: true})
    .map(pth => require(pth))
