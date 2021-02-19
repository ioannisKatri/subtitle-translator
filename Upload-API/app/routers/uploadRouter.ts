import {Router} from "express";
import {initializeFilesUser} from "../middlewares/initializeFilesUser";
import {createUpload} from "../controllers/uploadController";

export default function uploadRouter(router: Router) {
    router.post("/upload", initializeFilesUser, createUpload)
    return router;
}
