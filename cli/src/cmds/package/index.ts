import * as path from 'path';
import * as prompts from 'prompts';
import { error } from '../../utils';
import { install } from './install';
import { exportPackage } from './export';

const packageJSONPath = path.resolve(process.cwd(), 'package.json');
/* eslint-disable import/no-dynamic-require */
const packageJSON = require(packageJSONPath);

module.exports = async args => {
  const storybookConfig = packageJSON['@storybook/aem-cli'];

  if (Object.entries(packageJSON).length === 0) {
    error(
      'No package.json file found. Please run this from the directory with the package.json file for your project',
      true
    );
  } else if (args.includes('install')) install(args, storybookConfig);
  else if (args.includes('export')) exportPackage(args, storybookConfig);
  else {
    // Ask questions to see what they want to do
    const response = await prompts({
      type: 'autocomplete',
      name: 'operation',
      message: [
        'Do you want to install content into AEM from Code?',
        '  Or export content from AEM into the codebase?',
      ].join('\n'),
      choices: [
        { title: 'Install', value: 'install' },
        { title: 'Export', value: 'export' },
      ],
    });
    if (response.operation === 'install') install(args, storybookConfig);
    if (response.operation === 'export') exportPackage(args, storybookConfig);
  }
};
