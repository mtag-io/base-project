import { User } from "../../user/user.entity";

export class AuthResponseDto {

  user: User;

  accessToken: string;

  refreshToken: string;
}
