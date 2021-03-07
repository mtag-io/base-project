import { Injectable } from "@nestjs/common";
import { LinkRepository } from "./link.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CheckLink } from "./@types/check-link.types";
import { Link } from "./link.entity";
import { PartialLinkDto } from "./@types/partial-link.dto";
import { dbSuccess } from "../@helpers";
import { CreateLink } from "./@types/create-db-link.types";


@Injectable()
export class LinkService {

  constructor(
    @InjectRepository(LinkRepository)
    private readonly linkRepository: LinkRepository
  ) {
  }

  async createLink(createLink: CreateLink): Promise<Link> {
    return this.linkRepository.createLink(createLink);
  }

  async verifyLink(checkLink: CheckLink): Promise<Link> {
    return this.linkRepository.verifyLink(checkLink);
  }

  async getLink(_id): Promise<Link | void> {
    return this.linkRepository.findOne(
      _id, { relations: ["user"] });
  }

  async checkHash(hash): Promise<Link | void> {
    return this.linkRepository.findOne(
      { where: { hash, valid: true }, relations: ["user"] }
    );
  }

  async getLinks(filter: PartialLinkDto): Promise<Link[]> {
    return this.linkRepository.find(
      { where: filter, relations: ["user"] });
  }

  async updateLink(_id: number, updateDto: PartialLinkDto): Promise<boolean> {
    const ok = await this.linkRepository.update(_id, updateDto);
    return dbSuccess(ok);
  }

  async deleteLink(_id: number): Promise<boolean> {
    const ok = await this.linkRepository.delete(_id);
    return dbSuccess(ok);
  }
}
