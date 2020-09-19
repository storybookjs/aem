import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import util from 'util';
import { exec } from 'child_process';
import { log } from '../../utils';
// const exec = util.promisify(require('child_process').exec);
// const exec = util.promisify(require('child_process').exec);

const cwd = path.resolve(process.cwd());

export const installPackage = async (args, config) => {
  const packageManagerURL = `/crx/packmgr/service.jsp`;

  const dependenciesDirectory = path.relative(
    cwd,
    path.resolve(config.dependencies.path, config.dependencies.componentsFolder)
  );
  console.log('dependenciesDirectory:', dependenciesDirectory);
  const dependenciesPackage = path.relative(
    cwd,
    path.join(config.dependencies.path, config.dependencies.package)
  );
  console.log('dependenciesPackage:', dependenciesPackage);

  try {
    log(`Zipping Storybook Dependencies ...`);
    exec(`cd ${dependenciesDirectory} && zip -r "${config.dependencies.package}" .`);

    // setTimeout(() => {
    //   log(`Checking for Storybook Dependencies Package ...`);
    //   if (!fs.existsSync(dependenciesPackage)) {
    //     throw log(chalk.red(`error, could not find Storybook AEM Content Package`));
    //   }

    //   exec(`curl -u admin:admin -F package=@"${dependenciesPackage}" http://localhost:4502/crx/packmgr/service/.json/?cmd=upload`);
    // }, 200);

    // const form = new FormData();
    // form.append('file', fs.createReadStream(dependenciesPackage));
    // form.append('name', `/packages/${encodeURIComponent(config.packageName)}`);

    // log(`Installing Storybook AEM Content Package to AEM...`);
    // await fetchFromAEM({
    //   url: packageManagerURL,
    //   method: 'POST',
    //   body: form,
    // });

    // log(`Cleaning up...`);
    // await execPromise(`rm -rf "${dependenciesPackage}"`);

    // log(
    //   [
    //     `You can see the Storybook AEM Content here:\n`,
    //     `  http://localhost:4502/sites.html${config.aemContentPath}\n`,
    //   ].join('\n')
    // );

    // if (config.openBrowser) {
    //   execPromise(`open http://localhost:4502/sites.html${config.aemContentPath}`);
    // }
  } catch (e) {
    throw log('There was an error installing the content package', chalk.red(e));
  }
};
