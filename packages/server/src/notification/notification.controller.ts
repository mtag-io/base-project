import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./@types/create-notification.dto";
import { PartialNotificationDto } from "./@types/partial-notification.dto";
import { ROLES } from "../auth/auth.config";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/@guards/roles.guard";
import { Role } from "../auth/@decorators/roles.decorator";
import { RestrictId, RestrictWhere } from "../@types/restrict-to.type";
import { UserService } from "../user/user.service";
import { httpData, httpSuccess } from "../@helpers";
import { omit } from "@base-project/common"
import { CreateNotification, PartialNotification } from "./@types/notification.types";
import { User } from "../user/user.entity";
import { GetUser } from "../user/@decorators/get-user.decorator";
import { HttpData, HttpSuccess } from "../@types/http.types";
import { restrictToId, restrictToWhere } from "../@helpers/types";
import {isAdmin} from "../auth/auth.helpers";
import { ENDPOINTS, ROOT } from "src/@config/endpoints.config";

@Controller(ENDPOINTS.NOTIFICATION)
@UseGuards(AuthGuard(), RolesGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService) {
  }

  @Post(ROOT)
  @Role(ROLES.ADMIN)
  async createNotification(
    @Body() createDto: CreateNotificationDto) {
    const createNotification: CreateNotification =
      await this.dtoToServiceClass(createDto, CreateNotification);
    return this.notificationService.createNotification(createNotification);
  }

  @Patch(`${ROOT}:_id`)
  @Role(ROLES.ADMIN)
  async updateNotification(
    @Body() partialDto: PartialNotificationDto,
    @Param("_id") _id: number
  ) {
    const partialNotification: PartialNotification =
      await this.dtoToServiceClass(partialDto, PartialNotification);
    const res = await this.notificationService.updateNotification(_id, partialNotification);
    if (!res) throw new NotFoundException("Notification not found.");
    return httpSuccess("Notification updated");
  }

  @Get(`${ENDPOINTS.NOTIFICATION_MARK_READ}:_id`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async markRead(
    @Param("_id") _id: number,
    @GetUser() user: User
  ): Promise<HttpSuccess> {
    const res = await this.notificationService.updateNotification(_id, { read: true });
    if (!res) new NotFoundException("Notification not found.");
    return httpSuccess("Notification marked as read.");
  }

  @Get(ROOT)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async getNotifications(
    @GetUser() user: User,
    @Body() filter: PartialNotificationDto = {}
  ): Promise<HttpData> {
    if (!isAdmin(user)) filter.userId = user.userId;
    const notifications = await this.notificationService.getNotifications(filter);
    return httpData(notifications);
  }

  @Get(`${ROOT}:_id`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  async getNotification(
    @Param("_id") _id: number,
    @GetUser() user: User
  ): Promise<HttpData> {
    const filter: RestrictWhere = restrictToWhere(_id, user);
    const notification = await this.notificationService.getNotification(filter);
    return httpData(notification);
  }

  @Delete(`${ROOT}:_id`)
  @Role([ROLES.REGISTERED, ROLES.ADMIN])
  removeNotification(
    @Param("_id") _id: number,
    @GetUser() user: User
  ) {
    const filter: RestrictId = restrictToId(_id, user);
    return this.notificationService.removeNotification(filter);
  }

  private async dtoToServiceClass(dto, DestClass) {
    const destClass = new DestClass();
    const user = await this.userService.getUser({ userId: dto.userId });
    if (!user) throw  new NotFoundException("User not found.");
    destClass.user = user;
    Object.keys(omit(dto, "userId", "to"))
      .forEach(k => this[k] = dto[k]);
    return destClass;
  }
}
