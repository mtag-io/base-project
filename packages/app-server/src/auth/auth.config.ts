import {GLOBAL_CONFIGS} from "../@config/global.config";
import {APP_DOMAIN} from "../@config/server.config";
import {upperKeys} from "back-common"

export const AUTH_DAEMON_CONTACT = `${GLOBAL_CONFIGS['GLOBAL']}@${APP_DOMAIN}`;
export const APP_OPEN_AUTH = GLOBAL_CONFIGS['AUTH'].openAuth;

export const ROLES = upperKeys(GLOBAL_CONFIGS['AUTH']['roles'])

export const USER_REJECTED_FIELDS = [
    "refreshToken",
    "_id", "createdAt",
    "refreshHash",
    "refreshExp",
    "verified",
    "active"];

export const PASSWORD_REGEXP = new RegExp(GLOBAL_CONFIGS['AUTH']['passwordRegexp'])
export const JWT_PAYLOAD_FIELDS = ["userId"];
export const API_KEY_OVERRIDE = true;

export const jwtConfigure = {
    secret: process.env["JWT_SECRET"],
    signOptions: {expiresIn: process.env["JWT_EXPIRATION"]}
};

export const apiKey = process.env["API_KEY"] || ''