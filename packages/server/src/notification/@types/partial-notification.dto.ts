import { CreateNotificationDto } from "./create-notification.dto";
import { PartialType } from "@nestjs/swagger";

export class PartialNotificationDto extends PartialType(CreateNotificationDto) {
}