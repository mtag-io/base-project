import {join} from 'path'
import express from'express'
import {findRoot, readJson} from '../../lib/helpers/fs'
import {throwErr} from '../../lib/helpers/console'
import {getStaticComponents, setupHook} from './helpers'
import {PKG} from '../../lib/constants'

export const setupHooks = () => {

    let modelPath = ''
    const ws = true
    let [pkg] = findRoot(ws)

    if (!pkg['wsMap'])
        throwErr('Root package json has no wsMap key meaning you should run the "ini -m" command first to map the packages')


    try {
        modelPath = Object.values(pkg['wsMap']).reduce((acc, p) => {
            const pkg = readJson(join(p, PKG))
            if (pkg['ssg']) acc = join(p, pkg['ssg']['modelPath' || 'api'])
            return acc
        }, '')
        if(!modelPath)
            throwErr('No static server found. Please set the "ssg" key to true in the static server\'s package.json file and')
    } catch(e) {
        throwErr(e)
    }

    Object.values(pkg['wsMap']).forEach(
        root => {
            getStaticComponents(root).forEach(
                comp => {
                    setupHook(comp, modelPath)
                }
            )
        }
    )
}

const ssgWatch = () => {
    const app = express()
    app.use(express.json())
    const {SSG_PORT} = process.env


    app.listen(SSG_PORT, () => {
        console.log(`SSG server started on ${SSG_PORT}`)
    })

    app.get('/', async (req, res) => {
        const {pkg, model} = req.body
        res.send({success: true})
        await
    })
}