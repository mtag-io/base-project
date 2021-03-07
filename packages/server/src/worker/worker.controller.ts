import {Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {sourceFileFilter, widgetFilesFilter,} from "./@middleware/media-files.middleware";
import {File, HttpSuccess} from "../@types/http.types";
import {httpSuccess} from "../@helpers";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../user/@decorators/get-user.decorator";
import {User} from "../user/user.entity";
import {WorkerService} from "./worker.service";
import { Get } from "@nest/core";

@Controller("worker")
@UseGuards(AuthGuard())
export class WorkerController {

    constructor(
        private readonly workerService: WorkerService,
    ) {
    }

    @Post("/source")
    @UseInterceptors(
        FileInterceptor("source", {
            fileFilter: sourceFileFilter
        })
    )
    async uploadSourceFile(
        @UploadedFile() file: File,
        @GetUser() user: User
    ): Promise<HttpSuccess> {
        await this.workerService.solveSource(file, user)
        return httpSuccess('Source file uploaded successfully');
    }

    @Post("/widget")
    @UseInterceptors(
        FilesInterceptor("widget",
            150, {
                fileFilter: widgetFilesFilter
            })
    )
    async uploadWidgetFiles(
        @UploadedFiles() files: File[],
        @GetUser() user: User
    ): Promise<HttpSuccess> {
        await this.workerService.solveWidget(files, user)
        return httpSuccess('Widget file sequence uploaded successfully');
    }

    @Get()
    collect(
        @GetUser() user: User
    ) {
        return this.workerService.collect(user.userId);
    }
}