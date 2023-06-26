import os from 'os';
import invalidCommandHandler from '../utils/invalidCommandHandler';

const getOSData = (arg) => {
    const data = arg?.[0].slice(2);
    console.log(data);
    switch (data) {
        case 'EOL': {
            const EOL = JSON.stringify(os.EOL);
            console.log(EOL);
            break;
        }
        case 'cpus': {
            const cpus = os.cpus();
            const cpusLength = cpus.length;
            console.log(`Amount of CPUs is ${cpusLength}`);
            cpus.forEach(({model}) => {
                const modelArray = model.split('@');
                console.log(`Model name is ${modelArray[0]} with clock rate ${modelArray[1]}`);
            });
            break;
        }
        case 'homedir': {
            const homeDirectory = os.homedir();
            console.log(homeDirectory);
            break;
        }
        case 'username': {
            const userName = os.userInfo().username;
            console.log(userName);
            break;
        }
        case 'architecture': {
            const architecture = os.arch();
            console.log(architecture);
            break;
        }
        default: invalidCommandHandler();
    }
};

export {
    getOSData,
};