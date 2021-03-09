import {controllerEndpoints} from '@base-project/common'
import {GLOBAL_CONFIGS} from "./global.config";

export const ENDPOINTS = controllerEndpoints(GLOBAL_CONFIGS['ENDPOINTS'])
export const ROOT = '/'