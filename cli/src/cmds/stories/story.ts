import * as path from 'path';
import prompts from 'prompts';
import { error, getDirectories, toCamelCase, componentList } from '../../utils';
import { getStoriesTemplate } from './templates/stories';
import { createContentFromStories } from '../content/contentFromStories';

const cwd = process.cwd();

/* eslint-disable no-param-reassign */
export async function createStory(args, config) {
  let storyConfig: any = {};

  if (Array.isArray(config.componentPaths) && config.componentPaths.length === 1) {
    storyConfig.componentType = config.componentPaths[0];
  } else if (Array.isArray(config.componentPaths)) {
    storyConfig.componentType = (
      await prompts({
        type: 'autocomplete',
        name: 'componentType',
        message: 'Generate a Story for which component type?',
        choices: config.componentPaths.map(componentTypePath => ({
          title: path.basename(componentTypePath),
          value: componentTypePath
        })),
      })
    ).componentType;
  } else {
    error('"componentPaths" must be configured on the "@storybook/aem-cli" property of the package.json. Please provide either a string containing the path to the component list or an array of strings to multiple directories containing components.', true);
  }

  if (config.singleStory) {
    storyConfig.components = (
      await prompts({
        type: 'autocomplete',
        name: 'components',
        message: 'Generate a Storybook Story for which component?',
        choices: componentList(storyConfig.componentType, config).map(component => ({
          title: component.name,
          value: component
        })),
        format: res => [res],
      })
    ).components;
  } else {
    storyConfig.components = componentList(storyConfig.componentType, config);
  }

  if (config.singleStory) {
    storyConfig.stories = (
      await prompts([
        {
          type: 'confirm',
          name: 'hasStories',
          message: 'Would you like to add some initial stories? We will add the default empty story for you',
          initial: true,
        }, {
          type: prev => (prev ? 'list' : null),
          name: 'stories',
          message: 'Add a comma separated list of stories:',
          separator: ',',
          format: res => {
            if (!res.length) return false;
            return res;
          },
        },
      ])
    ).stories;
  } else {
    storyConfig.stories = [];
  }

  if (config.aemContentPath) {
    storyConfig.createAEMContent = await prompts({
      type: 'confirm',
      name: 'createAEMContent',
      message: `Create content in AEM for the stories?`,
      initial: true
    });
  }

  storyConfig.components.forEach(component => {
    const stories = [];

    storyConfig.stories.forEach(story => {
      let contentPath = null;
      if (storyConfig.createAEMContent) {
        contentPath = `${config.aemContentPath}/${component.name}/jcr:content${
          config.aemContentDefaultPageContentPath
        }/${toCamelCase(story)}`;
      }

      stories.push({
        name: toCamelCase(story),
        displayName: story,
        contentPath,
      });
    });

    const fullConfig = { ...config, ...storyConfig, component, stories };

    getStoriesTemplate(fullConfig);

    error(fullConfig.createAEMContent, false);
    if (fullConfig.createAEMContent) {
      createContentFromStories(fullConfig);
    }
  });
}
