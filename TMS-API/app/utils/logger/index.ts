import {createLogger, format, transports, Logger} from "winston";
import DatadogWinston from 'datadog-winston';
import dotEnv from "dotenv";

dotEnv.config({ path: process.env.NODE_ENV !== "test" ? '.env': '.env.test' })
const httpTransportOptions = {
    host: `http-intake.logs.${process.env.DD_SITE}`,
    path: `/v1/input`,
    ssl: true,
    ddsource: "node",
    service: "Tms-API",
    headers: {
        "DD-API-KEY": process.env.DD_API_KEY,
    },
};

export const logConfigDev = {
    level: "info",
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    ),
    // transports: [],
    transports: [new transports.Console()],
};

export const logConfigProduction = {
    level: "info",
    exitOnError: false,
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Http(httpTransportOptions),
        new transports.Console(),
    ],
};

let logger: Logger;
if (process.env.NODE_ENV === "production") {
    logger = createLogger(logConfigProduction);
} else {
    logger = createLogger(logConfigDev);
}

logger.add(
    new DatadogWinston({
        apiKey: process.env.DD_API_KEY || '',
        hostname: "my_machine",
        service: "super_service",
        ddsource: "nodejs",
        ddtags: "foo:bar,boo:baz",
    })
);


export default logger;
