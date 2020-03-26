import * as chalk from 'chalk';
import { log } from './utils/logger';

module.exports = () => {
  const args = process.argv.slice(2);
  const cmd = args[0];

  // TODO: Import the version check and call that method here.

  switch (cmd) {
    case 'story':
    case 'stories':
      require('./cmds/stories/story')(args);
      break;
    case 'package':
      require('./cmds/package')(args);
      break;
    case 'v':
    case 'version':
      require('./cmds/version')(args);
      break;
    case 'help':
      require('./cmds/help')(args);
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
