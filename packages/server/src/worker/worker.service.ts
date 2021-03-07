import {extname, join, resolve} from "path";
import {exists, ensureDir, move, readdir} from "fs-extra";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {User} from "../user/user.entity";
import {File, HttpData} from "../@types/http.types";
import {InternalServerErrorException} from "@nest/core";
import {WorkerSocket} from "../@socket/worker.socket";
import {solveWidgetDir} from "./worker.helpers";
import {httpData} from "../@helpers";
import {readJsonAsync} from "@fixpics/common";
import {DIRS} from "./worker.config";

@Injectable()
export class WorkerService {

    constructor(
        private readonly configService: ConfigService,
        private readonly workerSocket: WorkerSocket
    ) {
    }

    async solveSource(file: File, user: User, registered = true): Promise<void> {
        const storageDir = resolve(DIRS.STORAGE)
        const sourcePath = join(storageDir, DIRS.TMP, file.filename)
        if (!await exists(sourcePath))
            throw new InternalServerErrorException('Error while uploading file.')

        const destPath = join(
            storageDir,
            registered ? DIRS.REGISTERED : DIRS.VOLATILE,
            user.userId,
            DIRS.SOURCE
        )

        await ensureDir(destPath)

        await move(sourcePath, join(destPath, file.originalname), {overwrite: true})
    }

    async solveWidget(files: File[], user: User, registered = true): Promise<void> {
        const storageDir = resolve(DIRS.STORAGE)
        const sourcePath = join(storageDir, DIRS.TMP)

        const destPath = join(
            storageDir,
            registered ? DIRS.REGISTERED : DIRS.VOLATILE,
            user.userId,
            DIRS.WIDGET,
            solveWidgetDir(files[0].originalname)
        )

        await ensureDir(destPath)

        await Promise.all(
            files.map( ({filename, originalname}) =>
                move(
                    join(sourcePath, filename),
                    join(destPath, originalname),
                    {overwrite: true})))
    }

    async collect(uid: string): Promise<HttpData>{
        return httpData({
            sources: await this.collectSources(uid),
            widgets: await this.collectWidgets(uid)
        })
    }

    async sourceFileReport(files, sourceDir){
        const validSources = []
        for(const file of files){
            if(file[0] === '.' || extname(file) === '.json' || extname(file) === '.png')
                continue
            const baseName = file.split('.').slice(0, -1).join('')
            const hasInfo = await exists(join(sourceDir,baseName + '.json')) && await exists(join(sourceDir, baseName + '.png'))
            if(!hasInfo) continue
            validSources.push({
                source: file,
                info: await readJsonAsync(join(sourceDir, baseName + '.json')),
                thumb: baseName + '.png'
            })
        }
        return validSources
    }

    async widgetFileDeport(widgets, widgetDir){
        const validSources = []
        for(const wdg of widgets) {
            const allFiles = await readdir(join(widgetDir, wdg))
            const files = allFiles.filter(f => extname(f) === '.json')
            const rest = allFiles.filter(f => f[0] !== '.' && extname(f) !== '.json')[0]
            if (files.length) validSources.push({
                source: rest,
                info: await readJsonAsync(join(widgetDir, wdg, files[0])),
                thumb: rest
            })
        }
        return validSources
    }

    async collectSources(uid: string): Promise<string[]>{
        const storage = resolve(DIRS.STORAGE)
        const sourceDir = join(storage, DIRS.REGISTERED, uid, DIRS.SOURCE)
        const sources = await readdir(sourceDir)
        return await this.sourceFileReport(sources, sourceDir)
    }

    async collectWidgets(uid: string): Promise<string[]>{
        const storage = resolve(DIRS.STORAGE)
        const widgetDir = join(storage, DIRS.REGISTERED, uid, DIRS.WIDGET)
        const widgets = await readdir(widgetDir)
        return await this.widgetFileDeport(
            widgets.filter(f => f[0] !== '.'),
            widgetDir
        )
    }


    action(payload: any, user){
        this.workerSocket.send(
            {...payload, token: user.userId})
    }

    checkLink(){
        this.workerSocket.send(
            {action: this.configService.get('ACTIONS').CHECK_LINK})
    }
}


