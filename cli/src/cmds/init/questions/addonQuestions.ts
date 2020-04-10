import prompts from 'prompts';

export default async (args, config, rootPath) => {
  const addonAnswers = await prompts([
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

  return { ...config, ...addonAnswers };
};
