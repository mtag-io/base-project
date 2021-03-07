import { PasswordValidator } from "../@validation/paassword.validation";
import { IsEmail } from "class-validator";

export class AuthDto {

  @IsEmail()
  email: string;

  @PasswordValidator()
  password: string;
}
