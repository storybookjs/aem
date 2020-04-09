import chalk from 'chalk';
import { error } from './index';

export const getPackageJSON = path => {
  try {
    /* eslint-disable import/no-dynamic-require, global-require */
    return require(path);
  } catch {
    error(
      chalk.red(
        'The package.json found in this directory was not valid JSON. You might want to check the format of your package.json file.'
      ),
      true
    );

    return undefined;
  }
};
