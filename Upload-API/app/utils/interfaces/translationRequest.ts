export interface TranslationResponse {
    payload: {
        source: string;
        target: string
        sourceLanguage: string;
        targetLanguage: string;
    }
}

export interface TranslationRequest {
    source: string;
    sourceLanguage: string;
    targetLanguage: string;
}
