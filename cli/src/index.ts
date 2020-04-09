import chalk from 'chalk';
import { getConfig, log } from './utils';
import { helpCommand } from './cmds/help';
import { packageCommand } from './cmds/package';
import { initCommand } from './cmds/init';
import { storyCommand } from './cmds/stories';
import { versionCommand } from './cmds/version';

// TODO: Import the check version util. Check that this check version is properly implemented. It looks like the code is commented out.
// import { checkVersion } from './utils';

const ARG_QUIET = '--quiet';

module.exports = () => {
  const args = process.argv.slice(2);
  const cmd = args[0];

  // TODO Call the check version method.
  // checkVersion();

  if (cmd === 'init') {
    initCommand(args);
  } else {
    const config = getConfig();

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
            `${chalk.italic(`sba ${cmd}`)} is not a valid command.`,
            ``,
            `Usage: ${chalk.italic('sba <command>')}`,
            ``,
            `Where <command> is on of:`,
            `  init, help, story, package, version`,
            ``,
          ].join('\n')
        );
        break;
    }
  }
};
