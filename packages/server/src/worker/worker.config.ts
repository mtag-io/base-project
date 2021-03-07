import {upperKeys} from "@fixpics/common"
import {GLOBAL_CONFIGS} from "../@config/global.config";

export const CHANNEL = "server"
// export const CHANNELS = {
//     SERVER: "server"
// }

export const DIRS = upperKeys(GLOBAL_CONFIGS['WORKER']['dirs'])

//export const THUMB_WIDTH = GLOBAL_CONFIGS['WORKER']['thumb_width']