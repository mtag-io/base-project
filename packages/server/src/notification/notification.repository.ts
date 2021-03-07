import { EntityRepository, Repository } from "typeorm";
import { Notification } from "./notification.entity";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

  // async markRead(_id: string) : Promise<boolean>{
  //   const res = await this.update(_id, {read: true})
  //   return dbSuccess(res)
  // }
}