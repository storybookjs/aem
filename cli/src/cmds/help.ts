import * as chalk from 'chalk';
import { log } from '../utils/logger';

const menus = {
  main: [
    `\n`,
    `Usage: ${chalk.italic('sb-aem <command> <options>')}\n`,
    `Commands:`,
    `  init .................. Start a new project, or add to existing project`,
    `  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example`,
    `  package ............... Imports & Exports content package from AEM => Code => AEM`,
    `  component ............. WIP - Create a new component in your project. Generates files in the specified component folder`,
    `  content ............... WIP - Create AEM Content saved in the JCR from [component].content.js files`,
    `  help .................. Show help menu for sb-aem`,
    `  version, v ............ Show sb-aem version`,
    ``,
  ].join('\n'),

  init: [`sb-aem init`].join('\n'),

  story: [
    `\n`,
    `sb-aem story`,
    ``,
    `- Use this command during your development or documentation process`,
    `- Configure for which component type you want to make stories `,
    `- Select component`,
    `- Add a list of stories`,
    `-- By default, when creating a new story file, an empty story will be created for you`,
    `- Choose to create content in AEM to correspond to the story`,
    ``,
    `Upon completing the configuration, a story file will be created or updated with the list of stories provided.`,
    `Content in AEM will also be created corresponding to each story.`,
    `The story file will be updated with the AEM Content Path created for each story component, and denoted with a `,
    ` heading that contains the name of the story.`,
    ``,
  ].join('\n'),

  component: [
    `\n`,
    `sb-aem component <options>`,
    ``,
    `--name, -n ..... the name of the component. Should match the folder name`,
    ``,
  ].join('\n'),

  content: [
    `\n`,
    `sb-aem component <options>`,
    ``,
    `--location, -l ..... the location to use`,
    ``,
  ].join('\n'),
};

module.exports = args => {
  const subCmd = args[0] === 'help' ? args[1] : args[0];
  log(menus[subCmd] || menus.main);
};
