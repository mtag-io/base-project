import {dirname, join, sep} from 'path'
import {existsSync, statSync, writeFileSync} from 'fs'
import glob from 'glob'
import {hookFile} from './hook'
import {STATIC_PROPS_FILE} from './config'


export const getStaticComponents = root =>
    glob.sync(`**/${STATIC_PROPS_FILE}`, {cwd: root})
        .reduce(   (acc, pth) => {
            acc[dirname(pth).split(sep).pop()] = pth
            return acc
        })

export const hookPath = (comp, modelPath, models = 'models') => {
    if (existsSync(join(modelPath, comp)) && statSync(join(modelPath, comp)).isDirectory())
        return join(modelPath, comp, models, comp + '.js')
    comp = comp.replace(/([A-Z])/g, (c, _, idx) => !idx
        ? c.toLowerCase()
        : '-' + c.toLowerCase()
    )
    if (existsSync(join(modelPath, comp)) && statSync(join(modelPath, comp)).isDirectory())
        return join(modelPath, comp, models, comp + '.js')
}

export const setupHook = (comp, modelPath) => {
    writeFileSync(
        hookPath(comp, modelPath),
        hookFile)
}

const refreshStaticComponent = comp => {

}