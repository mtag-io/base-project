require('dotenv').config()
const express = require('express')
const config = require('../../__config__/static.json')
const {createDestPaths} = require('./helpers')

const destPaths = createDestPaths(config)
const app = express()
app.use(express.json())
const {STATIC_SYNC_PORT} = process.env


app.listen(STATIC_SYNC_PORT, () => {
    console.log(`Sync server started on ${STATIC_SYNC_PORT}`)
})

app.get('/', (req) => {
    console.log(req.body, destPaths)
})