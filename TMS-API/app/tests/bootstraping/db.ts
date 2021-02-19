import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

import Translation, {TranslationsModel} from '../../models/translationsModel'

export const introduceTranslations = [
    {
        "source": "Hello World",
        "target": "Hallo Welt",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    },
    {
        "source": "Hello guys",
        "target": "Hallo Leute",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    },
    {
        "source": "I walk to the supermarket",
        "target": "Ich gehe zum Supermarkt.",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    }
]

export const introduceTranslations2 = [
    {
        "source": "Hello something",
        "target": "Hallo Welt Something",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    },
    {
        "source": "Hello guys one",
        "target": "Hallo Leute one",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    },
    {
        "source": "I walk to the supermarket one",
        "target": "Ich gehe zum Supermarkt one",
        "sourceLanguage": "en",
        "targetLanguage": "de"
    }
]

export const introduceInvalidTranslations = [
    {
        "sou3213rce": "Hello World",
        "target": "Hallo Welt",
        "s3312321ourceLanguage": "en",
        "ta3213getLanguage": "de"
    },
    {
        "source": "Hello guys",
        "sour321ceLanguage": "en",
        "targ123312etLanguage": "de"
    },
]

export const getTranslation = {
    "source": "Hello World",
    "sourceLanguage": "en",
    "targetLanguage": "de"
}

export const getTranslation2 = {
    "source": "Hello Wsdorl3333d",
    "sourceLanguage": "en",
    "targetLanguage": "de"
}

const mongodServer = new MongoMemoryServer();

export const setupDatabase = async () => {
    const uri = await mongodServer.getUri();
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (err) {
        throw new Error("DATABASE CONNECTION ERROR")
    }
}

export const deleteEntries = async () => {
    await Translation.deleteMany({});
}

export const disconnect = async () => {
    await mongoose.disconnect();
    await mongodServer.stop();
}

module.exports = {
    introduceTranslations,
    introduceTranslations2,
    getTranslation,
    getTranslation2,
    introduceInvalidTranslations,
    setupDatabase,
    deleteEntries,
    disconnect
}
