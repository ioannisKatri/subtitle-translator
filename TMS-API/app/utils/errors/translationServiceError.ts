import {CustomError} from "./customError";
import {ApiErrorCodesTranslate} from "../logger/loggingCodes";

export default class TranslationServiceError extends CustomError {
    statusCode = 500;

    constructor() {
        super("Translation service failed");
        Object.setPrototypeOf(this, TranslationServiceError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string}[] {
        return [{success: false, message: ApiErrorCodesTranslate.TRANSLATION_SERVICE_FAILED}];
    }
}