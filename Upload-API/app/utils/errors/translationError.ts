import {CustomError} from "./custom-error";
import {TranslationErrorCodes, ValidationErrorCodes} from "../logger/loggingCodes";
import logger from "../logger";

export class TranslationError extends CustomError {

    statusCode = 500;

    constructor() {
        super("failed to translate one of the files");
        Object.setPrototypeOf(this, TranslationError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: TranslationErrorCodes.FailedTranslationProcedure}];
    }
}