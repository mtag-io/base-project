import { EntityRepository, Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UnauthorizedException } from "@nestjs/common";
import { Link } from "./link.entity";
import { ResourceExpiredException } from "../@errors/resource-expired.class";
import { CheckLink } from "./@types/check-link.types";
import { dbSuccess } from "../@helpers";
import { EXPIRATION_TIMES, UNIQUE_LINK_ACTIONS } from "./link.config";
import { ACTIONS } from "../@config/actions.config";
import { CreateLink } from "./@types/create-db-link.types";

@EntityRepository(Link)
export class LinkRepository extends Repository<Link> {

  async createLink(createLink: CreateLink): Promise<Link> {
    const action = ACTIONS[createLink.action];
    // Invalidate all other tokens before creating a new one
    if (UNIQUE_LINK_ACTIONS.includes(createLink.action))
      await this.invalidateLink(createLink);
    const link = this.create();
    link.user = createLink.user;
    link.action = action;
    await link.generateHash();
    link.expire = new Date(Date.now() + EXPIRATION_TIMES[action] * 1000);
    return link.save();
  }

  async invalidateLink(createLink: CreateLink): Promise<boolean> {
    const res = await this.update(
      createLink,
      { valid: false });
    return dbSuccess(res);
  }

  async verifyLink(checkLink: CheckLink): Promise<Link> {
    const link = await this.findOne({
      where: { ...checkLink, valid: true },
      relations: ["user"]
    });
    if (!link)
      throw new UnauthorizedException();
    if (link.isExpired())
      throw new ResourceExpiredException("link");
    // the link is ok. It has to be invalidate to prevent further use
    await this.update({ _id: link._id }, { valid: false });
    return link;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async cleanup(): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(Link)
      .where("expire < NOW()")
      .execute();
  }
}