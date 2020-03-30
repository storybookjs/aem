import * as chalk from 'chalk';
import { getConfig, log } from './utils';
import { helpCommand } from './cmds/help';
import { packageCommand } from './cmds/package';
import { storyCommand } from './cmds/stories';
import { versionCommand } from './cmds/version';

// const { checkVersion } = require('./utils');

module.exports = () => {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const config = getConfig();

  // We can't check the version until this package is actually published on NPM.
  // checkVersion();

  switch (cmd) {
    case 'story':
    case 'stories':
      storyCommand(args, config);
      break;
    case 'package':
      packageCommand(args, config);
      break;
    case 'v':
    case 'version':
      versionCommand(args);
      break;
    case 'help':
      helpCommand(args);
      break;
    default:
      log(
        [
          `${chalk.italic(cmd)} is not a valid command.`,
          ``,
          `Usage: ${chalk.italic('sb-aem <command>')}`,
          ``,
          `Where <command> is on of:`,
          `  init, help, story, version`,
          ``,
        ].join('\n')
      );
      break;
  }
};
