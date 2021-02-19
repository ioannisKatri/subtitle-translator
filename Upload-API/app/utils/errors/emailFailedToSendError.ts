import {CustomError} from "./custom-error";
import {OtherCodes} from "../logger/loggingCodes";

export class EmailFailedToSendError extends CustomError {

    statusCode = 500;

    constructor() {
        super("Validation failed for the files");
        Object.setPrototypeOf(this, EmailFailedToSendError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: OtherCodes.EMAIL_FAILED_TO_SEND}];
    }
}