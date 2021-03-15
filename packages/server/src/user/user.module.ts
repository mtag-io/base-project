import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ProfileRepository } from "./profile.repository";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([UserRepository, ProfileRepository])
  ],
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService],
  exports: [UserService, ProfileService]
})

export class UserModule {
}