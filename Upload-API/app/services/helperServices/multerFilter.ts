import {Request} from "express";
import {FileFilterCallback} from "multer";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    if (!file.originalname.match(/\.(txt)$/)) {
        return cb(new Error('Invalid Format file'))
    }
    cb(null, true)
}