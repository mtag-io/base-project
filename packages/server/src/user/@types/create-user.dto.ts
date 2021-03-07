import { PasswordValidator } from "../../auth/@validation/paassword.validation";
import { IsEmail } from "class-validator";

export class CreateUserDto {

  @IsEmail()
  email: string;

  @PasswordValidator()
  password: string;
}
