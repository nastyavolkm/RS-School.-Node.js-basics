import commandListener from './utils/commandListener.js';
import { setUser } from './userStore/user.js';
import printWorkingDirectory from './utils/printWorkingDirectory.js';


const initApp = () => {
    const args = process.argv.slice(2);
    const userName = args.join('').split('=')[1] || 'My dear user';
    setUser(userName);
    const welcomeWording = `Welcome to the File Manager, ${userName}!`;
    console.log(welcomeWording);
    printWorkingDirectory();
}

initApp();
commandListener();

