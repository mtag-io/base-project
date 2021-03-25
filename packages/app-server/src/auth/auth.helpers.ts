import {User} from "../user/user.entity";
import {ROLES} from "./auth.config";

export const isAdmin = (user: User) => user.role && user.role === ROLES.ADMIN;