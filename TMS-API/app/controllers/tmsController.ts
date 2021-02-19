import {Request, Response} from "express";

import {TranslationRequest} from "../utils/interfaces/translationRequest";
import Algorithm from "../algorithms/algorithm";
import {Levenshtein} from "../algorithms/levenshtein";
import {TranslationService} from "../services/translationService";
import {
    CommonCodes
} from "../utils/logger/loggingCodes";
import {IntroduceService} from "../services/IntroduceService";

const translate = async (req: Request, res: Response) => {
    const translationRequest: TranslationRequest = {...req.body} as TranslationRequest

    const translator: Algorithm = new Levenshtein()

    const translationService = new TranslationService(translator);

    const result: TranslationRequest = await translationService.matchSentenceForTranslation(translationRequest);

    return res.status(201).json({success: true, payload: result});
};

const introduce = async (req: Request, res: Response) => {

    const translations = req.body as [TranslationRequest];

    await new IntroduceService(translations).process();

    return res.status(201).json({success: true, payload: {message: CommonCodes.ALL_THE_ENTRIES_ADDED}});
};

export {translate, introduce};

