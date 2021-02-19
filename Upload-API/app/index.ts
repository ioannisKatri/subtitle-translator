import app from './app';
import {OtherCodes} from "./utils/logger/loggingCodes";
import logger from "./utils/logger";

const startApp = async () => {

    app.listen(process.env.PORT || 3000, () => {
        logger.info("App listening on 3000  port")
    });
}

startApp().catch((err) => {
    logger.error(OtherCodes.APP_FAILED_TO_START)
});
