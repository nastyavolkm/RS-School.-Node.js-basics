import { goFolderUp, goToDirectory, readDirectory } from "../navigation/navigation.js";
import readFile from "../fileOperations/readFile.js";
import addEmptyFile from "../fileOperations/addEmptyFile.js";
import renameFile from "../fileOperations/rename.js";
import copyFile from "../fileOperations/copyFile.js";
import { exitHandler } from "../utils/utils.js";
import deleteFile from "../fileOperations/deleteFile.js";
import { getOSData } from "../os/os-functions.js";

const commands = [
    { 
        ['up']: goFolderUp,
     },
    {
        ['cd']: goToDirectory,
    },
    {
        ['ls']: readDirectory,
    },
    {
        ['cat']: readFile,
    },
    {
        ['add']: addEmptyFile,
    },
    {
        ['rn']: renameFile,
    },
    {
        ['cp']: copyFile,
    },
    {
        ['mv']: copyFile,
        defaultArgs: [
            { 
            isDelete: true,
        },
    ],
    },
    {
        ['rm']: deleteFile,
    },
    {
        ['os']: getOSData,
    },
];

export { commands };