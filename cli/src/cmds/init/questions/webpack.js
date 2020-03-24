const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const cwd = process.cwd();

module.exports = async (args,config) => {
    let filename = false;
    try { 
        if (fs.existsSync(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, 'webpack.config.js'))) {
            filename = `./webpack.config.js`;
        } else if (fs.existsSync(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.uiApps, 'webpack.config.js'))) {
            filename = `${config.uiApps}/webpack.config.js`;
        }
    } catch(err) { throw err; }
    
    const questions = [
        {
            type: () => filename ? 'toggle' : false,
            name: 'projectWebpackConfig',
            message: `Is this your webpack.config.js file? -> ${filename}`,
            initial: true,
            active: 'Yes',
            inactive: 'No',
            format: value => {
                if (value) return filename;
                else return false;
            }
        },
        {
            type: () => filename === false ? 'toggle' : false,
            name: 'createWebpackConfig',
            message: `We couldn't find a webpack file, would you like us to make one here? -> ${config.uiApps}/webpack.config.js`,
            initial: true,
            active: 'Yes',
            inactive: 'No'
        }
    ];

    const answers = await prompts(questions);

    if (answers.createWebpackConfig) fs.writeFileSync(path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.uiApps, 'webpack.config.js'), `module.exports = {};`);

    return answers;
}
    