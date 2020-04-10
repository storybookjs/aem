import rootPathQuestions from './questions/rootPathQuestions';
import packageJSONQuestions from './questions/packageJSONQuestions';
import projectPathQuestions from './questions/projectPathQuestions';
import storybookQuestions from './questions/storybookQuestions';
import addonQuestions from './questions/addonQuestions';
import aemContentQuestions from './questions/aemContentQuestions';
import aemPackageQuestions from './questions/aemPackageQuestions';
import createFiles from './createFiles';
import install from './install';
import { storyCommand } from '../stories';
import { log } from '../../utils';

export const initCommand = async args => {
  await packageJSONQuestions();
  const absoluteRootPath = await rootPathQuestions();

  let answers = {};

  answers = { ...answers, ...(await projectPathQuestions(args, answers, absoluteRootPath)) };
  answers = { ...answers, ...(await storybookQuestions(args, answers, absoluteRootPath)) };
  answers = { ...answers, ...(await addonQuestions(args, answers, absoluteRootPath)) };
  answers = { ...answers, ...(await aemContentQuestions(args, answers, absoluteRootPath)) };
  answers = { ...answers, ...(await aemPackageQuestions(args, answers, absoluteRootPath)) };

  answers = {
    ...answers,
    storyRoot: 'Components',
  };

  const packages = await createFiles(answers);

  // This does not wait for the user prompt, it skipps to the npm install.
  //log('Lets create some stories');
  //await storyCommand([], answers);

  install(packages);
};
