import { IsBoolean, IsEnum, IsString } from "class-validator";
import { StringOrNumber } from "../../@validation/string-or-numbrer.validation";
import { ACTIONS } from "../../@config/actions.config";
import {Actions} from "../../@types/index.types";

export class CreateNotificationDto {

  @StringOrNumber()
  userId: string;

  @IsEnum(ACTIONS)
  action: Actions;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsString()
  context: string;

  @IsBoolean()
  read: boolean;
}
