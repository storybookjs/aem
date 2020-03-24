const rootPathPrompts = require('./rootPath');
const foldersPrompts = require('./folders');
const packageJSONPrompts = require('./packageJSON');
const webpackPrompts = require('./webpack');
const techPrompts = require('./tech');
const clientlibPrompts = require('./clientlibs');
const storybookPrompts = require('./storybookPrompts');
const install = require('../install');

module.exports = async args => {

    let config = { 'jsFramework': 'react' };
    
    const rootPathAnswers = await rootPathPrompts(args)
        config = { ...config, ...rootPathAnswers };
    const folderAnswers = await foldersPrompts(args, config);
        config = { ...config, ...folderAnswers };
    const packageJSONAnswers = await packageJSONPrompts(args, config);
        config = { ...config, ...packageJSONAnswers };
    const webpackAnswers = await webpackPrompts(args, config);
        config = { ...config, ...webpackAnswers };
    const techAnswers = await techPrompts(args, config);
        config = { ...config, ...techAnswers };
    const clientlibAnswers = await clientlibPrompts(args, config);
        config = { ...config, ...clientlibAnswers };
    const storybookAnswers = await storybookPrompts(args, config);
        config = { ...config, ...storybookAnswers };

    return await install(config);    
}