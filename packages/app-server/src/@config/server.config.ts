import {GLOBAL_CONFIGS} from "./global.config";

// Globals
export const APP_NAME: string = GLOBAL_CONFIGS['GLOBAL'].appName;
export const APP_DOMAIN: string = GLOBAL_CONFIGS['GLOBAL'].appDomain
export const SERVER_URL = `http://${process.env['SERVER_HOST']}:${process.env['SERVER_PORT']}`
export const ADMIN_CONTACT = `${GLOBAL_CONFIGS['GLOBAL']}@${APP_DOMAIN}`;

// Language settings
export const LANGS: string[] = GLOBAL_CONFIGS['GLOBAL'].langs;
export const DEFAULT_LANG = LANGS[0];