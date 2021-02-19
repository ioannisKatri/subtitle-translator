import DataFetcher from "../utils/interfaces/dataFetcher";
import {TranslationRequest, TranslationResponse} from "../utils/interfaces/translationRequest";
import axios, {AxiosResponse} from "axios";

export class TmsService implements DataFetcher {

    async fetchData(translationRequest: TranslationRequest): Promise<AxiosResponse<TranslationResponse>> {
        const tmsApiUrl = process.env.tmsAPI || "http://localhost:4000"

        return axios.post<TranslationRequest, AxiosResponse<TranslationResponse>>(`${tmsApiUrl}/translate`, {
            source: translationRequest.source,
            sourceLanguage: translationRequest.sourceLanguage,
            targetLanguage: translationRequest.targetLanguage
        });
    }
}