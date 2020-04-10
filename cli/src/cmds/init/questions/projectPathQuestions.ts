import prompts from 'prompts';
import path from 'path';
import { getChoicesFromDirectories, log } from '../../../utils';

const cwd = process.cwd();
const CHOICE_FINISHED_NAVIGATING = 'CHOICE_FINISHED_NAVIGATING';

export default async (args, config, absoluteRootPath) => {
  const relativeProjectRoot = path.relative(cwd, absoluteRootPath);
  const componentPath = [relativeProjectRoot];
  const projectPathAnswers: any = {};

  let pathSegment = '';
  while (pathSegment !== CHOICE_FINISHED_NAVIGATING) {
    /* eslint-disable no-await-in-loop */
    pathSegment = (
      await prompts({
        type: 'select',
        name: 'pathSegment',
        message: `Navigate to the directory containing your components.\n  If you have more than one component directory they can be added in the "@storybook/aem-cli" section of the package.json.\n  `,
        choices: [
          { title: 'Select this folder', value: CHOICE_FINISHED_NAVIGATING },
          ...getChoicesFromDirectories(path.join(...componentPath)),
        ],
      })
    ).pathSegment;

    if (pathSegment !== CHOICE_FINISHED_NAVIGATING) {
      componentPath.push(pathSegment);
    }
  }

  if (componentPath.includes('jcr_root')) {
    const jcrRootPath = componentPath.slice(0, componentPath.indexOf('jcr_root'));
    projectPathAnswers.appsPath = path.join(...jcrRootPath, 'apps');
  }

  projectPathAnswers.componentPaths = [path.join(...componentPath)];

  return { ...config, ...projectPathAnswers };
};
