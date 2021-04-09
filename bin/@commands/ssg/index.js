const {resolve} = require('path')
require('dotenv').config({path: resolve('../../.env')})
const express = require('express')
const config = require('../../../__config__/static.json')
const {createDestPaths} = require('./helpers')

const destPaths = createDestPaths(config)
const app = express()
app.use(express.json())
const {SSG_PORT} = process.env


app.listen(SSG_PORT, () => {
    console.log(`Sync server started on ${SSG_PORT}`)
})

app.get('/', (req) => {
    console.log(req.body, destPaths)
})