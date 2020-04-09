/*
const rootPathPrompts = require('./rootPath');
const foldersPrompts = require('./folders');
const packageJSONPrompts = require('./packageJSON');
const webpackPrompts = require('./webpack');
const techPrompts = require('./tech');
const clientlibPrompts = require('./clientlibs');
const storybookPrompts = require('./storybookPrompts');
*/

export default async args => {
  const answers = {};

  /*
  const rootPathAnswers = await rootPathPrompts(args)
      answers = { ...config, ...rootPathAnswers };
  const folderAnswers = await foldersPrompts(args, config);
      answers = { ...config, ...folderAnswers };
  const packageJSONAnswers = await packageJSONPrompts(args, config);
      answers = { ...config, ...packageJSONAnswers };
  const webpackAnswers = await webpackPrompts(args, config);
      answers = { ...config, ...webpackAnswers };
  const techAnswers = await techPrompts(args, config);
      answers = { ...config, ...techAnswers };
  const clientlibAnswers = await clientlibPrompts(args, config);
      answers = { ...config, ...clientlibAnswers };
  const storybookAnswers = await storybookPrompts(args, config);
      answers = { ...config, ...storybookAnswers };
  */

  return answers;
};
