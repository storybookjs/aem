import prompts from 'prompts';
import path from 'path';
import { log, navigatePrompt } from '../../../utils';

const cwd = process.cwd();

export default async (args, config, absoluteRootPath) => {
  const componentPath = await navigatePrompt(absoluteRootPath, 'Navigate to the directory containing your components');
  const projectPathAnswers: any = {};

  if (componentPath.includes('jcr_root')) {
    const jcrRootPath = componentPath.slice(0, componentPath.indexOf('jcr_root') + 1);
    projectPathAnswers.appsPath = path.join(
      path.relative(cwd, absoluteRootPath),
      path.relative(absoluteRootPath, path.join(...jcrRootPath)),
      'apps'
    );
  }

  const componentPathStr = path.join(
    path.relative(cwd, absoluteRootPath),
    path.relative(absoluteRootPath, path.join(...componentPath))
  );

  projectPathAnswers.componentPaths = [componentPathStr];

  return { ...config, ...projectPathAnswers };
};
