import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';
import * as chalk from 'chalk';
import { exec } from 'child_process';
import { log } from '../../utils/logger';
import { fetchFromAEM } from '../../utils/fetchFromAEM';

const cwd = process.cwd();

export const install = async (args, config) => {
  log(`Checking for Storybook AEM Content Package configuration...`);
  const packageManagerURL = `/crx/packmgr/service.jsp`;
  const storybookPackagePath = path.resolve(
    cwd,
    config.projectRoot,
    config.relativeProjectRoot,
    config.localPackagePath,
    config.packageName
  );
  if (!fs.existsSync(storybookPackagePath)) {
    throw log(chalk.red(`error, could not find Storybook AEM Content Package`));
  }

  const form = new (FormData as any)();
  form.append('file', fs.createReadStream(storybookPackagePath));
  form.append('name', `/packages/${config.packageName}`);
  form.append('force', 'true');
  form.append('install', 'true');

  log(`Attempting to create Storybook AEM Content Package in AEM...`);
  await fetchFromAEM({
    url: packageManagerURL,
    method: 'POST',
    body: form,
  });
  log(`Storybook AEM Content Package successfully created in AEM!`);
  log(
    [
      `You can see the Storybook AEM Content here:\n`,
      `  http://localhost:4502/sites.html${config.aemContentPath}\n`,
    ].join('\n')
  );

  if (!args.includes('--quiet')) {
    exec(`open http://localhost:4502/sites.html${config.aemContentPath}`);
  }
};
