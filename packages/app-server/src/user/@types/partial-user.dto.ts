import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { ROLES } from "../../auth/auth.config";
import {Roles} from "../../@types/index.types";

export class PartialUserDto extends PartialType(CreateUserDto) {

  @IsString()
  @IsOptional()
  userId?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  refreshHash?: string;

  @IsString()
  @IsOptional()
  refreshExp?: Date;

  @IsEnum(ROLES)
  @IsOptional()
  role?: Roles;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  lastLogin?: Date;
}