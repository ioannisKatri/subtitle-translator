enum ValidationErrorCodes {
    FAILED_VALIDATION_PROCEDURE = '453 - Failed to pass validation procedure',
    NO_FILE_ATTACHED = "414 - Please attach a file or Valid Format"
}

enum TranslationErrorCodes {
    FailedTranslationProcedure = '532 - Something went wrong with translation procedure',
}

enum OtherCodes {
    APP_FAILED_TO_START = 'App failed to start',
    INVALID_REQUEST = '232 - Invalid Request',
    FILE_SERVICE_ERROR = '452 - Something went wrong with the files',
    FILES_WILL_BE_SEND = 'Translated files will be send via an email',
    EMAIL_FAILED_TO_SEND = "843 - Email failed to send"
}

enum TmsApiErrorCodes {
    FAILED_TO_COMMUNICATE_WITH_TMS = '604 - Failed to communicate with tms API',
}

export  {
    ValidationErrorCodes,
    TranslationErrorCodes,
    TmsApiErrorCodes,
    OtherCodes
}
