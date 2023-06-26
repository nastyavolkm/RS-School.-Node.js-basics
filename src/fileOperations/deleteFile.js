import errorHandler from "../utils/errorHandler.js";
import { resolve, isAbsolute } from 'path';
import { unlink } from 'fs/promises';

const deleteFile = async (pathsArray) => {
    if (!pathsArray) {
        errorHandler();
    } else {
        const pathToFile = pathsArray[0];
        let fileToDeletePath = '';
        const currentDirectoryPath = process.cwd();
        try {
            if (isAbsolute(pathToFile)) {
                fileToDeletePath = pathToFile;
            } else {
                fileToDeletePath = resolve(currentDirectoryPath, pathToFile);
            }

            await unlink(fileToDeletePath);
        }
        catch {
            errorHandler();
        }
    }
};

export default deleteFile;