import * as path from 'path';
import prompts from 'prompts';
import { error } from '../../utils';
import { install } from './install';
import { exportPackage } from './export';

const ARG_INSTALL = 'install';
const ARG_EXPORT = 'export';
const CHOICE_INSTALL = 'CHOICE_INSTALL';
const CHOICE_EXPORT = 'CHOICE_EXPORT';

export async function packageCommand(args, config) {
  if (args.includes(ARG_INSTALL)) install(args, config);
  else if (args.includes(ARG_EXPORT)) exportPackage(args, config);
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
        { title: 'Install', value: CHOICE_INSTALL },
        { title: 'Export', value: CHOICE_EXPORT  },
      ],
    });
    if (response.operation === CHOICE_INSTALL) install(args, config);
    if (response.operation === CHOICE_EXPORT) exportPackage(args, config);
  }
}
