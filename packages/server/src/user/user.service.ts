import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { dbSuccess } from "../@helpers";
import { omit } from "@base-project/common"
import { ACTIVATE } from "../@constants";
import { ROLES } from "../auth/auth.config";
import { CreateUserDto } from "./@types/create-user.dto";
import { User } from "./user.entity";
import { PartialUserDto } from "./@types/partial-user.dto";
import { AuthDto } from "../auth/@types/auth.dto";
import { ProfileService } from "./profile.service";
import { PROFILE_REJECTED_FIELDS } from "./profile.config";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService
  ) {
  }

  async activation(userId: string, active: string = ACTIVATE): Promise<boolean> {
    const ok = await this.userRepository.update(
      { userId },
      { active: active === ACTIVATE });
    return dbSuccess(ok);
  }

  async promoteAdmin(userId: string): Promise<boolean> {
    const ok = await this.userRepository.update(
      { userId },
      { role: ROLES.ADMIN });
    return dbSuccess(ok);
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createUser(createDto);
    const profile = await this.profileService.createProfile(user);
    user.profile = omit(profile, PROFILE_REJECTED_FIELDS);
    return user;
  }

  async updateUser(userId: string, PartialUserDto: PartialUserDto): Promise<boolean> {
    const res = await this.userRepository.updateUser(userId, PartialUserDto);
    return dbSuccess(res);
  }

  async removeUser(userId: string): Promise<boolean> {
    const res = this.userRepository.delete({ userId });
    return dbSuccess(res);
  }

  async getUser(filter: any): Promise<User | void> {
    const user: User | void = await this.userRepository.findOne({
      where: filter,
      relations: ["profile"]
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getUsers(filter: PartialUserDto): Promise<User[]> {
    return this.userRepository.find({
      where: filter,
      relations: ["profile"]
    });
  }

  async validateUser(authDto: AuthDto): Promise<User | void> {
    return this.userRepository.validateUser(authDto);
  }
}
