import { User } from "../user/user.entity";
import { isAdmin } from "../auth/auth.helpers";
import { RestrictId, RestrictWhere } from "../@types/restrict-to.type";

export const restrictToId = (_id: number, user: User): RestrictId =>
  isAdmin(user) ? _id : { userId: user.userId };

export const restrictToWhere = (_id: number, user: User): RestrictWhere =>
  isAdmin(user) ? { _id } : { userId: user.userId };
