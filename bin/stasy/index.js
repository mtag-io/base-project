require('dotenv').config()
const express = require('express')
const config = require('../../__config__/static.json')
const {createDestPaths} = require('./helpers')

const destPaths = createDestPaths(config)
const app = express()
app.use(express.json())
const {STASY_PORT} = process.env


app.listen(STASY_PORT, () => {
    console.log(`Sync server started on ${STASY_PORT}`)
})

app.get('/', (req) => {
    console.log(req.body, destPaths)
})