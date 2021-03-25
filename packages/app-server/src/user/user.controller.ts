import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { HttpData, HttpSuccess } from "../@types/http.types";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/@guards/roles.guard";
import { Role } from "../auth/@decorators/roles.decorator";
import { CreateUserDto } from "./@types/create-user.dto";
import { httpData, httpSuccess } from "../@helpers";
import { ROLES } from "../auth/auth.config";
import { PartialUserDto } from "./@types/partial-user.dto";
import { UserService } from "./user.service";
import { GetUser } from "./@decorators/get-user.decorator";
import { User } from "./user.entity";
import {isAdmin} from "../auth/auth.helpers";
import { ENDPOINTS, ROOT } from "../@config/endpoints.config";

@Controller(ENDPOINTS.USER)
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post(ROOT)
  @Role(ROLES.ADMIN)
  async createUser(
    @Body() createDto: CreateUserDto): Promise<HttpData> {
    const user = await this.userService.createUser(createDto);
    return httpData(user);
  }

  @Patch(`${ROOT}:userId`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async updateUser(
    @GetUser() user: User,
    @Param("userId") userId: string,
    @Body() PartialUserDto: PartialUserDto): Promise<HttpSuccess> {
    if (!isAdmin(user)) userId = user.userId;
    const ok = await this.userService.updateUser(userId, PartialUserDto);
    if (ok) return httpSuccess("User data updated");
    throw new NotFoundException("User not found");
  }

  @Delete(`${ROOT}:userId`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async deleteUser(
    @GetUser() user: User,
    @Param("userId") userId: string
  ): Promise<HttpSuccess> {
    if (!isAdmin(user)) userId = user.userId;
    const ok = await this.userService.removeUser(userId);
    if (ok) return httpSuccess("User deleted");
    throw new NotFoundException("No user found");
  }

  @Get(`${ROOT}:userId`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async getUser(
    @GetUser() user: User,
    @Param("userId") userId: string
  ): Promise<HttpData> {
    if (!isAdmin(user)) userId = user.userId;
    const _user = await this.userService.getUser({ userId });
    return httpData(_user);
  }

  @Get(ROOT)
  @Role(ROLES.ADMIN)
  async getAll(@Query() filter: PartialUserDto): Promise<HttpData> {
    const users = await this.userService.getUsers(filter);
    return httpData(users);
  }
}