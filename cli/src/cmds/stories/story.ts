import * as path from 'path';
import * as prompts from 'prompts';
import { error, getDirectories, toCamelCase } from '../../utils';
import { getStoriesTemplate } from './templates/stories';
import { createContentFromStories } from '../content/contentFromStories';

const cwd = process.cwd();
const packageJSONPath = path.resolve(cwd, 'package.json');
/* eslint-disable import/no-dynamic-require */
const packageJSON = require(packageJSONPath);

module.exports = async args => {
  if (Object.entries(packageJSON).length === 0) {
    error(
      'No package.json file found. Please run this from the directory with the package.json file for your project',
      true
    );
  } else {
    let config = packageJSON['@storybook/aem-cli'];
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
    const componentConfig = await prompts([
      {
        type: 'autocomplete',
        name: 'component',
        message: 'Generate a Storybook Story for which component?',
        choices: getDirectories(componentPath).map(component => {
          return { title: component, value: component };
        }),
      },
      {
        type: 'confirm',
        name: 'hasStories',
        message:
          'Would you like to add some initial stories? We will add the default empty story for you',
        initial: true,
      },
      {
        /* eslint-disable no-constant-condition */
        type: prev => (true ? 'list' : null),
        name: 'stories',
        message: 'Add a comma separated list of stories:',
        separator: ',',
        format: res => {
          if (!res.length) return false;
          // else return res.map( story => toCamelCase(story));
          return res;
        },
      },
    ]);

    storyConfig = { ...storyConfig, ...componentConfig };

    if (storyConfig.stories.length && config.aemContentPath) {
      storyConfig.createAEMContent = await prompts({
        type: 'confirm',
        name: 'createAEMContent',
        message: `Create content in AEM for the stories you've listed?`,
        initial: true,
        format: res => res,
      });

      storyConfig.stories = storyConfig.stories.map(story => {
        let contentPath = null;
        if (storyConfig.createAEMContent) {
          contentPath = `${config.aemContentPath}/${storyConfig.component}/jcr:content${
            config.aemContentDefaultPageContentPath
          }/${toCamelCase(story)}`;
        }

        return {
          name: toCamelCase(story),
          displayName: story,
          contentPath,
        };
      });
    }

    config = { ...config, ...storyConfig };
    getStoriesTemplate(config);
    createContentFromStories(config);
  }
};
