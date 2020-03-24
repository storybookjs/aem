const prompts = require('prompts');

const cwd = process.cwd();
const getRootDirectoryChoices = () => {
    const directories = cwd.split('/');
    const choices = [];

    directories.forEach( directory => {
        choices.push({
            title: `${cwd.split(directory)[0]}${directory}`, 
            value: `${directory}`
        });
    });

    return choices;
}

const getRelativePathToRoot = projectRoot => {
    const directories = cwd.split('/');
    const rootIndex = directories.indexOf(projectRoot);
    let relativePathToRoot = '';
    for (var i = 0; i < directories.length - rootIndex; i++) {
        relativePathToRoot += '../'
    }
    return relativePathToRoot;
}

module.exports = async args => {
    const rootPathAnswer = await prompts({
        type: 'select',
        name: 'projectRoot',
        message: 'Select the project root folder',
        choices: getRootDirectoryChoices()
    });

    return { 
        ...rootPathAnswer, 
        relativeProjectRoot: getRelativePathToRoot(rootPathAnswer.projectRoot) 
    }
}