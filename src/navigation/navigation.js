import { isAbsolute, resolve } from 'path';
import errorHandler from '../utils/errorHandler.js';
import { readdir } from 'fs';

const goFolderUp = () => {
    const currentDirectoryPath = process.cwd();
    const directoryPathsArray = currentDirectoryPath.split('\\');
    let newPath = '';
    if (directoryPathsArray.length > 0) {
        newPath = directoryPathsArray.slice(0, -1).join('\\');
    } else {
        newPath = directoryPathsArray[0].join('\\');
    }
    process.chdir(newPath);
};

const goToDirectory = (directoryPath) => {
    const currentPath = process.cwd();
    if (!directoryPath) {
        process.chdir(currentPath);    
    } else {
        const path = directoryPath[0];
        try {
            if (isAbsolute(path)) {
            process.chdir(path);
        } else {
            const newPath = resolve(currentPath, path);
            process.chdir(newPath);
        }
    } catch  {
        errorHandler();
    }
}
}

const readDirectory = () => {
    const workingDirectory = process.cwd();
    readdir(workingDirectory, { withFileTypes: true }, (error, files) => {
        if (error) {
            errorHandler();
        } else {
            const filesForTable = [];
            files.forEach((file) => {
                const fileType = file.isFile() ? 'file' : 'directory';
                filesForTable.push({
                    Name: file.name,
                    Type: fileType,
                });
            });
            filesForTable
            .sort((a, b) => a.Name.toLowerCase() > b.Name.toLowerCase() ? -1 : 1)
            .sort((a, b) => a.Type > b.Type ? 1 : -1);

            console.table(filesForTable);
        }
    });
};

export {
    goFolderUp, goToDirectory, readDirectory,
}