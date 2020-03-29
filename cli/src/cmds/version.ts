import { getInstalledVersion, log } from '../utils';

export const versionCommand = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
