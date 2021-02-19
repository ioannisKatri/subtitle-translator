import util from "util";
import fs from "fs";

export const fileWriter = async (path: string, file: string, output: string)  => {
    let outputFile = util.promisify(fs.writeFile);
    await outputFile(`${path}/${file}`, output)
}