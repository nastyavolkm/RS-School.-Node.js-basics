import readline from 'readline';
import { commands } from '../commands/commands.js';
import invalidCommandHandler from './invalidCommandHandler.js';

let user = '';

const initApp = () => {
    const args = process.argv.slice(2);
    const userName = args.join('').split('=')[1] || 'My dear user';
    user = userName;
    const welcomeWording = `Welcome to the File Manager, ${userName}!`;
    console.log(welcomeWording);
    printWorkingDirectory();
}

const printWorkingDirectory = () => {
    const fileName = process.cwd();
    const wording = `You are currently in ${fileName}`;
    console.log(wording);
};

const exitHandler = () => {
    const userName = user;
    const exitWording = `Thank you for using File Manager, ${userName}, goodbye!`;
    console.log(exitWording);
    process.exit(0);
};

const commandListener = async () => {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const runCommand = async (line) => {
        const [first, ...rest] = line.split(' ');
        const commandFromInput = first;
        const command = commands.find((item) => Object.keys(item)[0] === commandFromInput);
        if (command) {
            const args = command.defaultArgs ? [...rest, {defaultArgs: command.defaultArgs}] : rest;
            await command[commandFromInput](args); 
        } else {
            invalidCommandHandler();
        }
    };

    readLine.on('line', async (line) => {
        await runCommand(line);
        printWorkingDirectory();
      }); 

    readLine.on('close', async () => {
        console.log('close');
        exitHandler();
    });
};

export {    
    exitHandler,
    commandListener,
    initApp,
};