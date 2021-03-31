
require('dotenv').config()
const {join} = require('path')
const fs = require('fs')
const express = require('express')
const axios = require('axios')
const {packages, dataFile, dest} = require('../../../__config__/static.json')
const {createDestPaths} = require('../../lib/helpers')

const stasyPort = process.env['STASY_PORT']
const staticUrl = `http://${process.env['STATIC_HOST']}:${process.env['STATIC_PORT']}`

const destPaths = createDestPaths(packages, {
    dest,
    dataFile
})
const app = express()
app.use(express.json())

app.listen(stasyPort, () => {
    console.log(`STASY server started on ${stasyPort}`)
})

app.post('/', async (req, res) => {
    const {app, entity} = req.body
    const url = `${staticUrl}/${entity}?app.name=${app}`

    try {
        const {data} = await axios.get(url)
        const pth = join(destPaths[app], dest, entity,dataFile)
        fs.writeFileSync(pth, JSON.stringify(data, null, 2))
    } catch (e) {
        console.error('STASYERR: ', e.message)
        res.send({
            success: false,
            error: e.message
        })
    }
    res.send({success: true})
})