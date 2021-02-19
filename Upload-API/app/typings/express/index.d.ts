// Utilizing declaration merging
interface UserPayload {
    email: string;
    folderName: string;
    files: [string];
    sourceLanguage: string;
    targetLanguage: string;
}

declare namespace Express {
    export interface Request {
        user: UserPayload;
    }
}