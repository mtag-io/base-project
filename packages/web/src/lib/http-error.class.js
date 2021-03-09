import {errors} from "../constants/errors";

export class HttpError extends Error{
    constructor(err) {
        super()
        if(err.code) this.message = errors[err.code]
        if(err.message && errors[err.message.substr(0, 10)])
            this.message = errors[err.code]
        else if(err.status && errors[err.status.substr(0, 10)])
            this.message = errors[err.code]
        else this.message = 'Unlisted error'
    }
}