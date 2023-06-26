import { readFile } from 'fs';
import errorHandler from '../utils/errorHandler.js';
import { resolve, isAbsolute } from 'path';
import { createHash } from 'crypto';

const calculateHash = async (pathArr) => {
    if (!pathArr) {
        errorHandler();
    } else {
        const path = pathArr[0];
        const currentDirectoryPath = process.cwd();
        let resultPath = '';
        try {
            if (isAbsolute(path)) {
                resultPath = path;
            } else {
                resultPath = resolve(currentDirectoryPath, path);
            }
            readFile(resultPath, (error, data) => {
                if (error) {
                    errorHandler();
                } else {
                    const hash = createHash("sha256").update(data).digest("hex");
                    console.log(hash);
                }
            });    
        }
        catch {
            errorHandler();
        }
    }
};

export default calculateHash;