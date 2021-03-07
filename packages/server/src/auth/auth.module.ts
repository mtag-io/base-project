import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { jwtConfigure } from "./auth.config";
import passportConfig from "../@config/passport.config";
import { LinkModule } from "../link/link.module";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [
    PassportModule.register(passportConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtConfigure,
      inject: [ConfigService]
    }),
    UserModule,
    LinkModule,
    NotificationModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {
}