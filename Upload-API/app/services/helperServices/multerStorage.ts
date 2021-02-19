import {Request} from "express";
import dotEnv from 'dotenv';
import * as path from "path";
import {createPathIfNotDoNotExist} from "../../utils/utils";

dotEnv.config({path: process.env.NODE_ENV !== "test" ? '.env' : '.env.test'})

export const multerStorage = (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
    if (!file.originalname.match(/\.(txt)$/)) {
        return cb(new Error('Invalid Format file'), "")
    }

    const dir = path.join(process.cwd() + "../" + `${process.env.FILE_DIRECTORY_PENDING}${req.user.folderName}`)
    createPathIfNotDoNotExist(dir);

    return cb(null, dir)
}

export const fileName = (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const datetimestamp = Date.now();
    const name = file.originalname.split('.')[0];
    const fileName: string = name + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]

    const userFiles: [string] = req.user.files;
    userFiles.push(fileName)
    req.user = {...req.user, files: userFiles}

    cb(null, fileName)
}
