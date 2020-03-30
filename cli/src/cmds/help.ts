import chalk from 'chalk';
import { log } from '../utils';

const menus = {
  main: [
    `\n`,
    `Usage: ${chalk.italic('sba <command> <options>')}\n`,
    `Commands:`,
    `  init .................. WIP - Start a new project, or add to existing project`,
    `  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example`,
    `  package ............... Imports & Exports content package from AEM => Code => AEM`,
    `  help .................. Show help menu for sba`,
    `  version, v ............ Show sba version`,
    ``,
  ].join('\n'),

  init: [`sba init`].join('\n'),

  story: [
    `\n`,
    `sba story`,
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
};

export function helpCommand(args) {
  const subCmd = args[0] === 'help' ? args[1] : args[0];
  log(menus[subCmd] || menus.main);
}
