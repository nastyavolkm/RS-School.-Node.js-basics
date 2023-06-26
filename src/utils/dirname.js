const getCurrentDirectory = () => {
    const currentDirectoryPath = process.cwd();
    return currentDirectoryPath;
};

export { getCurrentDirectory };