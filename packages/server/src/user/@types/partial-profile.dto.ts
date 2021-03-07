import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class PartialProfileDto {

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @MaxLength(2)
  @MinLength(2)
  @IsOptional()
  lang?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}