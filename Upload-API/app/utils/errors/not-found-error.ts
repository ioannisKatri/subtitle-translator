import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {

    statusCode = 404;

    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: "Not Found"}];
    }
}