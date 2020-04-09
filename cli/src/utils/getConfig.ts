import { resolve } from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { error } from './index';

const cwd = process.cwd();
const NAMESPACE = '@storybook/aem-cli';
const packageJSONPath = resolve(cwd, 'package.json');

if (!fs.existsSync(packageJSONPath)) {
  error(
    chalk.red(
      'The package.json was not found in this directory. Are you sure you are in a directory configured for Storybook AEM?'
    ),
    true
  );
}

const packageJSON = getPackageJSON(packageJSONPath);

export function getConfig() {
  if (Object.entries(packageJSON).length === 0) {
    error(
      'No package.json file found. Please run this from the directory with the package.json file for your project',
      true
    );
  } else if (!packageJSON[NAMESPACE]) {
    error(
      'No @storybook/aem-cli configuration found. Please run `sba init` to setup your project configuration',
      true
    );
  }

  return packageJSON[NAMESPACE];
}

function getPackageJSON(path) {
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
}
