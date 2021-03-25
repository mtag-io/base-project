import { HttpException, HttpStatus } from "@nestjs/common";

export class ResourceExpiredException extends HttpException {
  constructor(resource: string) {
    super(`Current ${resource} has expired. Please request a new one.`, HttpStatus.FORBIDDEN);
  }
}