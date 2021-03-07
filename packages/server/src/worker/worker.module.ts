import {Module} from "@nestjs/common";
import {WorkerService} from "./worker.service";
import {WorkerController} from "./worker.controller";
import {MulterModule} from "@nestjs/platform-express";
import {WorkerSocket} from "../@socket/worker.socket";
import {setDest} from "./worker.helpers";
import {PassportModule} from "@nestjs/passport";
import {PresetRepository} from "./preset.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PresetService} from "./preset.service";
import {PresetController} from "./preset.controller";

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: setDest
        }),
        PassportModule.register({defaultStrategy: "jwt"}),
        TypeOrmModule.forFeature([PresetRepository]),
    ],
    providers: [WorkerService, WorkerSocket, PresetService],
    controllers: [WorkerController, PresetController]
})
export class WorkerModule {
}
