import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { ACTIONS } from "../../@config/actions.config";
import {Actions} from "../../@types/index.types";

export class PartialLinkDto {

  @IsString()
  @IsOptional()
  userId?: string;

  @IsBoolean()
  @IsOptional()
  valid?: boolean;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsEnum(ACTIONS)
  @IsOptional()
  action?: Actions;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  expire?: Date;
}