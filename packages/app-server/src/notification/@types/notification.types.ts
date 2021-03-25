import { User } from "../../user/user.entity";
import { PartialType } from "@nestjs/swagger";
import {Actions} from "../../@types/index.types";

export class CreateNotification {

  user: User;

  action: Actions;

  hash?: string;

  context?: string;

  message?: string;

  subject?: string;

  read?: boolean;

}

export class PartialNotification extends PartialType(CreateNotification) {
}