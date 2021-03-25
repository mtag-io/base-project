import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {UnauthorizedException} from "@nest/core";

export const GetRefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if(request.headers && request.headers('authorization'))
        return request.headers('authorization').slice(7)
    throw new UnauthorizedException('Unauthorized access.')
  }
);