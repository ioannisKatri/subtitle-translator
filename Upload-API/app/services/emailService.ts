import sgMail from '@sendgrid/mail';
import dotEnv from "dotenv";
import * as fs from "fs";
import path from "path";
import {EmailFailedToSendError} from "../utils/errors/emailFailedToSendError";

dotEnv.config({path: process.env.NODE_ENV !== "test" ? '.env' : '.env.test'})

export class EmailService {

    async emailTo(userPayload: UserPayload) {

        const attachments = [];

        const dir = path.join(process.cwd() + "../" + `${process.env.FILE_DIRECTORY_PENDING}${userPayload.folderName}`)
        const translatedFilesArray = fs.readdirSync(path.join(dir));

        for (const file of translatedFilesArray) {
            const attachment = fs.readFileSync(path.join(dir + '/' + file)).toString("base64");

            const template = {
                content: attachment,
                filename: file,
                type: "application/txt",
                disposition: "22"
            };
            attachments.push(template)
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

        const msg = {
            to: userPayload.email,
            cc: "grjkatr@hotmail.com",
            from: process.env.FROM_EMAIL || "", // Use the email address or domain you verified above
            subject: 'Sending Translated files',
            text: 'Find attached the translated files',
            html: '<strong>Find attached the translated files</strong>',
            attachment: attachments,
        };
        try {
            await sgMail.send(msg);
        } catch (error) {
            throw new EmailFailedToSendError();
        }

    }


}