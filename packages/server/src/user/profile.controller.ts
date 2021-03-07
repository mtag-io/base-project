import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Role } from "../auth/@decorators/roles.decorator";
import { ROLES } from "../auth/auth.config";
import { HttpData, HttpSuccess } from "../@types/http.types";
import { httpData, httpSuccess } from "../@helpers";
import { PartialProfileDto } from "./@types/partial-profile.dto";
import { UserService } from "./user.service";
import { GetUser } from "./@decorators/get-user.decorator";
import { User } from "./user.entity";
import { restrictToId } from "../@helpers/types";
import { RestrictId } from "../@types/restrict-to.type";
import {isAdmin} from "../auth/auth.helpers";

@Controller("profile")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService
  ) {
  }

  @Post("/")
  @Role(ROLES.ADMIN)
  async createProfile(
    @Body() profileDto: PartialProfileDto): Promise<HttpData> {
    const user = await this.userService.getUser({ userId: profileDto.userId });
    if (!user) throw  new NotFoundException("User not found.");
    const profile = await this.profileService.createProfile(user, profileDto);
    return httpData(profile);
  }

  @Patch("/:_id")
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async updateProfile(
    @GetUser() user: User,
    @Param("_id") _id: number,
    @Body() partialDto: PartialProfileDto): Promise<HttpSuccess> {
    const filter: RestrictId = restrictToId(_id, user);
    const ok = await this.profileService.updateProfile(filter, partialDto);
    if (ok) return httpSuccess("Profile data updated");
    throw new NotFoundException("Profile not found");
  }

  @Delete("/:_id")
  @Role(ROLES.ADMIN)
  async removeProfile(
    @Param("_id") _id: number
  ): Promise<HttpSuccess> {
    const ok = await this.profileService.removeProfile(_id);
    if (ok) return httpSuccess("Profile deleted");
    throw new NotFoundException("No profile found");
  }

  @Get("/:_id")
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async getProfile(
    @GetUser() user: User,
    @Param("_id") _id: number
  ): Promise<HttpData> {
    const filter = !isAdmin(user) ? { userId: user.userId } : { _id };
    const profile = await this.profileService.getProfile(filter);
    return httpData(profile);
  }

  @Get("/")
  @Role(ROLES.ADMIN)
  async getProfiles(
    @Body() filter: PartialProfileDto = {}
  ): Promise<HttpData> {
    const profile = await this.profileService.getProfiles(filter);
    return httpData(profile);
  }
}
