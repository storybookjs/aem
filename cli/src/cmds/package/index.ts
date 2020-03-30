import * as path from 'path';
import * as prompts from 'prompts';
import { error } from '../../utils';
import { install } from './install';
import { exportPackage } from './export';

const INSTALL = 'install';
const EXPORT = 'export';

export async function packageCommand(args, config) {
  if (args.includes('install')) install(args, config);
  else if (args.includes('export')) exportPackage(args, config);
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
    if (response.operation === INSTALL) install(args, config);
    if (response.operation === EXPORT) exportPackage(args, config);
  }
}
