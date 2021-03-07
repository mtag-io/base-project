import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/@guards/roles.guard";
import { Role } from "../auth/@decorators/roles.decorator";
import { ROLES } from "../auth/auth.config";
import { PartialLinkDto } from "./@types/partial-link.dto";
import { LinkService } from "./link.service";
import { ResourceExpiredException } from "../@errors/resource-expired.class";
import { httpData, httpSuccess } from "../@helpers";
import { HttpData, HttpSuccess } from "../@types/http.types";
import { Link } from "./link.entity";
import { CreateLinkDto } from "./@types/create-link.dto";
import { UserService } from "../user/user.service";

@Controller("link")
@UseGuards(AuthGuard(), RolesGuard)
export class LinkController {

  constructor(
    private readonly linkService: LinkService,
    private readonly userService: UserService
  ) {
  }

  @Post("/")
  @Role(ROLES.ADMIN)
  async createLink(
    @Body() createDto: CreateLinkDto) {
    const user = await this.userService.getUser({ userId: createDto.userId });
    if (!user) throw new NotFoundException("User not found");
    return await this.linkService.createLink({ user, action: createDto.action });
  }

  @Get("/")
  @Role(ROLES.ADMIN)
  async getLinks(@Body() filter: PartialLinkDto): Promise<HttpData> {
    const links: Link[] = await this.linkService.getLinks(filter);
    return httpData(links);
  }

  @Get("/:_id")
  @Role(ROLES.ADMIN)
  async getLink(@Param("_id") _id: number): Promise<HttpData | void> {
    const link = await this.linkService.getLink(_id);
    if (link) return httpData(link);
    throw new NotFoundException("Link not found");
  }

  @Get("/verify/:hash")
  @Role(ROLES.ADMIN)
  async checkHash(@Param("hash") hash: string): Promise<HttpData | void> {
    const link = await this.linkService.checkHash(hash);
    if (!link) throw new NotFoundException(
      "No valid link with the submitted hash found.");
    if (link.isExpired()) throw new ResourceExpiredException("Link expired");
    return httpData(link);
  }

  @Patch("/:_id")
  @Role(ROLES.ADMIN)
  async updateLink(
    @Param("_id") _id: number,
    @Body() partialDto: PartialLinkDto): Promise<HttpSuccess | void> {
    const res = await this.linkService.updateLink(_id, partialDto);
    if (res) return httpSuccess("Link updated");
    throw new NotFoundException("Link not found");
  }

  @Delete("/:_id")
  @Role(ROLES.ADMIN)
  async deleteLink(
    @Param("_id") _id: number): Promise<HttpSuccess | void> {
    const res = this.linkService.deleteLink(_id);
    if (res) return httpSuccess("Link deleted");
    throw new NotFoundException("Link not found");
  }
}
