import {NextFunction, Request, Response} from "express";
import FileService from "../services/multerBuilderService";
import {uuidUtil} from "../utils/utils";
import {OtherCodes, ValidationErrorCodes} from "../utils/logger/loggingCodes";
import {errorHandler} from "./errorHandler";

export const initializeFilesUser = (req: Request, res: Response, next: NextFunction) => {
    const uuid = uuidUtil()

    req.user = {
        folderName: uuid,
        files: new Array<string>()
    } as UserPayload;

    FileService.multerBuilder()(req, res, (err: any) => {

        if (!req.body.email || !req.body.sourceLanguage || !req.body.targetLanguage) {
            return res.status(400).json({status: false, message: OtherCodes.INVALID_REQUEST})
        }

        if (req.files == null || req.files.length === 0) {
            return res.status(400).json({status: false, message: ValidationErrorCodes.NO_FILE_ATTACHED})
        }

        if (err) {
            errorHandler(err, req, res)
            return res.status(500).json({status: false, message: OtherCodes.FILE_SERVICE_ERROR})
        }

        req.user = {
            ...req.user,
            email: req.body.email,
            sourceLanguage: req.body.sourceLanguage,
            targetLanguage: req.body.targetLanguage,
        } as UserPayload;


        next();
    })
}

