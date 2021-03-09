import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { PasswordValidator } from "../@validation/paassword.validation";

export class ResetPasswordDto {

  @IsString()
  @ApiProperty()
  hash: string;

  @PasswordValidator()
  @ApiProperty()
  password: string;

}