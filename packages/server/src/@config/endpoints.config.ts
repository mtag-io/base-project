import {controllerEndpoints} from '@fixpics/common'
import {GLOBAL_CONFIGS} from "./global.config";

export const ENDPOINTS = controllerEndpoints(GLOBAL_CONFIGS['ENDPOINTS'])
export const ROOT = '/'