import * as path from 'path';
import prompts from 'prompts';
import { error } from '../../utils';
import { createStory } from './story';

const CHOICE_SINGLE_STORY = 'CHOICE_SINGLE_STORY';
const CHOICE_ALL_STORIES = 'CHOICE_ALL_STORIES';
const ARG_CREATE = 'create';
const ARG_ALL = 'all';
const cwd = process.cwd();

export const storyCommand = async (args, config) => {
  if (args.includes(ARG_CREATE) && args.includes(ARG_ALL)) {
    config.singleStory = false;
    config.openBrowser = false;
    createStory(args, config);
  } else if (args.includes(ARG_CREATE)) {
    config.singleStory = true;
    createStory(args, config);
  } else {
    // Ask questions to see what they want to do
    const response = await prompts({
      type: 'autocomplete',
      name: 'operation',
      message: 'Do you want to create a story or create stories for all components?',
      choices: [
        { title: 'Single story', value: CHOICE_SINGLE_STORY },
        { title: 'All stories', value: CHOICE_ALL_STORIES },
      ],
    });

    if (response.operation === CHOICE_SINGLE_STORY) {
      config.singleStory = true;
      createStory(args, config);
    } else if (response.operation === CHOICE_ALL_STORIES) {
      config.singleStory = false;
      config.openBrowser = false;
      createStory(args, config);
    }
  }
};
