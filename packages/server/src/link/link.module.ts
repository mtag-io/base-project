import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkRepository } from "./link.repository";
import { LinkService } from "./link.service";
import { PassportModule } from "@nestjs/passport";
import { LinkController } from "./link.controller";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([LinkRepository]),
    UserModule
  ],
  providers: [LinkService],
  controllers: [LinkController],
  exports: [LinkService]
})

export class LinkModule {
}