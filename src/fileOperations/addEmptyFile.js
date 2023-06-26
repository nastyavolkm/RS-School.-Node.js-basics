import { writeFile } from "fs/promises";
import errorHandler from "../utils/errorHandler.js";
import { resolve } from 'path';

const addEmptyFile = async (fileName) => {
    if (!fileName) {
        errorHandler();
    } else {
        const currentWorkingDirectory = process.cwd();
        const fileNamePath = resolve(currentWorkingDirectory, fileName);
        try {
            await writeFile(fileNamePath, '', {flag: 'wx'});
        }
        catch (error) {
            errorHandler();
        }
    }
};

export default addEmptyFile;