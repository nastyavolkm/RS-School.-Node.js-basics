import { isAbsolute, resolve } from 'path'; 
import { createReadStream } from 'fs';
import errorHandler from '../utils/errorHandler.js';

const readFile = async (pathArr) => {
    if (!pathArr) {
        errorHandler();
    } else {
        try {
            const path = pathArr[0];
            const currentDirectoryPath = process.cwd();
            let fileToReadPath = '';
            if (isAbsolute(path)) {
                fileToReadPath = path;
            } else {
                fileToReadPath = resolve(currentDirectoryPath, path);
            }
            const readFileStream = createReadStream(fileToReadPath, 'utf-8');
            readFileStream.on('data', (data) => console.log(data));
    }
        catch {
            errorHandler();
        }
    }
        
};

export default readFile;