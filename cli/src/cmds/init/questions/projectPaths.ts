import prompts from 'prompts';
import path from 'path';
import rootPath from './rootPath';
import { getChoicesFromDirectories, log } from '../../../utils';

const cwd = process.cwd();

export default async (args, config) => {
  const selectedRootPath = await rootPath();
  const appsPath = [ path.relative(cwd, selectedRootPath) ];

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
