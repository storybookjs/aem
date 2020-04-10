import fs from 'fs';
import prompts from 'prompts';
import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const CHOICE_NPM = 'CHOICE_NPM';
const CHOICE_YARN = 'CHOICE_YARN';
const CHOICE_QUIT = 'CHOICE_QUIT';

export default async () => {
  if (! fs.existsSync('package.json')) {
    const packageChoice = (await prompts({
      type: 'select',
      name: 'packageChoice',
      message: `No package.json file found.\n  If is in another directory or you want to create the package.json yourself please quit and run ${chalk.underline.bold('sba init')} from that directory.\n  What do you want to do?\n  `,
      choices: [
        { title: "npm init", value: CHOICE_NPM },
        { title: "yarn init", value: CHOICE_YARN },
        { title: "quit", value: CHOICE_QUIT },
      ]
    })).packageChoice;

    if (packageChoice === CHOICE_NPM) {
      await execPromise(`npm init -y`);
    } else if (packageChoice === CHOICE_NPM) {
      await execPromise(`yarn init -y`);
    } else {
      process.exit(1);
    }
  }
};
