import projectPaths from './projectPaths';
/*
const packageJSONPrompts = require('./packageJSON');
const webpackPrompts = require('./webpack');
const techPrompts = require('./tech');
const clientlibPrompts = require('./clientlibs');
const storybookPrompts = require('./storybookPrompts');
*/

export default async args => {
  let answers = {};

  answers = { ...answers, ...(await projectPaths(args, answers)) };

  return answers;
};
