import { IsEnum, IsString } from "class-validator";
import { ACTIONS } from "../../@config/actions.config";
import {Actions} from "../../@types/index.types";

export class CreateLinkDto {

  @IsString()
  userId: string;

  @IsEnum(ACTIONS)
  action: Actions;
}
