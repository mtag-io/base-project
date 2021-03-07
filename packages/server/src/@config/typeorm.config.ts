import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import { isDev, isTest } from "@fixpics/common"
import {ConfigService} from "@nestjs/config";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    return {
        type: "mysql",
        url: `http://${configService.get('DB_USER')}:` +
            `${configService.get('DB_PASSWORD')}@` +
            `${configService.get('DB_HOST')}:` +
            `${configService.get('DB_PORT')}`,
        database: configService.get("DB"),
        entities: [__dirname + "/../**/*.entity.{js,ts}"],
        synchronize: isDev() || isTest(),
    }
}
