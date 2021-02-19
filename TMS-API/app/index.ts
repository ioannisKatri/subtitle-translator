import app from './app';
import mongoDb from "./utils/databases/mongoDb";
import logger from "./utils/logger";
import {dbErrorCodes, OtherCodes} from "./utils/logger/loggingCodes";
import dotEnv from "dotenv";


dotEnv.config()


const startApp = async () => {

    const result = await mongoDb.connect();

    if (result === null) {
        logger.error(dbErrorCodes.UNABLE_TO_CONNECT_TO_DB)
        throw new Error(dbErrorCodes.UNABLE_TO_CONNECT_TO_DB)
    }

    app.listen(process.env.PORT || 4000, () => {
        logger.info("App listening on 4000  port")
    });
}

startApp().catch((err) => {
    logger.error(OtherCodes.APP_FAILED_TO_START)
});
