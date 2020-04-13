import prompts from 'prompts';
import path from 'path';
import { getChoicesFromDirectories } from './getChoicesFromDirectories';

const CHOICE_FINISHED_NAVIGATING = 'CHOICE_FINISHED_NAVIGATING';
const RECURSE_LIMIT = 20;

export const navigatePrompt = async (startingPath, message) => {
  const selectedPath = [startingPath];
  let pathSegment = '';
  let count = 0;

  while (pathSegment !== CHOICE_FINISHED_NAVIGATING && count < RECURSE_LIMIT) {
    /* eslint-disable no-await-in-loop */
    pathSegment = (
      await prompts({
        type: 'select',
        name: 'pathSegment',
        message: message,
        choices: [
          { title: `Select ${path.relative(startingPath, selectedPath.join('/'))}`, value: CHOICE_FINISHED_NAVIGATING },
          ...getChoicesFromDirectories(path.join(...selectedPath)),
        ],
      })
    ).pathSegment;

    if (pathSegment !== CHOICE_FINISHED_NAVIGATING) {
      selectedPath.push(pathSegment);
    }

    count ++;
  }

  return selectedPath;
};
