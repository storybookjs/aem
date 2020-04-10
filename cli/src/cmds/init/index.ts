import rootPathQuestions from './questions/rootPathQuestions';
import packageJSONQuestions from './questions/packageJSONQuestions';
import projectPathQuestions from './questions/projectPathQuestions';
import storybookQuestions from './questions/storybookQuestions';
import install from './install';

/*
const packageJSONPrompts = require('./packageJSON');
const webpackPrompts = require('./webpack');
const techPrompts = require('./tech');
const clientlibPrompts = require('./clientlibs');
*/

export const initCommand = async args => {
  await packageJSONQuestions();
  const absoluteRootPath = await rootPathQuestions();

  let answers = { };

  answers = { ...answers, ...(await projectPathQuestions(args, answers, absoluteRootPath)) };
  answers = { ...answers, ...(await storybookQuestions(args, answers, absoluteRootPath)) };

  return install(answers);
};
