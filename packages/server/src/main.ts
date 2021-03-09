import {config} from 'dotenv'
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";

config()

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    
    const httpConnection = process.env['NODE_ENV'] === 'DOCKER'
        ? `0.0.0.0:${process.env['SERVER_PORT']}`
        : process.env['SERVER_PORT']

    app.enableCors();

    app.useGlobalPipes(
        new ValidationPipe({whitelist: true}));

    await app.listen(httpConnection);
}

bootstrap()
    .then(() => {
        console.log(`Nest server listening on ${process.env['SERVER_PORT']}.`);
    })
    .catch(
        err => {
            console.log("SERVER-ERR:", err.message);
        });
