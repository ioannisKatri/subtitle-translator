import request from "supertest";
import {
    setupDatabase,
    disconnect,
    deleteEntries,
    introduceTranslations,
    introduceInvalidTranslations,
    getTranslation,
    getTranslation2,
} from "./bootstraping/db";
import app from '../app'
import Translation from '../models/translationsModel'

require('dotenv').config();

describe("Testing the TMS router-controller", () => {

    beforeAll(setupDatabase)
    beforeEach(deleteEntries)
    afterAll(disconnect)

    it('It returns 400 if we provide an empty body', async () => {
        const result = await request(app)
            .post('/introduce')
            .send({})
        expect(result.status).toEqual(400);
    })

    it('It returns 400 if we send an invalid request', async () => {
        const result = await request(app)
            .post('/introduce')
            .send(introduceInvalidTranslations)
        expect(result.status).toEqual(400);
    })

    it('It returns 201 and contains 6 db entries if we provide correct data in the request', async () => {
        const result = await request(app)
            .post('/introduce')
            .send(introduceTranslations)
        expect(result.status).toEqual(201);

        const fetchAllEntries = await Translation.find({});
        expect(fetchAllEntries.length).toEqual(6);
    })

    it("It returns 400 if we provide empty body", async () => {
        const result = await request(app)
            .post('/translate')
            .send({});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'source'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"source": "I walk to the supermarket"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'sourceLanguage'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"sourceLanguage": "de"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'targetLanguage'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"targetLanguage": "de", "source": "I walk to the supermarket"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'sourceLanguage'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"sourceLanguage": "de", "source": "I walk to the supermarket"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'sourceLanguage' and 'source'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"sourceLanguage": "de", "source": "I walk to the supermarket"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'targetLanguage' and 'source'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"sourceLanguage": "de", "source": "I walk to the supermarket"});
        expect(result.status).toBe(400);
    })

    it("It returns 400 if we provide only 'targetLanguage' and 'sourceLanguage'", async () => {
        const result = await request(app)
            .post('/translate')
            .send({"sourceLanguage": "de", "targetLanguage": "en"});
        expect(result.status).toBe(400);
    })

    it('It returns 201 if we search for a sentence that exist in the database', async () => {
        for (let trans of introduceTranslations) {
            await Translation.build(trans).save();
        }

        const result = await request(app)
            .post('/translate')
            .send(getTranslation)

        expect(result.status).toEqual(201);
        expect(result.body.payload.target.length).toBeGreaterThan(0);
    })

    it("It returns 201 and empty 'target' if we provide source that does not exist or does not match", async () => {
        for (let trans of introduceTranslations) {
            await Translation.build(trans).save();
        }

        const result = await request(app)
            .post('/translate')
            .send(getTranslation2)

        expect(result.status).toEqual(201);
        expect(result.body.payload.target.length).toBe(0);
    })


})
