import prompts from 'prompts';
import path from 'path';
import { log, navigatePrompt } from '../../../utils';

const cwd = process.cwd();

export default async (args, config, absoluteRootPath) => {
  const relativeProjectRoot = path.relative(cwd, absoluteRootPath);
  const componentPath = await navigatePrompt(relativeProjectRoot, 'Navigate to the directory containing your components');
  const projectPathAnswers: any = {};

  if (componentPath.includes('jcr_root')) {
    const jcrRootPath = componentPath.slice(0, componentPath.indexOf('jcr_root') + 1);
    projectPathAnswers.appsPath = path.join(...jcrRootPath, 'apps');
  }

  projectPathAnswers.componentPaths = [path.join(...componentPath)];

  return { ...config, ...projectPathAnswers };
};
