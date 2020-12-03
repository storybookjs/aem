import prompts from 'prompts';
import { ARGS_USE_DEFAULTS } from '../../../consts';

export default async (args, config, rootPath) => {
  let addonAnswers: any = {};

  if (args.includes(ARGS_USE_DEFAULTS)) {
    addonAnswers = {
      storybookAEMStyleSystem: true,
      storybookAEMGrid: true
    };
  } else {
    addonAnswers = await prompts([
      {
        type: 'toggle',
        name: 'storybookAEMStyleSystem',
        message: 'Do you wish to use the AEM Style System addon?',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      },
      {
        type: 'toggle',
        name: 'storybookAEMGrid',
        message: 'Do you wish to use the AEM Grid addon?',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      },
    ]);
  }

  return { ...config, ...addonAnswers };
};
