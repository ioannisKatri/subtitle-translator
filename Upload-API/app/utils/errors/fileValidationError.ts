import {CustomError} from "./custom-error";
import {ValidationErrorCodes} from "../logger/loggingCodes";

export class FileValidationError extends CustomError {

    statusCode = 400;

    constructor() {
        super("Validation failed for the files");
        Object.setPrototypeOf(this, FileValidationError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: ValidationErrorCodes.FAILED_VALIDATION_PROCEDURE}];
    }
}