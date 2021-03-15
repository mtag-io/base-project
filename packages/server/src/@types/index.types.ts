import {ROLES} from "../auth/auth.config";
import {ACTIONS} from "../@config/actions.config";

const ActionType = [...Object.keys(ACTIONS)] as const
export type Actions = typeof ActionType[number]

const RolesType = [...Object.keys(ROLES)] as const
export type Roles = typeof RolesType[number]