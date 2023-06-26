import { getUser } from "../userStore/user.js";

const exitHandler = () => {
    const userName = getUser();
    const exitWording = `Thank you for using File Manager, ${userName}, goodbye!`;
    console.log(exitWording);
    process.exit(0);
};

export default exitHandler;