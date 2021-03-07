import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { ERR_DUPLICATE_ENTRY } from "../@constants";
import { CreateUserDto } from "./@types/create-user.dto";
import { PartialUserDto } from "./@types/partial-user.dto";
import { uuid } from "@fixpics/common";
import { AuthDto } from "../auth/@types/auth.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getFullUser(filter): Promise<User> {
    return await this.createQueryBuilder("user")
      .select("user")
      .addSelect("user.password")
      .addSelect("user.salt")
      .where(filter)
      .leftJoinAndSelect("user.profile", "profile")
      .getOne();
  }

  async validateUser(authDto: AuthDto): Promise<User | null> {
    // get the relevant data from the @types
    const { email, password } = authDto;
    // check if a user with this email exists
    const user = await this.getFullUser({ email });
    // validate the password
    if (user && await user.validatePassword(password)) {
      // return the user
      return user;
      // return null if nu user is found or the passwords don't match
    } else return null;
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    // get the fields
    const { password, email } = createDto;
    // create a new user entity
    const user: User = this.create();
    // add the email field
    user.email = email;
    user.userId = uuid();
    // hash the password
    await user.hashPassword(password);
    try {
      // save the user in the database
      return await user.save();
    } catch (err) {
      // check for duplicate user
      if (err.code === ERR_DUPLICATE_ENTRY) {
        throw new ConflictException(`A user with this email has already been registered.`);
      } else {
        // prevent unhandled promise rejection propagation
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(userId: string, PartialUserDto: PartialUserDto): Promise<Record<string, any>> {

    // if there's a new password, hash it
    if (PartialUserDto.password) {
      const _usr = this.create();
      await _usr.hashPassword(PartialUserDto.password);
      const { password, salt } = _usr;
      return await this.update({ userId }, { ...PartialUserDto, password, salt });
    }

    // if the email changes invalidate email verification
    if (PartialUserDto.email) PartialUserDto.verified = false;

    return await this.update({ userId }, { ...PartialUserDto });
  }
}