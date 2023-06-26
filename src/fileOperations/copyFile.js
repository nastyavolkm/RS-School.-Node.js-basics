import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { resolve, isAbsolute } from 'path';
import errorHandler from '../utils/errorHandler.js';
import { promisify } from 'util';
import { pipeline } from 'stream';

const copyFile = async (args) => {
    if (!args) {
        errorHandler();
    } else {
        const pathToFile = args[0];
        const copiedFilePath = args[1];
        const isDelete = args[2]?.isDelete;
        let sourceFilePath = '';
        let targetFilePath = '';

        const currentDirectoryPath = process.cwd();
        try {
            if (isAbsolute(pathToFile)) {
                sourceFilePath = pathToFile;
            } else {
                sourceFilePath = resolve(currentDirectoryPath, pathToFile);
            }

            if (isAbsolute(copiedFilePath)) {
                targetFilePath = copiedFilePath;
            } else {
                const sourcePathAsArray = sourceFilePath.split('\\');
                const fileName = sourcePathAsArray[sourcePathAsArray.length-1];    
                targetFilePath = resolve(currentDirectoryPath, copiedFilePath, fileName);
            }

            const readStream = createReadStream(sourceFilePath);
            const writeStream = createWriteStream(targetFilePath);

            const pipelineAsync = promisify(pipeline);

            await pipelineAsync(
                readStream, 
                writeStream
            );

            if (isDelete) {
                await unlink(sourceFilePath);
            }
        }
        catch (error) {
            console.log(error);
            errorHandler();
        }    
    }

};

export default copyFile;