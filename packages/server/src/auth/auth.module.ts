import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./@strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { jwtConfigure } from "./auth.config";
import passportConfig from "../@config/passport.config";
import { LinkModule } from "../link/link.module";
import { NotificationModule } from "../notification/notification.module";
import {GoogleStrategy} from "./@strategies/google.strategy";

@Module({
  imports: [
    PassportModule.register(passportConfig),
    JwtModule.register(jwtConfigure),
    UserModule,
    LinkModule,
    NotificationModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {
}