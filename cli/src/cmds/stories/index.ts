import * as path from 'path';
import * as prompts from 'prompts';
import { error } from '../../utils/error';
import { createStory } from './story';

const cwd = process.cwd();

module.exports = async args => {
  const packageJSON = require(path.resolve(cwd, 'package.json'));
  const storybookConfig = packageJSON['@storybook/aem-cli'];

  if (!args.includes('--quiet')) {
    storybookConfig.quiet = true;
    storybookConfig.openBrowser = false;
  } else {
    storybookConfig.quiet = false;
    storybookConfig.openBrowser = true;
  }

  if (Object.entries(packageJSON).length === 0) {
    error(
      'No package.json file found. Please run this from the directory with the package.json file for your project',
      true
    );
  } else if (args.includes('create') && args.includes('all')) {
    storybookConfig.singleStory = false;
    storybookConfig.openBrowser = false;
    createStory(args, storybookConfig);
  } else if (args.includes('create')) {
    storybookConfig.singleStory = true;
    createStory(args, storybookConfig);
  } else {
    // Ask questions to see what they want to do
    const response = await prompts({
      type: 'autocomplete',
      name: 'operation',
      message: 'Do you want to create a story or create stories for all components?',
      choices: [
        { title: 'Single story', value: 'single' },
        { title: 'All stories', value: 'all' },
      ],
    });

    if (response.operation === 'single') {
      storybookConfig.singleStory = true;
      createStory(args, storybookConfig);
    } else if (response.operation === 'all') {
      storybookConfig.singleStory = false;
      storybookConfig.openBrowser = false;
      createStory(args, storybookConfig);
    }
  }
};
