import prompts from 'prompts';
import path from 'path';
import { getChoicesFromDirectories, log } from '../../../utils';

const cwd = process.cwd();

export default async (args, config, absoluteRootPath) => {
  const relativeProjectRoot =  path.relative(cwd, absoluteRootPath);
  const appsPath = [ relativeProjectRoot ];

  let pathSegment = '';
  while (appsPath[appsPath.length - 1] !== 'jcr_root') {
    pathSegment = (await prompts({
      type: 'select',
      name: 'pathSegment',
      message: `Navigate to the 'jcr_root/apps' folder`,
      choices: getChoicesFromDirectories(path.join(...appsPath))
    })).pathSegment;

    appsPath.push(pathSegment);
  }

  config.appsPath = path.join(...appsPath);

  return config;
};
