import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as chalk from "chalk";

@Injectable()
export class AccessLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { httpVersion, method, socket, url, headers } = req;
    const { remoteAddress, remoteFamily } = socket;

    console.log(
      new Date().toISOString(),
      chalk.green(method),
      "ContentType:", headers["content-type"], ",",
      "UserAgent:", headers["user-agent"], ",",
      "Host:", headers["host"], ",\n",
      "HTTP version:", httpVersion, ",",
      "RemoteAddress:", remoteAddress, ",",
      "RemoteFamily:", remoteFamily, ",\n",
      chalk.blue("-endpoint:" + url)
    );
    next();
  }
}
