import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationRepository } from "./notification.repository";
import { dbSuccess } from "../@helpers";
import { isTest } from "@fixpics/common"
import { Notification } from "./notification.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateNotification, PartialNotification } from "./@types/notification.types";
import { RestrictId, RestrictWhere } from "../@types/restrict-to.type";
import { PartialNotificationDto } from "./@types/partial-notification.dto";
import { NOTIFICATION_CONFIG } from "./notification.config";
import { EMAIL } from "../@constants";
import { APP_NAME, APP_DOMAIN, ADMIN_CONTACT} from "../@config/server.config";
import { ENDPOINTS } from "../@config/endpoints.config";
import { User } from "../user/user.entity";
import {Actions} from "../@types/index.types";

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
    private readonly mailerService: MailerService
  ) {
  }

  private static createOptions(
    action: Actions, user: User,
    context: Record<string, any> = {}): Record<string, any> {
    const cfg = NOTIFICATION_CONFIG[action];
    switch (cfg.carrier) {
      case EMAIL:
        if (context.hash) context.url = `${ENDPOINTS[action]}/${context.hash}`;
        return {
          to: user.email,
          ...NOTIFICATION_CONFIG[action].data,
          context: {
            APP_NAME,
            APP_DOMAIN,
            ADMIN_CONTACT,
            ...user,
            ...context
          }
        };
    }
  }

  async createNotification(createNotification: CreateNotification) {
    const notification = this.notificationRepository.create();
    Object.keys(createNotification).forEach(k => notification[k] = createNotification[k]);
    if(!notification.message) notification.message = ''
    return notification.save();
  }

  async getNotification(filter: RestrictWhere): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: filter });
  }

  async getNotifications(filter: PartialNotificationDto): Promise<Notification> {
    return await this.notificationRepository.findOne({ where: filter });
  }

  async updateNotification(_id: number, partialNotification: PartialNotification) {
    return await this.notificationRepository.update(_id, partialNotification);
  }

  async removeNotification(filter: RestrictId): Promise<boolean> {
    const res = await this.notificationRepository.delete(filter);
    return dbSuccess(res);
  }

  async send(action: Actions, user: User, context: Record<string, any> = {}) {
    if(isTest()) {
      console.log('Skipped email sending.');
    }
    const { subject, message, userId, createdAt } = await this.createNotification({
      user, action, context: JSON.stringify(context)
    });
    Object.assign(context, {subject, message, userId, createdAt});
    const notificationOptions = NotificationService.createOptions(action, user, context);
    await this.mailerService.sendMail(notificationOptions);
  }
}
