import Algorithm from "../algorithms/algorithm";
import Translation, {TranslationsModel} from "../models/translationsModel";
import {TranslationRequest} from "../utils/interfaces/translationRequest";
import TranslationServiceError from "../utils/errors/translationServiceError";

export class TranslationService {

    private translator: Algorithm

    constructor(translator: Algorithm) {
        this.translator = translator;
    }

    async matchSentenceForTranslation(translationRequest: TranslationRequest): Promise<TranslationRequest> {

        try {

        const findExactTranslation = await Translation.findOne({
            source: translationRequest.source,
            sourceLanguage: translationRequest.sourceLanguage,
            targetLanguage: translationRequest.targetLanguage
        });

        if (findExactTranslation) {
            return findExactTranslation;
        }

        const minLength = translationRequest.source.length - +`${process.env.MIN_VALUE}` || 5;
        const maxLength = translationRequest.source.length + (+`${process.env.MAX_VALUE}` || 5) + 1;

        const findTranslation = await Translation.find({
            sourceLanguage: translationRequest.sourceLanguage,
            targetLanguage: translationRequest.targetLanguage,
            length_source: {
                $gte: minLength,
                $lt: maxLength
            }
        })

        if (!findTranslation) {
            return {...translationRequest, target: ""};
        }

        const maxValue: number = +`${process.env.ALLOWED_DISTANCE_ALGORITHM}` || 2;
        let minValue: number = +`${process.env.ALLOWED_DISTANCE_ALGORITHM}` || 2
        let translation;
        let modified: boolean = false;

        for (const item of findTranslation as [TranslationsModel]) {
            const result = this.translator.getScore(item.source, translationRequest.source);
            if (result <= maxValue) {
                if (result <= minValue) {
                    modified = true;
                    translation = item;
                    minValue = result;
                }
            }
        }

        if (!modified) {
            return {...translationRequest, target: ""};
        }

        return translation as TranslationsModel;

        } catch (e) {
            throw new TranslationServiceError()
        }
    }

}