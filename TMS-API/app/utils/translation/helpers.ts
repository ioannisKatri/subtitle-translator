import {TranslationRequest} from "../interfaces/translationRequest";

export const swapTranslatedTextAndLanguage = (translation: TranslationRequest) => {

    const swap: TranslationRequest = {
        source: translation.target,
        target: translation.source,
        sourceLanguage: translation.targetLanguage,
        targetLanguage: translation.sourceLanguage
    }

    return swap;

}