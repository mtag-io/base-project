// global config settings
import {join} from "path"
import {readJson} from "commloc/back";

const GLOBAL_CONFIG_DIR = '__config__'
const REQUIRED_CONFIGS = [
    "global",
    "auth",
    "actions",
    "worker",
    "endpoints",
    "theme"
]

const createGlobalConfig = () => {
    const tmp = {}
    REQUIRED_CONFIGS.forEach(cfgFile => {
        tmp[cfgFile.toUpperCase()] = readJson(join(GLOBAL_CONFIG_DIR, cfgFile + '.json'))
    })
    return tmp
}

export const GLOBAL_CONFIGS = createGlobalConfig()