import readline from 'readline';
import { commands } from '../commands/commands.js';
import invalidCommandHandler from './invalidCommandHandler.js';
import exitHandler from './exitHandler.js';
import printWorkingDirectory from './printWorkingDirectory.js';

const commandListener = async () => {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const runCommand = async (line) => {
        if (line === '.exit') {
            exitHandler();
        }
        const [first, ...rest] = line.split(' ');
        const commandFromInput = first;
        const command = commands.find((item) => Object.keys(item)[0] === commandFromInput);
        if (command) {
            let formattedArgs = rest
            .join(' ')
            .split('\'')
            .filter((arg) => (arg !== '') && (arg !== ' '))
            .map((arg) => {
                return arg.replace(/\//g, "\\");
            });
            const args = command.defaultArgs ? [...formattedArgs, {defaultArgs: command.defaultArgs}] : formattedArgs;
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
        exitHandler();
    });
};

export default commandListener;