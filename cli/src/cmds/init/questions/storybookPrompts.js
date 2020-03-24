const prompts = require('prompts');
const path = require('path');
const npm = require('npm');

const cwd = process.cwd();

module.exports = async (args, config) => {
    const questions = [
        {
            type: 'toggle',
            name: 'storybookLocation',
            message: `Use default storybook file location? e.g. ${config.uiApps}/.storybook/`,
            initial: true,
            active: 'Yes',
            inactive: 'No',
            format: value => {
                if (value) return `${config.uiApps}/.storybook/`;
                else return false;
            }
        },
        {
            type: 'toggle',
            name: 'storybookStoryLocation',
            message: 'Use default story file location - alongside component code?',
            initial: true,
            active: 'Yes',
            inactive: 'No',
            format: value => {
                if (value) return path.relative(config.packageJSON,config.componentPath);
                else return false;
            }
        }
    ];

    const storybookAnswers = await prompts(questions);

    return { ...config, ...storybookAnswers }
}