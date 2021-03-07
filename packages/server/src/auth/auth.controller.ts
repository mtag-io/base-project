import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./@types/auth.dto";
import { ROLES } from "./auth.config";
import { AuthResponseInterceptor } from "./auth-response.interceptor";
import { Role } from "./@decorators/roles.decorator";
import {
  ACCESS,
  ACTIVATE,
  AUTH,
  DEACTIVATE,
  EMAIL_VERIFY_EMAIL,
  PROMOTE_ADMIN,
  REQUEST,
  RESET_PASSWORD
} from "../@constants";
import { HttpSuccess } from "../@types/http.types";
import { httpSuccess } from "../@helpers";
import { UserService } from "../user/user.service";
import { ResetPasswordDto } from "./@types/reset-password.dto";
import { AuthResponseDto } from "./@types/auth-response.dto";
import { RolesGuard } from "./@guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import {GetRefreshToken} from "./@decorators/get-refresh-token.decorator";

@Controller(AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }

  @UseInterceptors(AuthResponseInterceptor)
  @HttpCode(200)
  @Post("/signin")
  signin(
    @Body()  authDto: AuthDto): any {
    return this.authService.signin(authDto);
  }

  @UseInterceptors(AuthResponseInterceptor)
  @Post("/signup")
  async signup(
    @Body() authDto: AuthDto): Promise<AuthResponseDto | HttpSuccess> {
    return await this.authService.signup(authDto);
  }

  @Get(`${EMAIL_VERIFY_EMAIL}/:userId`)
  async verifyEmailRequest(
    @Param("userId") userId: string) {
    return await this.authService.verifyEmailRequest(userId);
  }

  @Get(`/${EMAIL_VERIFY_EMAIL}/:link`)
  async verifyEmailAccess(@Param("link") link: string): Promise<HttpSuccess> {
    return await this.authService.verifyEmailAccess(link);
  }

  @Get(`/${RESET_PASSWORD}/${REQUEST}/:email`)
  async resetPasswordRequest(@Param("email") email: string): Promise<HttpSuccess> {
    return await this.authService.resetPasswordRequest(email);
  }

  @Get(`/${RESET_PASSWORD}/${ACCESS}/:hash`)
  async resetPasswordAccess(@Param() params) {
    const { hash } = params;
    return await this.authService.resetPasswordAccess(hash);
  }

  @Post(`/${RESET_PASSWORD}`)
  async resetPasswordSubmit(
    @Body() resetPasswordDto: ResetPasswordDto): Promise<HttpSuccess> {
    return await this.authService.resetPasswordSubmit(resetPasswordDto);
  }

  @Get(`${ACTIVATE}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async activate(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.activation(id))
      return httpSuccess("User account activated");
    else throw new NotFoundException("User not found");
  }

  @Get(`${DEACTIVATE}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async deactivate(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.activation(id, DEACTIVATE))
      return httpSuccess("User account deactivated");
    throw new NotFoundException("User not found");
  }

  @Get(`${PROMOTE_ADMIN}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async promoteAdmin(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.promoteAdmin(id))
      return httpSuccess("User account promoted to admin");
    throw new NotFoundException("User not found");
  }

  @Get('refresh')
  async refresh(
      @GetRefreshToken() token: string
  ){
    return this.authService.refreshToken(token)
  }
}
