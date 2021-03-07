import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import {GLOBAL_CONFIGS} from "../@config/global.config";
import {APP_DOMAIN} from "../@config/server.config";
import {upperKeys} from "@fixpics/common"

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

export const jwtConfigure = async (configService: ConfigService): Promise<JwtModuleOptions> =>
    ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRATION") }
    });