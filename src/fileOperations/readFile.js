import { join, isAbsolute } from 'path'; 
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import errorHandler from '../utils/errorHandler.js';

const readFile = async (path) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    if (!path) {
        errorHandler();
    } else {
        const currentDirectoryPath = process.cwd();
        let fileToReadPath = '';
        if (isAbsolute(path)) {
            fileToReadPath = path;
        } else {
            fileToReadPath = join(currentDirectoryPath, path);
        }
        
        fs.readFile(fileToReadPath, 'utf8', (error, data) => {
            if (error) {
                errorHandler();
            } else {
                console.log(data);
            }
        }); 
    }
};

export default readFile;