import {NextFunction, Request, Response} from 'express';
import logger from "../utils/logger";
import {CustomError} from "../utils/errors/customError";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeErrors())
    }

    return res.status(500).send({
        errors: [ { message: "something went wrong" }]
    });
}
