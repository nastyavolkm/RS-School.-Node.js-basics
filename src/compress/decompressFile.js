import errorHandler from "../utils/errorHandler.js";
import zlib from 'zlib';
import { resolve, isAbsolute } from 'path';
import { createWriteStream, createReadStream } from 'fs';

const decompressFile = async (pathsArray) => {
    if (!pathsArray) {
        errorHandler();
    } else {
        const pathToFile = pathsArray[0];
        const compressedFilePath = pathsArray[1];
        let sourceFilePath = '';
        let targetFilePath = '';

        const currentDirectoryPath = process.cwd();
        try {
            if (isAbsolute(pathToFile)) {
                sourceFilePath = pathToFile;
            } else {
                sourceFilePath = resolve(currentDirectoryPath, pathToFile);
            }

            if (isAbsolute(compressedFilePath)) {
                targetFilePath = compressedFilePath;
            } else {
                const sourcePathAsArray = sourceFilePath.split('\\');
                const fileName = sourcePathAsArray[sourcePathAsArray.length-1].split('.').slice(0, -1).join('.');    
                targetFilePath = resolve(currentDirectoryPath, compressedFilePath, fileName);
            }

            const readStream = createReadStream(sourceFilePath);
            const writeStream = createWriteStream(targetFilePath);

            const brotli = zlib.createBrotliDecompress();
            readStream.pipe(brotli).pipe(writeStream);
        }
        catch {
            errorHandler();
        }    
    }

};

export default decompressFile;