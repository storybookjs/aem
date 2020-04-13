import prompts from 'prompts';
import { ARGS_USE_DEFAULTS } from '../../../consts';

export default async (args, config, rootPath) => {
  let storybookAnswers: any = {};

  if (args.includes(ARGS_USE_DEFAULTS)) {
    storybookAnswers = {
      storybookLocation: '.storybook',
      storybookStoryLocation: 'stories',
    };
  } else {
    storybookAnswers = await prompts([
      {
        type: 'text',
        name: 'storybookLocation',
        message: 'Use default storybook file location? e.g. ".storybook"',
        initial: '.storybook',
      },
      {
        type: 'toggle',
        name: 'separateStoriesFolder',
        message: 'Create stories in a separate stories folder?',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      },
      {
        type: prev => (prev ? 'text' : null),
        name: 'storybookStoryLocation',
        message: 'Use default story file location? e.g. "stories"',
        initial: 'stories',
      },
    ]);
  }

  return {
    ...config,
    storybookLocation: storybookAnswers.storybookLocation,
    storybookStoryLocation: storybookAnswers.storybookStoryLocation,
  };
};
