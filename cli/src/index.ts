import * as chalk from 'chalk';
import { getConfig, log } from './utils';
import { helpCommand } from './cmds/help';
import { packageCommand } from './cmds/package';
import { storyCommand } from './cmds/stories';
import { versionCommand } from './cmds/version';

const ARG_QUIET = '--quiet';

// TODO: Once the package is published import and use checkVersion.
// import { checkVersion } from './utils';

module.exports = () => {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const config = getConfig();

  // TODO: We can't check the version until this package is actually published on NPM.
  // checkVersion();

  if (args.includes(ARG_QUIET)) {
    config.quiet = true;
    config.openBrowser = false;
  } else {
    config.quiet = false;
    config.openBrowser = true;
  }

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
