import {TranslationRequest} from "../utils/interfaces/translationRequest";
import Translation from "../models/translationsModel";
import {swapTranslatedTextAndLanguage} from "../utils/translation/helpers";
import {UnexpectedIntroduceError} from "../utils/errors/unexpectedIntroduceError";

export class IntroduceService {

    constructor(private translationArray: [TranslationRequest]) {
    }

    async process() {
        try {
        const toBePersistTranslations: TranslationRequest[] = [];

        for (const trans of this.translationArray) {
            const swap = swapTranslatedTextAndLanguage(trans);

            toBePersistTranslations.push(Translation.build(trans));
            toBePersistTranslations.push(Translation.build(swap));
        }
        await Translation.create(toBePersistTranslations)
        } catch (e) {
            throw new UnexpectedIntroduceError()
        }
    }
}