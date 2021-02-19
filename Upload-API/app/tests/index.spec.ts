import request from "supertest";
import app from '../app'
import path from "path";
import axios from 'axios';
import fs from 'fs';
import sgMail from '@sendgrid/mail';

import {createPathIfNotDoNotExist} from "../utils/utils";
import {fileReader} from "../utils/utils/fileReader";
import {directoryForReadyFiles, expectContentAfterTranslation} from "./bootstraping";
import dotEnv from "dotenv";

require('dotenv').config();
dotEnv.config({path: '.env.test'})
jest.mock('axios');
jest.mock("@sendgrid/mail", () => {
    return {
        setApiKey: jest.fn(),
        send: jest.fn()
    };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing Upload-API with VALID files functionality", () => {

    it('Expect directory "/files/ready/{uuid}/" to contain length 2 when we upload two files and the files valid content ', async () => {
        createPathIfNotDoNotExist(path.join(__dirname + "/files"))
        mockedAxios.post.mockResolvedValue({
            data: {
                payload: {
                    "source": "Hello guys",
                    "target": "Hallo Leute",
                    "sourceLanguage": "en",
                    "targetLanguage": "de"
                }
            }
        });

        const result = await request(app)
            .post('/upload')
            .attach('for_translation', path.join(process.cwd() + '/app/tests/file.txt'), {contentType: 'application/octet-stream'})
            .attach('for_translation', path.join(process.cwd() + '/app/tests/file1.txt'), {contentType: 'application/octet-stream'})
            .field('sourceLanguage', 'en')
            .field('targetLanguage', 'de')
            .field('email', 'email@hotmaiil.com');

        const foldersReadyArray: string[] = fs.readdirSync(path.join(directoryForReadyFiles));

        expect(result.status).toEqual(200);
        expect(foldersReadyArray.length).toEqual(1);

        const folderName = foldersReadyArray[0];

        const translatedFilesArray = fs.readdirSync(path.join(__dirname + "/files/ready/" + folderName));

        expect(translatedFilesArray.length).toEqual(2);

        const fileContent = await fileReader(path.join(__dirname + "/files/ready/" + folderName), translatedFilesArray[0]);
        const msg = {
            to: "email@hotmaiil.com",
            from: 'something@hotmail.com', // Use the email address or domain you verified above
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            attachment: [{

                content: "a",
                filename: "attachment.pdf",
                type: "application/pdf",
                disposition: "22"

            }],
            mail_settings: {
                sandbox_mode: {
                    enable: true,
                },
            },
        };
        expect(expectContentAfterTranslation).toEqual(fileContent)
        expect(sgMail.send).toBeCalledTimes(1)
        // Remove files
        fs.rmdir(__dirname + "/files/", {recursive: true}, (err) => {
            if (err) {
                throw err;
            }
        });
    });

    it('Returns 400 if there are not files attachments', async () => {
        const result = await request(app)
            .post('/upload');

        expect(result.status).toEqual(400)
    });

    it('Returns 400 If no email is provided', async () => {
        const result = await request(app)
            .post('/upload')
            .field('sourceLanguage', 'en')
            .field('targetLanguage', 'de')

        expect(result.status).toEqual(400)
    });

    it('Returns 400 If no sourceLanguage is provided', async () => {
        const result = await request(app)
            .post('/upload')
            .field('sourceLanguage', 'en')
            .field('email', 'asdas@dsa.com')

        expect(result.status).toEqual(400)
    });

    it('Returns 400 If no targetLanguage is provided', async () => {
        const result = await request(app)
            .post('/upload')
            .field('targetLanguage', 'de')
            .field('email', 'asdas@dsa.com')

        expect(result.status).toEqual(400)
    });

})

