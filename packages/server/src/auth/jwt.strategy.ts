import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET"]
    });
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(payload: Record<string, any>): Promise<User> {
    const { userId } = payload;
    const user = await this.userService.getUser({ userId });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}