import { Injectable } from "@nestjs/common";
import { Profile } from "./profile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "./profile.repository";
import { dbSuccess } from "../@helpers";
import { PartialProfileDto } from "./@types/partial-profile.dto";
import { User } from "./user.entity";
import { RestrictId, RestrictWhere } from "../@types/restrict-to.type";

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {
  }

  async createProfile(user: User, profileDto: PartialProfileDto = {}): Promise<Profile> {
    const profile = this.profileRepository.create();
    profile.user = user;
    Object.keys(profileDto).forEach(k => profile[k] = profileDto[k]);
    if (!profile.avatar) profile.avatar = "";
    return profile.save();
  }

  async updateProfile(filter: RestrictId, partialDto: PartialProfileDto): Promise<boolean> {
    const res = this.profileRepository.update(filter, partialDto);
    return dbSuccess(res);
  }


  async removeProfile(filter: RestrictId): Promise<boolean> {
    const res = this.profileRepository.delete(filter);
    return dbSuccess(res);
  }

  async getProfile(filter: RestrictWhere): Promise<Profile> {
    return this.profileRepository.findOne(
      { where: filter, relations: ["user"] });
  }

  async getProfiles(filter: PartialProfileDto): Promise<Profile[]> {
    return this.profileRepository.find(
      { where: filter, relations: ["user"] });
  }
}
