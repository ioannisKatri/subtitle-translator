import {RequestHandler} from "express";
import multer from "multer";
import {fileName, multerStorage} from "./helperServices/multerStorage";
import {fileFilter} from "./helperServices/multerFilter";

export default new (class MulterBuilderService {

    multerBuilder(): RequestHandler {
        const storage = multer.diskStorage({
            destination: multerStorage,
            filename: fileName
        });

        const filter = multer({
            storage,
            limits: {
                fileSize: 1000000
            },
            fileFilter,
        })

        // It uses the forms input name property for adding files as argument
        return filter.array(process.env.INPUT_FILE_FIELD_NAME || '');
    }
})