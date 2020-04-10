import prompts from 'prompts';
import path from 'path';
import npm from 'npm';

const cwd = process.cwd();

export default async (args, config, rootPath) => {
  const questions = [
    {
      type: 'toggle',
      name: 'storybookLocation',
      message: 'Use default storybook file location? e.g. ".storybook"',
      initial: true,
      active: 'Yes',
      inactive: 'No',
      format: value => {
        if (value) return '.storybook';
        return false;
      },
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
      type: (prev) => prev ? 'toggle' : null,
      name: 'storybookStoryLocation',
      message: 'Use default story file location? e.g. "stories"',
      initial: true,
      active: 'Yes',
      inactive: 'No',
      format: value => {
        if (value) return 'stories';
        return false;
      },
    },
  ];

  const storybookAnswers = await prompts(questions);

  return {
    ...config,
    storybookLocation: storybookAnswers.storybookLocation,
    storybookStoryLocation: storybookAnswers.storybookStoryLocation
  };
};
