import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/user.entity";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET")
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