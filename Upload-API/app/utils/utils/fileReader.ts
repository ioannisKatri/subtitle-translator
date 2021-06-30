import util from "util";
import fs from "fs";

export const fileReader = async (path: string, file: string): Promise<string> => {
    let readFile = util.promisify(fs.readFile);
    return await readFile(`${path}/${file}` , {encoding: "utf8"});
}
