import {join, resolve, basename} from "path";
import {ensureDir} from 'fs-extra'
import {DIRS} from "./worker.config";

const DOT = '.'

export const setDest = async (): Promise<{dest: string}> => {
    const dest = resolve(join(DIRS.STORAGE, DIRS.TMP))
    await ensureDir(dest)
    return {dest}
}

export const solveWidgetDir = (fn: string): string => {
    fn = basename(fn)
    if(fn.includes(DOT))
        fn = fn.split(DOT).slice(0, -1).join('')
    fn = fn.replace(/[0-9]+$/, '')
    if(['-', '_', '.'].includes(fn[fn.length - 1]))
        fn = fn.slice(0, -1)
    return fn
}