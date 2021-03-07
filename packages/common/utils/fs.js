const {readFileSync, readFile} = require("fs");

const readJson = (fl = "./package.json") => {
    return JSON.parse(readFileSync(fl, "utf8"));
}

const readJsonAsync = async (fl = "./package.json") => {
    const raw = await readFile(fl, "utf8")
    return JSON.parse(raw)
}

module.exports  = {
    readJson
}