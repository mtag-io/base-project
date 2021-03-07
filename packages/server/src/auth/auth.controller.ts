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
import { ENDPOINTS } from "src/@config/endpoints.config";

@Controller(ENDPOINTS.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
  }

  @UseInterceptors(AuthResponseInterceptor)
  @HttpCode(200)
  @Post(ENDPOINTS.AUTH_SIGNIN)
  signin(
    @Body()  authDto: AuthDto): any {
    return this.authService.signin(authDto);
  }

  @UseInterceptors(AuthResponseInterceptor)
  @Post(ENDPOINTS.AUTH_SIGNUP)
  async signup(
    @Body() authDto: AuthDto): Promise<AuthResponseDto | HttpSuccess> {
    return await this.authService.signup(authDto);
  }

  @Get(`${ENDPOINTS.AUTH_EMAIL_VERIFY_REQUEST}/:userId`)
  async verifyEmailRequest(
    @Param("userId") userId: string) {
    return await this.authService.verifyEmailRequest(userId);
  }

  @Get(`${ENDPOINTS.AUTH_EMAIL_VERIFY_ACCESS}/:link`)
  async verifyEmailAccess(@Param("link") link: string): Promise<HttpSuccess> {
    return await this.authService.verifyEmailAccess(link);
  }

  @Get(`${ENDPOINTS.AUTH_PASSWORD_RESET_REQUEST}/:email`)
  async resetPasswordRequest(@Param("email") email: string): Promise<HttpSuccess> {
    return await this.authService.resetPasswordRequest(email);
  }

  @Get(`${ENDPOINTS.AUTH_PASSWORD_RESET_ACCESS}/:hash`)
  async resetPasswordAccess(@Param() params) {
    const { hash } = params;
    return await this.authService.resetPasswordAccess(hash);
  }

  @Post(`${ENDPOINTS.AUTH_PASSWORD_RESET}`)
  async resetPasswordSubmit(
    @Body() resetPasswordDto: ResetPasswordDto): Promise<HttpSuccess> {
    return await this.authService.resetPasswordSubmit(resetPasswordDto);
  }

  @Get(`${ENDPOINTS.AUTH_ACTIVATE}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async activate(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.activation(id))
      return httpSuccess("User account activated");
    else throw new NotFoundException("User not found");
  }

  @Get(`${ENDPOINTS.AUTH_DEACTIVATE}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async deactivate(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.activation(id, DEACTIVATE))
      return httpSuccess("User account deactivated");
    throw new NotFoundException("User not found");
  }

  @Get(`${ENDPOINTS.AUTH_PROMOTE_ADMIN}/:id`)
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(ROLES.ADMIN)
  async promoteAdmin(@Param("id") id: string): Promise<HttpSuccess | void> {
    if (await this.userService.promoteAdmin(id))
      return httpSuccess("User account promoted to admin");
    throw new NotFoundException("User not found");
  }

  @Get(ENDPOINTS.AUTH_REFRESH)
  async refresh(
      @GetRefreshToken() token: string
  ){
    return this.authService.refreshToken(token)
  }
}
