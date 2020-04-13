import prompts from 'prompts';
import path from 'path';
import { getChoicesFromDirectories } from './getChoicesFromDirectories';

const CHOICE_FINISHED_NAVIGATING = 'CHOICE_FINISHED_NAVIGATING';
const CHOICE_BACK_NAVIGATING = 'CHOICE_BACK_NAVIGATING';
const RECURSE_LIMIT = 20;

export const navigatePrompt = async (startingPath, message) => {
  const normalizedStartingPath = [path.sep, ...path.normalize(startingPath).split(path.sep)];
  const normalizedStartingPathStr = normalizedStartingPath.join(path.sep);
  const selectedPath = normalizedStartingPath;
  let pathSegment = '';
  let count = 0;

  while (pathSegment !== CHOICE_FINISHED_NAVIGATING && count < RECURSE_LIMIT) {
    const choices = getChoicesFromDirectories(path.join(...selectedPath));
    choices.unshift({ title: `<- Back`, value: CHOICE_BACK_NAVIGATING });
    choices.unshift({
      title: `Select ${path.relative(normalizedStartingPathStr, selectedPath.join('/'))}`,
      value: CHOICE_FINISHED_NAVIGATING,
    });

    /* eslint-disable no-await-in-loop */
    pathSegment = (
      await prompts({
        type: 'select',
        name: 'pathSegment',
        message,
        choices,
      })
    ).pathSegment;

    if (pathSegment === CHOICE_BACK_NAVIGATING) {
      selectedPath.pop();
    } else if (pathSegment !== CHOICE_FINISHED_NAVIGATING) {
      selectedPath.push(pathSegment);
    }

    count += 1;
  }

  return selectedPath;
};
