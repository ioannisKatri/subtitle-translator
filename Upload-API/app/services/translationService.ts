import {AxiosResponse} from "axios"
import {TranslationRequest, TranslationResponse} from "../utils/interfaces/translationRequest";
import DataFetcher from "../utils/interfaces/dataFetcher";
import {TmsError} from "../utils/errors/tmsError";
import logger from "../utils/logger";
import {TmsApiErrorCodes} from "../utils/logger/loggingCodes";

export class TranslationService {

    constructor(private fetcher: DataFetcher) {
    }

    async translate(translationRequest: TranslationRequest) {
        try {
            const translation: AxiosResponse<TranslationResponse> = await this.fetchTranslatedSentence(translationRequest)
            const translatedLine = translation.data.payload
            if (translatedLine.target.length === 0) return translationRequest.source

            return translatedLine.target
        } catch (e) {
            logger.error(TmsApiErrorCodes.FAILED_TO_COMMUNICATE_WITH_TMS)
            throw new TmsError()
        }
    }

    private async fetchTranslatedSentence(translationRequest: TranslationRequest): Promise<AxiosResponse<TranslationResponse>> {
        return await this.fetcher.fetchData({
                source: translationRequest.source,
                sourceLanguage: translationRequest.sourceLanguage,
                targetLanguage: translationRequest.targetLanguage
            }
        )
    }
}