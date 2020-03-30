import * as path from 'path';
import prompts from 'prompts';
import { error, getDirectories, toCamelCase } from '../../utils';
import { getStoriesTemplate } from './templates/stories';
import { createContentFromStories } from '../content/contentFromStories';

const cwd = process.cwd();

/* eslint-disable no-param-reassign */
export async function createStory(args, config) {
  let storyConfig: any = {};

  const componentBasePath = path.resolve(
    cwd,
    config.projectRoot,
    config.relativeProjectRoot,
    config.componentPath
  );
  const componentType = await prompts([
    {
      type: 'autocomplete',
      name: 'componentType',
      message: 'Generate a Story for which component type?',
      choices: getDirectories(componentBasePath).map(component => {
        return { title: component, value: component };
      }),
    },
  ]);
  storyConfig = { ...storyConfig, ...componentType };

  const componentPath = path.resolve(
    cwd,
    config.projectRoot,
    config.relativeProjectRoot,
    config.componentPath,
    componentType.componentType
  );

  const componentConfig: any = {};

  if (config.singleStory) {
    componentConfig.components = (
      await prompts({
        type: 'autocomplete',
        name: 'components',
        message: 'Generate a Storybook Story for which component?',
        choices: getDirectories(componentPath).map(component => {
          return { title: component, value: component };
        }),
        format: res => {
          return [res];
        },
      })
    ).components;
  } else {
    componentConfig.components = getDirectories(componentPath);
  }

  componentConfig.hasStories = (await prompts()).hasStories;

  error(componentConfig.hasStories, false);

  if (config.singleStory) {
    componentConfig.stories = (
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
            // else return res.map( story => toCamelCase(story));
            return res;
          },
        },
      ])
    ).stories;
  } else {
    componentConfig.stories = [];
  }

  if (config.aemContentPath) {
    config.createAEMContent = await prompts({
      type: 'confirm',
      name: 'createAEMContent',
      message: `Create content in AEM for the stories?`,
      initial: true,
      format: res => res,
    });
  }

  config = { ...config, ...storyConfig, ...componentConfig };

  config.components.forEach(component => {
    const stories = [];

    config.stories.forEach(story => {
      let contentPath = null;
      if (config.createAEMContent) {
        contentPath = `${config.aemContentPath}/${component}/jcr:content${
          config.aemContentDefaultPageContentPath
        }/${toCamelCase(story)}`;
      }

      stories.push({
        name: toCamelCase(story),
        displayName: story,
        contentPath,
      });
    });

    const fullConfig = { ...config, component, stories };
    getStoriesTemplate(fullConfig);

    if (config.createAEMContent) {
      createContentFromStories(fullConfig);
    }
  });
}
