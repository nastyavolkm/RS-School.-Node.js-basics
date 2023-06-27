const printWorkingDirectory = () => {
    const fileName = process.cwd();
    const wording = `You are currently in ${fileName}`;
    console.log(wording);
};

export default printWorkingDirectory;