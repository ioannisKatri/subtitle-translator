import {Request, Response, NextFunction} from "express";
import RequestValidationError from "../utils/errors/requestValidationError";
import {Result, validationResult} from "express-validator";
import {ValidationError} from "express-validator/src/base";


export const validateRequestErrors = (req: Request, res: Response, next: NextFunction) => {

    const errors: Result<ValidationError>  = validationResult(req);

    if (!errors.isEmpty()) {
        // { onlyFirstError: true } is used to address the repetition of same error message
        throw new RequestValidationError(errors.array({ onlyFirstError: true }));
    }
    next();
}