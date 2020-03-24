const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const cwd = process.cwd();

module.exports = async (args, config) => {
    let fileLocation = false;
    let filename = false;

    try { 
        if (fs.existsSync(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, 'package.json'))) {
            fileLocation = 'root';
            filename = `./package.json`;
        } else if (fs.existsSync(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.uiApps, 'package.json'))) {
            fileLocation = 'ui.apps';
            filename = `${config.uiApps}/package.json`;
        }
    } catch(err) { throw err; }

    // improve this for other package.json locations
    const questions = [
        {
            type: () => fileLocation ? 'toggle' : false,
            name: 'packageJSON',
            message: `Is this your package.json file? -> ${filename}`,
            initial: true,
            active: 'Yes',
            inactive: 'No',
            format: value => {
                if (value) return `${filename}`;
                else return false;
            }
        },
        {
            type: prev => !prev ? 'toggle' : false,
            name: 'createPackageJSON',
            message: `You will need a package.json to continue, create file here? ${cwd}/package.json`,
            initial: true,
            active: 'Yes',
            inactive: 'No'
        }
    ];

    const answers = await prompts(questions);
    if (answers.createPackageJSON) console.log('run npm init');

    return answers;
}