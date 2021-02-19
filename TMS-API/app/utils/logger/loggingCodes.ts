enum StatusCodes {
    SUCCESS = "Success",
    BAD_REQUEST = "Bad request"
}

enum DatabaseErrorCodes {
    ERROR_DB_INITIALIZATION = 'Exception During DB initialization',
    UNABLE_TO_CONNECT_TO_DB = "Failed to connect to DB"

}

enum DatabaseCodes {
    INITIALIZING_DB = 'Database Initialization starting',
    SUCCESS_DB_CONNECTION = 'Connected Successfully to DB'
}

enum CommonCodes {
    INVALID_REQUEST = "Error Code 235 - Invalid translation request Check the documentation",
    ALL_THE_ENTRIES_ADDED ="All the entries added to the database"
}

enum IntroduceError {
    UNEXPECTED_ERROR = "Unexpected Error when we adding data to database"
}

enum OtherCodes {
    APP_FAILED_TO_START = 'App failed to start'
}

enum ApiErrorCodesTranslate {
    TRANSACTION_ERROR = "Error Code 236 - Something went wrong with the translation please contact the support",
    TRANSLATION_SERVICE_FAILED = "Error code 235 - Translation Service failed"

}

enum ApiErrorCodesIntroduce {
    TRANSACTION_REQUEST_ERROR = "Error Code 234 - Invalid Request - Transaction issue"
}



export  {
    DatabaseErrorCodes as dbErrorCodes,
    DatabaseCodes as dbCodes,
    ApiErrorCodesTranslate,
    CommonCodes,
    ApiErrorCodesIntroduce,
    OtherCodes,
    StatusCodes,
    IntroduceError
}
