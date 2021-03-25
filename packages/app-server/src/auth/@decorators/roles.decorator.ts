import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../../@constants";

export const Role = (roles: string | string[]) =>
  typeof roles === "string"
    ? SetMetadata(ROLES_KEY, [roles])
    : SetMetadata(ROLES_KEY, roles);
