import * as path from 'path';
import { exec } from 'child_process';
import { log } from '../../utils/logger';
import { fetchFromAEM } from '../../utils/fetchFromAEM';

const cwd = process.cwd();

export const exportPackage = async (args, config) => {
  try {
    const localPackagePath = path.resolve(
      cwd,
      config.projectRoot,
      config.relativeProjectRoot,
      config.localPackagePath,
      config.packageName
    );
    const packageManagerUrl = `/crx/packmgr/service/.json`;
    let packageUrl = `/etc/packages`;
    if (config.packageGroup) packageUrl += `/${config.packageGroup}`;
    packageUrl += `/${config.packageName}`;

    log(`Rebuilding Storybook AEM Content Package...`);
    await fetchFromAEM({
      url: `${packageManagerUrl}${packageUrl}?cmd=build`,
      method: `POST`,
    });
    log(`Storybook AEM Content Package Successfully Rebuilt.`);

    log(`Exporting Storybook AEM Content Package...`);
    await exec(`curl -u admin:admin http://localhost:4502${packageUrl} > ${localPackagePath}`);
    log(`Successfully Exported Storybook AEM Content Package to the codebase.`);
    log([`Storybook AEM Content Package File:\n`, `  ${localPackagePath}`, ``].join('\n'));
  } catch (e) {
    throw log(`There was an error exporting the Storybook AEM Content Package`, e);
  }
};
