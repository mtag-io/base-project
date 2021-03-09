import {Injectable} from "@nestjs/common";
import {io} from "socket.io-client";
import {CHANNEL} from "../worker/worker.config";
import {ACTIONS} from "../@config/actions.config";


@Injectable()
export class WorkerSocket {

    private connected = false
    private socket = io("http://localhost:4848");
    private actions = ACTIONS

    constructor(
    ) {
        this.connect()
        this.disconnect()
        this.worker()
    }

    connect() {
        this.socket.on("connect", () => {
            console.log('Socket connected.');
            this.connected = true
        });
    }

    disconnect() {
        this.socket.on("disconnect", () => {
            console.log('Socket disconnected.');
            this.connected = false
        });
    }

    worker() {
        this.socket.on('worker', payload => {
            if (!payload)
                return console.error('Socket with no payload detected.')

            else switch (payload.action) {

                case this.actions.SUCCESS:
                    console.log('Encoding complete')
                    break;

                case this.actions.CHECK_LINK:
                    console.log('Link checked')
                    break;

                default:
                    console.error('WORKER ERROR:', payload.message)
            }
        })
    }

    send(data: any) {
        if(this.connected)
            this.socket.emit(CHANNEL, data);
        else
            this.socket.emit(CHANNEL, {
                error: true,
                message: "Worker disconnected."
            })

    }
}
