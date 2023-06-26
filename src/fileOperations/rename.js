import errorHandler from "../utils/errorHandler.js";
import { resolve, isAbsolute } from 'path';
import { rename } from 'fs/promises';

const renameFile = async (args) => {
    if (!args) {
        errorHandler();
    } else {
        const path = args[0];
        const newName = args[1];
        let oldFilePath = '';
        const currentDirectoryPath = process.cwd();
        try {
            if (isAbsolute(path)) {
                oldFilePath = path;
            } else {
                oldFilePath = resolve(currentDirectoryPath, path);
            }

            const newFilePath = resolve(oldFilePath.split('\\').slice(0, -1).join('\\'), newName);
            await rename(oldFilePath, newFilePath);
        }
        catch {
            errorHandler();
        }    
    }
};

export default renameFile;