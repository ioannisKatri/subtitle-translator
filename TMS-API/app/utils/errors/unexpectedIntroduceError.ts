import {CustomError} from "./customError";
import {IntroduceError} from "../logger/loggingCodes";


export class UnexpectedIntroduceError extends CustomError {
    statusCode = 500;

    constructor() {
        super("Unexpected Error when we adding data to database");
        Object.setPrototypeOf(this, UnexpectedIntroduceError.prototype)
    }

    serializeErrors(): {success: boolean, message: string; field?: string }[] {
        return [{success: false, message: IntroduceError.UNEXPECTED_ERROR}];
    }

}