import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let userName = '';
const parseArgs = () => {
    const args = process.argv.slice(2);
    userName = args.join('').split('=')[1];
    const welcomeWording = `Welcome to the File Manager, ${userName}!`;
    console.log(welcomeWording);
}

const printWorkingDirectory = () => {
    const fileName= path.join(__dirname);
    const wording = `You are currently in ${fileName}`;
    console.log(wording);
};

const addEndInputEventListener = async () => {
    process.stdin.on('data', () => {
        printWorkingDirectory();
    });       
};

parseArgs();
printWorkingDirectory();
await addEndInputEventListener();

process.on('SIGINT', () => {
    const exitWording = `Thank you for using File Manager, ${userName}, goodbye!`;
    console.log(exitWording);
    process.exit(0);
});
