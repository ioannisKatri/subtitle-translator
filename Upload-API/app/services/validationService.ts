import {TranslationRequest, TranslationResponse} from "../utils/interfaces/translationRequest";
import path from "path";
import {createPathIfNotDoNotExist} from "../utils/utils";
import {fileReader} from "../utils/utils/fileReader";
import {
    rowValidator,
} from "../utils/utils/sentence-utils";
import {FileValidationError} from "../utils/errors/fileValidationError";

export class ValidationService {

    constructor(private userPayload: UserPayload) {
    }

    async validation() {
        const files: [string] = this.userPayload.files;
        const fromPath = path.join(process.cwd() + "../" + `${process.env.FILE_DIRECTORY_PENDING}${this.userPayload.folderName}`)

        for (const file of files) {

            const inputFile = await fileReader(fromPath, file)
            const lines = inputFile.toString().split('\n')

            for (const line of lines) {
                const correctFormat = rowValidator(line)

                if (!correctFormat) {
                    throw new FileValidationError();
                }
            }
        }
    }
}