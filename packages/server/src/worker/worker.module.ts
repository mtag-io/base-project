import {Module} from "@nestjs/common";
import {WorkerService} from "./worker.service";
import {WorkerController} from "./worker.controller";
import {MulterModule} from "@nestjs/platform-express";
import {WorkerSocket} from "../@socket/worker.socket";
import {setDest} from "./worker.helpers";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: setDest
        }),
        PassportModule.register({ defaultStrategy: "jwt" })
    ],
    providers: [WorkerService, WorkerSocket],
    controllers: [WorkerController]
})
export class WorkerModule {}
