import 'express-async-errors';
import express, {Application} from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import expressWinston from "express-winston";

import tmsRouter from "./routers/tmsRouter";
import swaggerDocument from "./swagger.json";
import {errorHandler} from "./middlewares/errorHandler";
import {logConfigDev, logConfigProduction} from "./utils/logger";


const app: Application = express();

const router = express.Router();

app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
    app.use(expressWinston.logger(logConfigProduction));
} else if (process.env.NODE_ENV !== "test"){
    app.use(expressWinston.logger(logConfigDev));
}

app.use(tmsRouter(router))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(errorHandler)

export default app;
