import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {API_KEY_OVERRIDE} from "../auth.config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor() {
    }

    canActivate(context: ExecutionContext): boolean {
        // get the request object
        const request = context.switchToHttp().getRequest();
        // if an override is present skip the rest
        return API_KEY_OVERRIDE ||
            // if no api key is present reject
            request.headers["api-key"] &&
            // if the api key has been messed with reject
            request.headers["api-key"] === process.env["API_KEY"];
    }
}