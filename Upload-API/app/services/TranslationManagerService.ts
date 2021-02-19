import path from "path";
import dotEnv from 'dotenv';

import {TranslationService} from "./translationService";
import {createPathIfNotDoNotExist} from "../utils/utils";
import {TranslationRequest} from "../utils/interfaces/translationRequest";
import {
    removeUnneededSpaces,
    sentenceExtractor,
    templateSentenceCreator
} from "../utils/utils/sentence-utils";
import {fileReader} from "../utils/utils/fileReader";
import {fileWriter} from "../utils/utils/fileWriter";
import logger from "../utils/logger";
import {TranslationErrorCodes} from "../utils/logger/loggingCodes";
import {TranslationError} from "../utils/errors/translationError";

dotEnv.config({path: process.env.NODE_ENV !== "test" ? '.env' : '.env.test'})

export class TranslationManagerService {

    constructor(private translationService: TranslationService, private userPayload: UserPayload) {
    }

    async process() {

        try {
            const files: [string] = this.userPayload.files;
            const fromPath = path.join(process.cwd() + "../" + `${process.env.FILE_DIRECTORY_PENDING}${this.userPayload.folderName}`)
            const toPath = path.join(process.cwd() + "../" + `${process.env.FILE_DIRECTORY_READY}/${this.userPayload.folderName}`)

            await createPathIfNotDoNotExist(toPath);

            for (const file of files) {

                const inputFile = await fileReader(fromPath, file)
                const lines = inputFile.toString().split('\n')

                let output: string = ""
                let result: string = ""
                for (const line of lines) {

                    let sentence: string = sentenceExtractor(line)
                    sentence = removeUnneededSpaces(sentence);
                    result = await this.translationService.translate({
                        source: sentence,
                        sourceLanguage: this.userPayload.sourceLanguage,
                        targetLanguage: this.userPayload.targetLanguage
                    } as TranslationRequest)

                    result = templateSentenceCreator(line) + result;
                    output += result + "\n"
                }
                await fileWriter(toPath, file, output)
            }
        } catch (e) {
            logger.error(TranslationErrorCodes.FailedTranslationProcedure)
            throw new TranslationError()
        }
    }
}