import { writeFile } from "fs/promises";
import errorHandler from "../utils/errorHandler.js";
import { resolve } from 'path';

const addEmptyFile = async (file) => {
    if (!file) {
        errorHandler();
    } else {
        const fileName = file[0];
        const currentWorkingDirectory = process.cwd();
        const fileNamePath = resolve(currentWorkingDirectory, fileName);
        try {
            await writeFile(fileNamePath, '', {flag: 'wx'});
        }
        catch {
            errorHandler();
        }
    }
};

export default addEmptyFile;