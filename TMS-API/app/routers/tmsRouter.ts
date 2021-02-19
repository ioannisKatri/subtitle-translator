import {Router} from "express";
import {introduce, translate} from "../controllers/tmsController";
import {body} from "express-validator";
import {validateRequestErrors} from "../middlewares/validateRequestErrors";

export default function tmsRouter(router: Router) {
    // one for translating and the other for introducing data.
    router.post("/translate", [
            body('source', 'source field must exist and be a string').exists().isString(),
            body('sourceLanguage', 'sourceLanguage field must exist and be a string').exists().isString(),
            body('targetLanguage', 'targetLanguage field must exist and be a string').exists().isString()
        ],
        validateRequestErrors, translate)
    router.post("/introduce",
        [
            body().isArray(),
            body('*.source', 'source field must exist and be a string').exists().isString(),
            body('*.target', 'target field must exist and be a string').exists().isString(),
            body('*.sourceLanguage', 'sourceLanguage field must exist and be a string').exists().isString(),
            body('*.targetLanguage', 'targetLanguage field must exist and be a string').exists().isString()
        ],
        validateRequestErrors,
        introduce
    )

    return router;
}
