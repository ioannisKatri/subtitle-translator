import {Request, Response} from "express";

import {TranslationManagerService} from '../services/TranslationManagerService'
import {TranslationService} from "../services/translationService";
import {TmsService} from "../services/tmsService";
import {EmailService} from "../services/emailService";
import {ValidationService} from "../services/validationService";
import {OtherCodes} from "../utils/logger/loggingCodes";


const createUpload = async (req: Request, res: Response) => {

    const fetcher = new TmsService();

    const user: UserPayload = req.user;

    const translationService = new TranslationService(fetcher);
    await new ValidationService(user).validation();
    await new TranslationManagerService(translationService, req.user).process();
    await new EmailService().emailTo(user)

    return res.json({success: true, payload: {message: OtherCodes.FILES_WILL_BE_SEND}})
};

export {createUpload};
