import * as path from 'path';
import * as fs from 'fs';
import prompts from 'prompts';
import { promisify } from 'util';
import { error, getDirectories, toCamelCase, componentList, log } from '../../utils';
import { createStories } from './templates/stories';
import { createContentFromStories } from '../content/contentFromStories';

const existsPromise = promisify(fs.exists);
const cwd = process.cwd();

export async function createStory(args, config) {
  const storyConfig: any = {};

  if (Array.isArray(config.componentPaths) && config.componentPaths.length === 1) {
    [storyConfig.componentType] = config.componentPaths;
  } else if (Array.isArray(config.componentPaths)) {
    storyConfig.componentType = (
      await prompts({
        type: 'autocomplete',
        name: 'componentType',
        message: 'Generate a Story for which component type?',
        choices: config.componentPaths.map(componentTypePath => ({
          title: path.basename(componentTypePath),
          value: componentTypePath,
        })),
      })
    ).componentType;
  } else {
    error(
      '"componentPaths" must be configured on the "@storybook/aem-cli" property of the package.json. Please provide either a string containing the path to the component list or an array of strings to multiple directories containing components.',
      true
    );
  }

  if (config.singleStory) {
    storyConfig.components = (
      await prompts({
        type: 'autocomplete',
        name: 'components',
        message: 'Generate a Storybook Story for which component?',
        choices: componentList(storyConfig.componentType, config).map(component => ({
          title: component.name,
          value: component,
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
          message:
            'Would you like to add some initial stories? We will add the default empty story for you',
          initial: true,
        },
        {
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

    if (!storyConfig.stories) storyConfig.stories = [];
  } else {
    storyConfig.stories = [];
  }

  if (config.aemContentPath) {
    storyConfig.createAEMContent = await prompts({
      type: 'confirm',
      name: 'createAEMContent',
      message: `Create content in AEM for the stories?`,
      initial: true,
    });
  }

  storyConfig.components.forEach(component => {
    const fullConfig = { ...config, ...storyConfig, component, stories: [] };

    fullConfig.storyPath = getStoryPath(fullConfig, component);
    existsPromise(fullConfig.storyPath).then(storyFileExists => {
      fullConfig.storyFileExists = storyFileExists;

      if (!fullConfig.storyFileExists) {
        fullConfig.stories.push({
          name: 'empty',
          displayName: 'Empty',
          contentPathName: 'empty',
        });
      }

      if (storyConfig.createAEMContent) {
        fullConfig.baseContentPath = `${fullConfig.aemContentPath}/${component.name}/jcr:content${fullConfig.aemContentDefaultPageContentPath}`;
      }

      storyConfig.stories.forEach(story => {
        fullConfig.stories.push({
          name: toCamelCase(story),
          displayName: story,
          contentPathName: story.toLowerCase().replace(/\s/g, ''),
        });
      });

      createStories(fullConfig);

      if (fullConfig.createAEMContent) {
        createContentFromStories(fullConfig);
      }
    });
  });
}

function getStoryPath(config, component) {
  return path.resolve(
    process.cwd(),
    config.storybookStoryLocation ? config.storybookStoryLocation : component.relativePath,
    `${component.name}.stories.js`
  );
}
