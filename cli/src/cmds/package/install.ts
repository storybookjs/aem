import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';
import * as chalk from 'chalk';
import { exec } from 'child_process';
import { log } from '../../utils/logger';
import { fetchFromAEM } from '../../utils/fetchFromAEM';
import * as util from 'util';
import * as zip from 'zip-promise';

const execPromise = util.promisify(exec);
const cwd = process.cwd();

export const install = async (args, config) => {
    const packageManagerURL = `/crx/packmgr/service.jsp`;
    const storybookPackageDirectory = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.localPackagePath);
    const storybookPackagePath = path.resolve(storybookPackageDirectory, config.packageName);

    try {
      log(`Zipping Storybook library ...`);
      await zip.folder(storybookPackageDirectory, storybookPackagePath);

      log(`Checking for Storybook AEM Content Package ...`);
      if (!fs.existsSync(storybookPackagePath)) {
          throw log(chalk.red(`error, could not find Storybook AEM Content Package`));
      }

      const form = new FormData();
      form.append('file', fs.createReadStream(storybookPackagePath));
      form.append('name', `/packages/` + encodeURIComponent(config.packageName));
      form.append('force', 'true');
      form.append('install', 'true');

      log(`Installing Storybook AEM Content Package to AEM...`);
      await fetchFromAEM({
          url: packageManagerURL,
          method: 'POST',
          body: form
      });

      log(`Cleaning up...`);
      await execPromise(`rm -rf "${storybookPackagePath}"`);

      log([
          `You can see the Storybook AEM Content here:\n`,
          `  http://localhost:4502/sites.html${config.aemContentPath}\n`
      ].join('\n'));

      if (!args.includes('--quiet')) {
          execPromise(`open http://localhost:4502/sites.html${config.aemContentPath}`);
      }
    } catch (e) {
      throw log("There was an error installing the content package", chalk.red(e));
    }
};
