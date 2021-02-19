import {CustomError} from "./custom-error";
import {TmsApiErrorCodes, TranslationErrorCodes, ValidationErrorCodes} from "../logger/loggingCodes";
import logger from "../logger";

export class TmsError extends CustomError {

    statusCode = 500;

    constructor() {
        super("Failed to communicate with the TMS API");
        Object.setPrototypeOf(this, TmsError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: TmsApiErrorCodes.FAILED_TO_COMMUNICATE_WITH_TMS}];
    }
}