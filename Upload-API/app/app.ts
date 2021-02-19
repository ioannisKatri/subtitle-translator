import 'express-async-errors';
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import expressWinston from "express-winston";
import swaggerDocument from "./swagger.json";
import dotEnv from 'dotenv';
import swaggerUi from "swagger-ui-express";

import {NotFoundError} from "./utils/errors/not-found-error";
import {logConfigDev, logConfigProduction} from "./utils/logger";
import uploadRouter from "./routers/uploadRouter";
import {errorHandler} from "./middlewares/errorHandler";

const app: Application = express();
const router = express.Router();

dotEnv.config()

app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
    app.use(expressWinston.logger(logConfigProduction));
} else if (process.env.NODE_ENV !== "test"){
    app.use(expressWinston.logger(logConfigDev));
}


app.get("/", async (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "/assets/", "index.html"));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(uploadRouter(router))

app.all("*", async (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export default app;
