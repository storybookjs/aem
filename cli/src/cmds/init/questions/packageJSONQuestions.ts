import fs from 'fs';
import prompts from 'prompts';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const CHOICE_NPM = 'CHOICE_NPM';
const CHOICE_YARN = 'CHOICE_YARN';
const CHOICE_QUIT = 'CHOICE_QUIT';

export default async () => {
  if (!fs.existsSync('package.json')) {
    const { packageChoice } = await prompts({
      type: 'select',
      name: 'packageChoice',
      message: 'No package.json file found in this directory. What do you want to do?',
      choices: [
        { title: 'npm init', value: CHOICE_NPM },
        { title: 'yarn init', value: CHOICE_YARN },
        { title: 'quit', value: CHOICE_QUIT },
      ],
    });

    if (packageChoice === CHOICE_NPM) {
      await execPromise('npm init -y');
    } else if (packageChoice === CHOICE_NPM) {
      await execPromise('yarn init -y');
    } else {
      process.exit(1);
    }
  }
};
