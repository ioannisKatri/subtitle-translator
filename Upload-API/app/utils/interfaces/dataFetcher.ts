import {TranslationRequest, TranslationResponse} from "./translationRequest";
import {AxiosResponse} from "axios";

export default interface DataFetcher {

    fetchData(translationRequest: TranslationRequest): Promise<AxiosResponse<TranslationResponse>>
}