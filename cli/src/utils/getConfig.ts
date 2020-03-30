import { resolve } from 'path';
import { error } from './index';

const cwd = process.cwd();
const NAMESPACE = '@storybook/aem-cli';
const packageJSONPath = resolve(cwd, 'package.json');
/* eslint-disable import/no-dynamic-require */
const packageJSON = require(packageJSONPath);

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
