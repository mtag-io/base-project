import {ConfigModule, ConfigService} from "@nestjs/config";
import {MiddlewareConsumer, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {typeOrmConfig} from "./@config/typeorm.config";
import {AuthModule} from "./auth/auth.module";
import {AccessLogger} from "./@middleware/access-logger.middleware";
import {NotificationModule} from "./notification/notification.module";
import {WorkerModule} from './worker/worker.module';

@Module({

    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: typeOrmConfig,
            inject: [ConfigService]
        }),
        AuthModule,
        UserModule,
        NotificationModule,
        WorkerModule
    ]
})

export class AppModule {
    // noinspection JSUnusedGlobalSymbols
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccessLogger)
            .forRoutes("/");
    }
}
