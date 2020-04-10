import rootPath from './questions/rootPath';
import packageJSON from './questions/packageJSON';
import projectPaths from './questions/projectPaths';
import install from './install';

/*
const packageJSONPrompts = require('./packageJSON');
const webpackPrompts = require('./webpack');
const techPrompts = require('./tech');
const clientlibPrompts = require('./clientlibs');
const storybookPrompts = require('./storybookPrompts');
*/

export const initCommand = async args => {
  await packageJSON();
  const absoluteRootPath = await rootPath();

  let answers = { };

  answers = { ...answers, ...(await projectPaths(args, answers, absoluteRootPath)) };

  return install(answers);
};
