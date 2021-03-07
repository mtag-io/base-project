import { Module } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PresetController } from './preset.controller';
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PresetRepository} from "./preset.repository";

@Module({
  imports:[
      TypeOrmModule.forFeature([PresetRepository]),
      PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [PresetController],
  providers: [PresetService]
})
export class PresetModule {}
