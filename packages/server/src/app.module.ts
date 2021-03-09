import {MiddlewareConsumer, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {typeOrmConfig} from "./@config/typeorm.config";
import {AuthModule} from "./auth/auth.module";
import {AccessLogger} from "./@middleware/access-logger.middleware";
import {NotificationModule} from "./notification/notification.module";
import {WorkerModule} from "./worker/worker.module";

@Module({

    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        UserModule,
        NotificationModule,
        WorkerModule
    ]
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AccessLogger)
            .forRoutes("/");
    }
}
