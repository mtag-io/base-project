import {readFileSync, readFile} from "fs-extra";

export const readJson = (fl = "./package.json") => {
    return JSON.parse(readFileSync(fl, "utf8"));
}

export const readJsonAsync = async (fl = "./package.json") => {
    const raw = await readFile(fl, "utf8")
    return JSON.parse(raw)
}

