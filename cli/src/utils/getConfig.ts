import { resolve } from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { error, getPackageJSON } from './index';

const NAMESPACE = '@storybook/aem-cli';

export function getConfig() {
  const cwd = process.cwd();
  const packageJSONPath = resolve(cwd, 'package.json');
  const packageJSON = getPackageJSON(packageJSONPath);

  if (Object.entries(packageJSON).length === 0) {
    error(
      'No package.json file found. Please run this from the directory with the package.json file for your project or run npm init first',
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
