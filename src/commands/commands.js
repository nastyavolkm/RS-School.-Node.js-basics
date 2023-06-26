import { goFolderUp, goToDirectory, readDirectory } from "../navigation/navigation.js";
import readFile from "../fileOperations/readFile.js";
import addEmptyFile from "../fileOperations/addEmptyFile.js";

const commands = [
    { 
        up: goFolderUp,
     },
    {
        cd: goToDirectory,
    },
    {
        ls: readDirectory,
    },
    {
        cat: readFile,
    },
    {
        add: addEmptyFile,
    },
];

export { commands };