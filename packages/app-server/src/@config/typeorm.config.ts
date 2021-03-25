import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {isDev, isTest} from "back-common"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    url: `http://${process.env['DB_USER']}:` +
        `${process.env['DB_PASSWORD']}@` +
        `${process.env['DB_HOST']}:` +
        `${process.env['DB_PORT']}`,
    database: process.env["DB"],
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: isDev() || isTest(),
}
