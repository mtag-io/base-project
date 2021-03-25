import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../@constants";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles || !roles.length) return true;
    const request = context.switchToHttp().getRequest();
    return roles.some(r => r === request.user.role);
  }
}