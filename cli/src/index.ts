import chalk from 'chalk';
import { getConfig, log } from './utils';
import { Help } from './cmds/help';
import { Package } from './cmds/package';
import { Story } from './cmds/stories/story';
import { Version } from './cmds/version';

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
      Story(args, config);
      break;
    case 'package':
      Package(args, config);
      break;
    case 'v':
    case 'version':
      Version(args);
      break;
    case 'help':
      Help(args);
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
